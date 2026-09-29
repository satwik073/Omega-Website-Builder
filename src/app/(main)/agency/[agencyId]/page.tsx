import CircleProgress from '@/components/global/circle-progress'
import { PageToolbar } from '@/components/admin/toolbar'
import StatCard from '@/components/global/stat-card'
import EntityLogo from '@/components/global/entity-logo'
import { EmptyState } from '@/components/global/states'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { db } from '@/lib/db'
import { cleanText, displayName } from '@/lib/utils'
import { stripe } from '@/lib/stripe'
import { AreaChart } from '@tremor/react'
import {
  Activity,
  Building2,
  ChevronRight,
  ClipboardIcon,
  Contact2,
  CreditCard,
  DollarSign,
  Goal,
  ShoppingCart,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: Promise<{ agencyId: string }>
  searchParams: Promise<{ code: string }>
}

const Page = async ({ params }: Props) => {
  const resolvedParams = await params

  let currency = 'USD'
  // Only populated when a Stripe account is connected; default to empty so
  // the dashboard renders the same either way.
  let sessions: any[] = []
  let totalClosedSessions: any[] = []
  let totalPendingSessions: any[] = []
  let net = 0
  let potentialIncome = 0
  let closingRate = 0
  const currentYear = new Date().getFullYear()
  const startDate = new Date(`${currentYear}-01-01T00:00:00Z`).getTime() / 1000
  const endDate = new Date(`${currentYear}-12-31T23:59:59Z`).getTime() / 1000

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: resolvedParams.agencyId,
    },
  })

  if (!agencyDetails) return null

  const subaccounts = await db.subAccount.findMany({
    where: {
      agencyId: resolvedParams.agencyId,
    },
  })

  if (agencyDetails.connectAccountId) {
    const response = await stripe.accounts.retrieve(
      agencyDetails.connectAccountId
    )

    currency = response.default_currency?.toUpperCase() || 'USD'
    const checkoutSessions = await stripe.checkout.sessions.list(
      {
        created: { gte: startDate, lte: endDate },
        limit: 100,
      },
      { stripeAccount: agencyDetails.connectAccountId }
    )
    sessions = checkoutSessions.data
    totalClosedSessions = checkoutSessions.data
      .filter((session) => session.status === 'complete')
      .map((session) => ({
        ...session,
        created: new Date(session.created * 1000).toLocaleDateString(),
        amount_total: session.amount_total ? session.amount_total / 100 : 0,
      }))

    totalPendingSessions = checkoutSessions.data
      .filter((session) => session.status === 'open')
      .map((session) => ({
        ...session,
        created: new Date(session.created * 1000).toLocaleDateString(),
        amount_total: session.amount_total ? session.amount_total / 100 : 0,
      }))
    net = +totalClosedSessions
      .reduce((total, session) => total + (session.amount_total || 0), 0)
      .toFixed(2)

    potentialIncome = +totalPendingSessions
      .reduce((total, session) => total + (session.amount_total || 0), 0)
      .toFixed(2)

    // Guard the divisor: a brand new agency has no checkout sessions at
    // all, and 0/0 rendered as "NaN%" in the dashboard.
    closingRate = checkoutSessions.data.length
      ? +(
          (totalClosedSessions.length / checkoutSessions.data.length) *
          100
        ).toFixed(2)
      : 0
  }

  const chartData = [
    ...(totalClosedSessions || []),
    ...(totalPendingSessions || []),
  ]

  const goalPct = agencyDetails.goal
    ? Math.min((subaccounts.length / agencyDetails.goal) * 100, 100)
    : 0

  const recentActivity = await db.notification.findMany({
    where: { agencyId: resolvedParams.agencyId },
    orderBy: { createdAt: 'desc' },
    take: 6,
    include: { User: true },
  })

  const goalReached = agencyDetails.goal
    ? subaccounts.length >= agencyDetails.goal
    : false

  return (
    <>
      <PageToolbar
        title="Dashboard"
        action={
          <Button variant="outline" asChild>
            <Link href={`/agency/${resolvedParams.agencyId}/all-subaccounts`}>
              <Building2 />
              Sub accounts
            </Link>
          </Button>
        }
      />

      <p className="py-5 text-[13px] text-muted-foreground">
        Performance across your agency for {currentYear}.
      </p>

      {!agencyDetails.connectAccountId && (
        <div className="mb-6 flex flex-col gap-3 rounded-card border border-brand/25 bg-brand/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-sm bg-brand/15 text-brand [&_svg]:size-3.5">
              <ClipboardIcon />
            </span>
            <div>
              <p className="text-[13px] font-medium">
                Connect Stripe to see revenue
              </p>
              <p className="mt-0.5 text-[12px] text-muted-foreground">
                Income and conversion metrics stay empty until an account is
                connected.
              </p>
            </div>
          </div>
          <Button size="sm" asChild className="shrink-0">
            <Link href={`/agency/${agencyDetails.id}/launchpad`}>
              Go to launchpad
            </Link>
          </Button>
        </div>
      )}

      {/* Metrics */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Income"
          value={net ? `${currency} ${net.toFixed(2)}` : '$0.00'}
          hint="Reflected in Stripe"
          icon={<DollarSign />}
        />
        <StatCard
          label="Potential income"
          value={
            potentialIncome ? `${currency} ${potentialIncome.toFixed(2)}` : '$0.00'
          }
          hint="Sessions still open"
          icon={<DollarSign />}
        />
        <StatCard
          label="Active clients"
          value={subaccounts.length}
          hint="Sub accounts you manage"
          icon={<Contact2 />}
        />
        <StatCard
          label="Agency goal"
          value={`${subaccounts.length} / ${agencyDetails.goal}`}
          hint={goalReached ? 'Goal reached' : `${goalPct.toFixed(0)}% of goal`}
          icon={<Goal />}
          footer={<Progress value={goalPct} className="h-1" />}
        />
      </div>

      {/* Revenue + conversions */}
      <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card className="flex flex-col p-5">
          <div className="flex items-center justify-between gap-4 pb-5">
            <CardTitle>Transaction history</CardTitle>
            <span className="eyebrow">{currentYear}</span>
          </div>
          {chartData.length ? (
            <AreaChart
              className="h-64 text-[12px]"
              data={chartData}
              index="created"
              categories={['amount_total']}
              colors={['orange']}
              yAxisWidth={44}
              showAnimation
            />
          ) : (
            <EmptyState
              className="flex-1 border-0 py-10"
              icon={<CreditCard />}
              title="No transactions yet"
              description="Revenue appears here once a connected Stripe account starts taking payments through your funnels."
              action={
                <Button size="sm" asChild>
                  <Link href={`/agency/${resolvedParams.agencyId}/launchpad`}>
                    Connect Stripe
                  </Link>
                </Button>
              }
            />
          )}
        </Card>

        <Card className="flex flex-col p-5">
          <div className="pb-5">
            <CardTitle>Conversions</CardTitle>
          </div>
          <CircleProgress
            value={closingRate}
            description={
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-sm border border-border p-2.5">
                  <span className="eyebrow">Abandoned</span>
                  <p className="mt-1 flex items-center gap-1.5 text-[15px] font-medium tabular-nums text-foreground">
                    <ShoppingCart className="size-3.5 text-muted-foreground" />
                    {sessions?.length ?? 0}
                  </p>
                </div>
                <div className="rounded-sm border border-border p-2.5">
                  <span className="eyebrow">Won carts</span>
                  <p className="mt-1 flex items-center gap-1.5 text-[15px] font-medium tabular-nums text-foreground">
                    <ShoppingCart className="size-3.5 text-muted-foreground" />
                    {totalClosedSessions?.length ?? 0}
                  </p>
                </div>
              </div>
            }
          />
        </Card>
      </div>

      {/* Sub accounts + activity */}
      <div className="mt-3 grid gap-3 xl:grid-cols-2">
        <Card className="flex flex-col p-5">
          <div className="flex items-center justify-between gap-4 pb-4">
            <CardTitle>Sub accounts</CardTitle>
            <Link
              href={`/agency/${resolvedParams.agencyId}/all-subaccounts`}
              className="text-[12px] text-muted-foreground transition-colors hover:text-foreground"
            >
              View all
            </Link>
          </div>

          {subaccounts.length ? (
            <ul className="flex flex-col">
              {subaccounts.slice(0, 5).map((subaccount) => (
                <li key={subaccount.id}>
                  <Link
                    href={`/subaccount/${subaccount.id}`}
                    className="-mx-2 flex items-center gap-3 rounded-sm px-2 py-2.5 transition-colors duration-fast hover:bg-muted"
                  >
                    <div className="relative size-7 shrink-0 overflow-hidden rounded-sm border border-border bg-muted">
                      <EntityLogo
                        src={subaccount.subAccountLogo}
                        name={subaccount.name}
                        fill
                        rounded="none"
                        className="size-full"
                        imageClassName="p-0.5"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium">
                        {subaccount.name}
                      </p>
                      <p className="truncate text-[12px] text-muted-foreground">
                        {subaccount.city || subaccount.companyEmail}
                      </p>
                    </div>
                    <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              className="flex-1 border-0 py-8"
              icon={<Building2 />}
              title="No sub accounts yet"
              description="Sub accounts are the client workspaces your agency builds sites in."
            />
          )}
        </Card>

        <Card className="flex flex-col p-5">
          <div className="pb-4">
            <CardTitle>Recent activity</CardTitle>
          </div>

          {recentActivity.length ? (
            <ul className="flex flex-col">
              {recentActivity.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-3 border-b border-border py-2.5 last:border-0"
                >
                  <div className="relative mt-0.5 size-6 shrink-0 overflow-hidden rounded-full">
                    <EntityLogo
                      src={item.User?.avatarUrl}
                      name={displayName(item.User?.name, item.User?.email)}
                      fill
                      rounded="full"
                      className="size-full"
                      imageClassName="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] leading-snug">
                      {cleanText(item.notification.replaceAll('|', ' '))}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {item.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              className="flex-1 border-0 py-8"
              icon={<Activity />}
              title="No activity yet"
              description="Changes made across your agency and its sub accounts are logged here."
            />
          )}
        </Card>
      </div>
    </>
  )
}

export default Page
