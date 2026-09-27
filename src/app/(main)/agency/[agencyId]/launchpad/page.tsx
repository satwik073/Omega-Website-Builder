import { Button } from '@/components/ui/button'
import PageHeader from '@/components/global/page-header'
import { db } from '@/lib/db'
import { getStripeOAuthLink } from '@/lib/utils'
import { CheckCircleIcon } from 'lucide-react'
import EntityLogo from '@/components/global/entity-logo'
import Image from 'next/image'
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
      <PageHeader
        title="Launchpad"
        description="Finish these steps to get your account fully set up."
      />
      <div className="max-w-3xl">
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background p-5">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image
                  src="/appstore.png"
                  alt="app logo"
                  height={40}
                  width={40}
                  className="rounded-md object-contain"
                />
                <p>Save the website as a shortcut on your mobile device</p>
              </div>
              <Button>Start</Button>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background p-5">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image
                  src="/stripelogo.png"
                  alt="Stripe logo"
                  height={40}
                  width={40}
                  className="rounded-md object-contain"
                />
                <p>
                  Connect your Stripe account to accept payments and see your
                  dashboard.
                </p>
              </div>
              {agencyDetails.connectAccountId || connectedStripeAccount ? (
                <CheckCircleIcon
                  size={22}
                  className="shrink-0 text-foreground"
                />
              ) : (
                <Link
                  className="inline-flex h-10 shrink-0 items-center rounded-[var(--radius)] bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
                  href={stripeOAuthLink}
                >
                  Start
                </Link>
              )}
            </div>
            <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background p-5">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <EntityLogo
                  src={agencyDetails.agencyLogo}
                  name={agencyDetails.name}
                  size={40}
                />
                <p>Fill in all your business details</p>
              </div>
              {allDetailsExist ? (
                <CheckCircleIcon
                  size={22}
                  className="shrink-0 text-foreground"
                />
              ) : (
                <Link
                  className="inline-flex h-10 shrink-0 items-center rounded-[var(--radius)] bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
                  href={`/agency/${resolvedParams.agencyId}/settings`}
                >
                  Start
                </Link>
              )}
            </div>
        </div>
      </div>
    </>
  )
}

export default LaunchPadPage
