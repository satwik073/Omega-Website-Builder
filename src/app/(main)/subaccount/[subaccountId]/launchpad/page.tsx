import { Button } from '@/components/ui/button'
import PageHeader from '@/components/global/page-header'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { getStripeOAuthLink } from '@/lib/utils'
import { CheckCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: Promise<{ subaccountId: string }>
  searchParams: Promise<{ state: string; code: string }>
}

const LaunchPad = async ({ params, searchParams }: Props) => {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ])

  const subaccountDetails = await db.subAccount.findUnique({
    where: {
      id: resolvedParams.subaccountId,
    },
  })

  if (!subaccountDetails) {
    return null
  }

  const allDetailsExist =
    subaccountDetails.address &&
    subaccountDetails.subAccountLogo &&
    subaccountDetails.city &&
    subaccountDetails.companyEmail &&
    subaccountDetails.companyPhone &&
    subaccountDetails.country &&
    subaccountDetails.name &&
    subaccountDetails.state

  const stripeOAuthLink = getStripeOAuthLink(
    'subaccount',
    `launchpad___${subaccountDetails.id}`
  )

  let connectedStripeAccount = false

  if (resolvedSearchParams.code) {
    if (!subaccountDetails.connectAccountId) {
      try {
        const response = await stripe.oauth.token({
          grant_type: 'authorization_code',
          code: resolvedSearchParams.code,
        })
        await db.subAccount.update({
          where: { id: resolvedParams.subaccountId },
          data: { connectAccountId: response.stripe_user_id },
        })
        connectedStripeAccount = true
      } catch (error) {
        console.error('🔴 Could not connect Stripe account', error)
      }
    }
  }

  return (
    <>
      <PageHeader
        title="Launchpad"
        description="Finish these steps to get this sub account fully set up."
      />
      <div className="max-w-3xl">
        <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background p-5">
                <div className="flex items-center gap-4">
                  <Image
                    src="/appstore.png"
                    alt="App logo"
                    height={80}
                    width={80}
                    className="rounded-md object-contain"
                  />
                  <p>Save the website as a shortcut on your mobile device</p>
                </div>
                <Button>Start</Button>
              </div>
              <div className="flex justify-between items-center w-full h-20 border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <Image
                    src="/stripelogo.png"
                    alt="App logo"
                    height={80}
                    width={80}
                    className="rounded-md object-contain "
                  />
                  <p>
                    Connect your Stripe account to accept payments. Stripe is
                    used to run payouts.
                  </p>
                </div>
                {subaccountDetails.connectAccountId ||
                connectedStripeAccount ? (
                  <CheckCircleIcon
                    size={50}
                    className=" text-primary p-2 flex-shrink-0"
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
              <div className="flex justify-between items-center w-full h-20 border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <Image
                    src={subaccountDetails.subAccountLogo}
                    alt="App logo"
                    height={80}
                    width={80}
                    className="rounded-md object-contain p-4"
                  />
                  <p>Fill in all your business details.</p>
                </div>
                {allDetailsExist ? (
                  <CheckCircleIcon
                    size={50}
                    className=" text-primary p-2 flex-shrink-0"
                  />
                ) : (
                  <Link
                    className="inline-flex h-10 shrink-0 items-center rounded-[var(--radius)] bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
                    href={`/subaccount/${subaccountDetails.id}/settings`}
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

export default LaunchPad
