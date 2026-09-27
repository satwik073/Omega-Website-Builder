import React from 'react'
import PageHeader from '@/components/global/page-header'
import { stripe } from '@/lib/stripe'
import { addOnProducts, pricingCards } from '@/lib/constants'
import { db } from '@/lib/db'
import { Separator } from '@/components/ui/separator'
import PricingCard from './_components/pricing-card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import clsx from 'clsx'
import SubscriptionHelper from './_components/subscription-helper'

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

  return (
    <>
      <SubscriptionHelper
        prices={prices.data}
        customerId={agencySubscription?.customerId || ''}
        planExists={agencySubscription?.Subscription?.active === true}
      />
      <PageHeader
        title="Billing"
        description="Your current plan, add-ons and payment history."
      />

      <h2 className="section-label mb-4">Current plan</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <PricingCard
          planExists={agencySubscription?.Subscription?.active === true}
          prices={prices.data}
          customerId={agencySubscription?.customerId || ''}
          amt={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.price || '$0'
              : '$0'
          }
          buttonCta={
            agencySubscription?.Subscription?.active === true
              ? 'Change Plan'
              : 'Get Started'
          }
          highlightDescription="Change your plan whenever you need to. If you have questions, get in touch with support."
          highlightTitle="Plan Options"
          description={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.description || 'Get started'
              : 'Pick the plan that fits how you work. You can change it any time.'
          }
          duration="/ month"
          features={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.features || []
              : currentPlanDetails?.features ||
                pricingCards.find((pricing) => pricing.title === 'Starter')
                  ?.features ||
                []
          }
          title={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.title || 'Starter'
              : 'Starter'
          }
        />
        {addOns.data.map((addOn) => (
          <PricingCard
            planExists={agencySubscription?.Subscription?.active === true}
            prices={prices.data}
            customerId={agencySubscription?.customerId || ''}
            key={addOn.id}
            amt={
              //@ts-ignore
              addOn.default_price?.unit_amount
                ? //@ts-ignore
                  `$${addOn.default_price.unit_amount / 100}`
                : '$0'
            }
            buttonCta="Subscribe"
            description="Dedicated support line & teams channel for support"
            duration="/ month"
            features={[]}
            title={'24/7 priority support'}
            highlightTitle="Get support now!"
            highlightDescription="Get priority support and skip the long long with the click of a button."
          />
        ))}
      </div>
      <h2 className="section-label mb-4 mt-12">Payment history</h2>
      <div className="overflow-hidden rounded-lg border border-border bg-background">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent [&_th]:h-11 [&_th]:text-[11px] [&_th]:font-medium [&_th]:uppercase [&_th]:tracking-[0.1em] [&_th]:text-muted-foreground">
            <TableHead className="w-[200px]">Description</TableHead>
            <TableHead className="w-[200px]">Invoice Id</TableHead>
            <TableHead className="w-[300px]">Date</TableHead>
            <TableHead className="w-[200px]">Paid</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCharges.map((charge) => (
            <TableRow key={charge.id}>
              <TableCell>{charge.description}</TableCell>
              <TableCell className="text-muted-foreground">
                {charge.id}
              </TableCell>
              <TableCell>{charge.date}</TableCell>
              <TableCell>
                <span
                  className={clsx(
                    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.08em]',
                    {
                      'border-border text-muted-foreground':
                        charge.status.toLowerCase() === 'paid',
                      'border-amber-600/30 text-amber-700 dark:text-amber-500':
                        charge.status.toLowerCase() === 'pending',
                      'border-destructive/30 text-destructive':
                        charge.status.toLowerCase() === 'failed',
                    }
                  )}
                >
                  {charge.status}
                </span>
              </TableCell>
              <TableCell className="text-right tabular-nums">{charge.amount}</TableCell>
            </TableRow>
          ))}
          {allCharges.length === 0 && (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={5} className="h-28 text-center text-sm text-muted-foreground">
                No payments yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>
    </>
  )
}

export default page
