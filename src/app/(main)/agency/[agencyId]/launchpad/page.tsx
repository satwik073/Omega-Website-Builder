import { Button } from '@/components/ui/button'
import { PageToolbar } from '@/components/admin/toolbar'
import SetupChecklist from '@/components/admin/setup-checklist'
import { db } from '@/lib/db'
import { getStripeOAuthLink } from '@/lib/utils'
import { Building2, CreditCard, Smartphone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { stripe } from '@/lib/stripe'

type Props = {
  params: Promise<{ agencyId: string }>
  searchParams: Promise<{ code: string }>
}

const LaunchPadPage = async ({ params, searchParams }: Props) => {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ])

  const agencyDetails = await db.agency.findUnique({
    where: { id: resolvedParams.agencyId },
  })

  if (!agencyDetails) return null

  const allDetailsExist =
    agencyDetails.address &&
    agencyDetails.agencyLogo &&
    agencyDetails.city &&
    agencyDetails.companyEmail &&
    agencyDetails.companyPhone &&
    agencyDetails.country &&
    agencyDetails.name &&
    agencyDetails.state &&
    agencyDetails.zipCode

  const stripeOAuthLink = getStripeOAuthLink(
    'agency',
    `launchpad___${agencyDetails.id}`
  )

  let connectedStripeAccount = false

  if (resolvedSearchParams.code) {
    if (!agencyDetails.connectAccountId) {
      try {
        const response = await stripe.oauth.token({
          grant_type: 'authorization_code',
          code: resolvedSearchParams.code,
        })
        await db.agency.update({
          where: { id: resolvedParams.agencyId },
          data: { connectAccountId: response.stripe_user_id },
        })
        connectedStripeAccount = true
      } catch (error) {
        console.error('🔴 Could not connect Stripe account:', error)
      }
    }
  }

  return (
    <>
      <PageToolbar title="Launchpad" />

      <div className="py-6">
        <p className="mb-6 max-w-xl text-[13px] leading-relaxed text-muted-foreground">
          Finish these steps to get your agency fully set up. You can come back
          to this list at any time.
        </p>

        <SetupChecklist
          steps={[
            {
              id: 'shortcut',
              title: 'Save the site to your home screen',
              description:
                'Add Arobix as a shortcut so it opens like an app on mobile.',
              done: false,
              icon: <Smartphone className="size-4" />,
              action: (
                <Button size="sm" variant="outline">
                  Start
                </Button>
              ),
            },
            {
              id: 'stripe',
              title: 'Connect your Stripe account',
              description:
                'Accept payments through your funnels and see revenue on the dashboard.',
              done:
                !!agencyDetails.connectAccountId || connectedStripeAccount,
              icon: <CreditCard className="size-4" />,
              action: (
                <Button size="sm" asChild>
                  <Link href={stripeOAuthLink}>Connect</Link>
                </Button>
              ),
            },
            {
              id: 'details',
              title: 'Fill in your business details',
              description:
                'Name, address and contact details appear on invoices and published sites.',
              done: !!allDetailsExist,
              icon: <Building2 className="size-4" />,
              action: (
                <Button size="sm" asChild>
                  <Link href={`/agency/${agencyDetails.id}/settings`}>
                    Complete
                  </Link>
                </Button>
              ),
            },
          ]}
        />
      </div>
    </>
  )
}

export default LaunchPadPage
