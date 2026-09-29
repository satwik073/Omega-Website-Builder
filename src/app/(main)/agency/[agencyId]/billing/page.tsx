import React from 'react'
import { stripe } from '@/lib/stripe'
import { addOnProducts, pricingCards } from '@/lib/constants'
import { db } from '@/lib/db'
import SubscriptionHelper from './_components/subscription-helper'
import BillingView from './_components/billing-view'
import ChangePlanButton from './_components/change-plan-button'

type Props = {
  params: Promise<{ agencyId: string }>
}

const page = async ({ params }: Props) => {
  // Resolve the `Promise` for `params`
  const resolvedParams = await params

  // Use Promises explicitly for asynchronous data fetching
  const [addOns, agencySubscription, prices, charges] = await Promise.all([
    stripe.products.list({
      ids: addOnProducts.map((product) => product.id),
      expand: ['data.default_price'],
    }),
    db.agency.findUnique({
      where: { id: resolvedParams.agencyId },
      select: { customerId: true, Subscription: true },
    }),
    stripe.prices.list({
      product: process.env.NEXT_PLURA_PRODUCT_ID!,
      active: true,
    }),
    stripe.charges.list({
      limit: 50,
      customer: (await db.agency.findUnique({
        where: { id: resolvedParams.agencyId },
      }))?.customerId,
    }),
  ])

  // Extract data for the current plan
  const currentPlanDetails = pricingCards.find(
    (c) => c.priceId === agencySubscription?.Subscription?.priceId
  )

  // Map charges for rendering
  const allCharges = charges.data.map((charge) => ({
    description: charge.description,
    id: charge.id,
    date: `${new Date(charge.created * 1000).toLocaleTimeString()} ${new Date(
      charge.created * 1000
    ).toLocaleDateString()}`,
    status: 'Paid',
    amount: `$${charge.amount / 100}`,
  }))

  const planActive = agencySubscription?.Subscription?.active === true

  // Narrow Stripe's Price objects to plain values before they cross into a
  // client component; the originals carry toJSON and Decimal fields.
  const planPrices = prices.data.map((price) => ({
    id: price.id,
    nickname: price.nickname,
    unit_amount: price.unit_amount,
    currency: price.currency,
  }))

  return (
    <>
      {/* Effect-only: opens the upgrade modal when the page is reached with
          a ?plan= param. Renders nothing. */}
      <SubscriptionHelper
        prices={planPrices}
        customerId={agencySubscription?.customerId || ''}
        planExists={planActive}
      />

      <BillingView
        plan={{
          title: planActive
            ? currentPlanDetails?.title || 'Current plan'
            : 'Starter',
          description: planActive
            ? currentPlanDetails?.description ||
              'Your agency is on a paid plan.'
            : 'Pick the plan that fits how you work. You can change it any time.',
          price: planActive ? currentPlanDetails?.price || '$0' : '$0',
          duration: planActive ? '/ month' : '/ month',
          features: currentPlanDetails?.features ?? [
            '3 Sub accounts',
            '2 Team members',
            'Unlimited pipelines',
          ],
          active: planActive,
        }}
        charges={allCharges}
        onChangePlan={
          <ChangePlanButton
            prices={planPrices}
            customerId={agencySubscription?.customerId || ''}
            planExists={planActive}
          />
        }
      />
    </>
  )
}

export default page
