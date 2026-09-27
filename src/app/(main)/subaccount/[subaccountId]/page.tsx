import CircleProgress from '@/components/global/circle-progress'
import PageHeader from '@/components/global/page-header'
import StatCard from '@/components/global/stat-card'
import PipelineValue from '@/components/global/pipeline-value'
import SubaccountFunnelChart from '@/components/global/subaccount-funnel-chart'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { AreaChart, BadgeDelta } from '@tremor/react'
import { ClipboardIcon, Contact2, DollarSign, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: Promise<{ subaccountId: string }>
  searchParams: Promise<{ code: string }>
}

const SubaccountPageId = async ({ params, searchParams }: Props) => {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ])

  let currency = 'USD'
  let sessions
  let totalClosedSessions
  let totalPendingSessions
  let net = 0
  let potentialIncome = 0
  let closingRate = 0

  const subaccountDetails = await db.subAccount.findUnique({
    where: {
      id: resolvedParams.subaccountId,
    },
  })

  const currentYear = new Date().getFullYear()
  const startDate = new Date(`${currentYear}-01-01T00:00:00Z`).getTime() / 1000
  const endDate = new Date(`${currentYear}-12-31T23:59:59Z`).getTime() / 1000

  if (!subaccountDetails) return null

  if (subaccountDetails.connectAccountId) {
    const response = await stripe.accounts.retrieve(
      subaccountDetails.connectAccountId
    )
    currency = response.default_currency?.toUpperCase() || 'USD'
    const checkoutSessions = await stripe.checkout.sessions.list(
      { created: { gte: startDate, lte: endDate }, limit: 100 },
      {
        stripeAccount: subaccountDetails.connectAccountId,
      }
    )
    sessions = checkoutSessions.data.map((session) => ({
      ...session,
      created: new Date(session.created).toLocaleDateString(),
      amount_total: session.amount_total ? session.amount_total / 100 : 0,
    }))

    totalClosedSessions = checkoutSessions.data
      .filter((session) => session.status === 'complete')
      .map((session) => ({
        ...session,
        created: new Date(session.created).toLocaleDateString(),
        amount_total: session.amount_total ? session.amount_total / 100 : 0,
      }))

    totalPendingSessions = checkoutSessions.data
      .filter(
        (session) => session.status === 'open' || session.status === 'expired'
      )
      .map((session) => ({
        ...session,
        created: new Date(session.created).toLocaleDateString(),
        amount_total: session.amount_total ? session.amount_total / 100 : 0,
      }))

    net = +totalClosedSessions
      .reduce((total, session) => total + (session.amount_total || 0), 0)
      .toFixed(2)

    potentialIncome = +totalPendingSessions
      .reduce((total, session) => total + (session.amount_total || 0), 0)
      .toFixed(2)

    closingRate = +(
      (totalClosedSessions.length / checkoutSessions.data.length) *
      100
    ).toFixed(2)
  }

  const funnels = await db.funnel.findMany({
    where: {
      subAccountId: resolvedParams.subaccountId,
    },
    include: {
      FunnelPages: true,
    },
  })

  const funnelPerformanceMetrics = funnels.map((funnel) => ({
    ...funnel,
    totalFunnelVisits: funnel.FunnelPages.reduce(
      (total, page) => total + page.visits,
      0
    ),
  }))

  return (
    <>
      <PageHeader
        title={subaccountDetails.name}
        description={`Performance for this sub account in ${currentYear}.`}
      />

      {!subaccountDetails.connectAccountId && (
        <div className="mb-8 flex flex-col gap-4 rounded-lg border border-border bg-muted p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">Connect Stripe to see revenue</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Income and conversion metrics stay empty until an account is
              connected.
            </p>
          </div>
          <Link
            href={`/subaccount/${subaccountDetails.id}/launchpad`}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-[var(--radius)] bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
          >
            <ClipboardIcon className="size-4" />
            Go to launchpad
          </Link>
        </div>
      )}

      <div>
        <div className="flex flex-col gap-6 pb-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Income"
              value={net ? `${currency} ${net.toFixed(2)}` : '$0.00'}
              hint="Total revenue reflected in your Stripe dashboard."
              icon={<DollarSign />}
            />
            <StatCard
              label="Potential income"
              value={
                potentialIncome
                  ? `${currency} ${potentialIncome.toFixed(2)}`
                  : '$0.00'
              }
              hint="Value of sessions still open."
              icon={<Contact2 />}
            />
            <PipelineValue subaccountId={resolvedParams.subaccountId} />

            <Card className="p-6 sm:col-span-2 xl:col-span-1">
              <CardHeader className="p-0 pb-5">
                <CardTitle>Conversions</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CircleProgress
                  value={closingRate}
                  description={
                    <>
                      {sessions && (
                        <div className="flex flex-col gap-1">
                          <span className="eyebrow">Carts opened</span>
                          <span className="flex items-center gap-2 text-sm tabular-nums">
                            <ShoppingCart className="size-4 text-muted-foreground" />
                            {sessions.length}
                          </span>
                        </div>
                      )}
                      {totalClosedSessions && (
                        <div className="flex flex-col gap-1">
                          <span className="eyebrow">Won carts</span>
                          <span className="flex items-center gap-2 text-sm tabular-nums">
                            <ShoppingCart className="size-4 text-muted-foreground" />
                            {totalClosedSessions.length}
                          </span>
                        </div>
                      )}
                    </>
                  }
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 flex-col xl:!flex-row">
            <Card className="relative">
              <CardHeader>
                <CardDescription>Funnel Performance</CardDescription>
              </CardHeader>
              <CardContent className=" text-sm text-muted-foreground flex flex-col gap-12 justify-between ">
                <SubaccountFunnelChart data={funnelPerformanceMetrics} />
                <div className="lg:w-[150px]">
                  Total page visits across all funnels. Hover over to get more
                  details on funnel page performance.
                </div>
              </CardContent>
              <Contact2 className="absolute right-4 top-4 text-muted-foreground" />
            </Card>
            <Card className="p-4 flex-1">
              <CardHeader>
                <CardTitle>Checkout Activity</CardTitle>
              </CardHeader>
              <AreaChart
                className="text-sm stroke-primary"
                data={sessions || []}
                index="created"
                categories={['amount_total']}
                colors={['primary']}
                yAxisWidth={30}
                showAnimation={true}
              />
            </Card>
          </div>
          <div className="flex gap-4 xl:!flex-row flex-col">
            <Card className="p-4 flex-1 h-[450px] overflow-scroll no-scrollbar relative">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Transition History
                  <BadgeDelta
                    className="rounded-xl bg-transparent"
                    deltaType="moderateIncrease"
                    isIncreasePositive={true}
                    size="xs"
                  >
                    +12.3%
                  </BadgeDelta>
                </CardTitle>
                <Table>
                  <TableHeader className="!sticky !top-0">
                    <TableRow>
                      <TableHead className="w-[300px]">Email</TableHead>
                      <TableHead className="w-[200px]">Status</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="font-medium truncate">
                    {totalClosedSessions
                      ? totalClosedSessions.map((session) => (
                          <TableRow key={session.id}>
                            <TableCell>
                              {session.customer_details?.email || '-'}
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-emerald-500 dark:text-black">
                                Paid
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(session.created).toUTCString()}
                            </TableCell>

                            <TableCell className="text-right">
                              <small>{currency}</small>{' '}
                              <span className="text-emerald-500">
                                {session.amount_total}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      : 'No Data'}
                  </TableBody>
                </Table>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubaccountPageId
