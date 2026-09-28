'use client'
import SubscriptionFormWrapper from '@/components/forms/subscription-form/subscription-form-wrapper'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PricesList } from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
  features: string[]
  buttonCta: string
  title: string
  description: string
  amt: string
  duration: string
  highlightTitle: string
  highlightDescription: string
  customerId: string
  prices: PricesList['data']
  planExists: boolean
}

const PricingCard = ({
  amt,
  buttonCta,
  customerId,
  description,
  duration,
  features,
  highlightDescription,
  highlightTitle,
  planExists,
  prices,
  title,
}: Props) => {
  const { setOpen } = useModal()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')

  const handleManagePlan = async () => {
    setOpen(
      <CustomModal
        title={'Manage Your Plan'}
        subheading="You can change your plan at any time from the billings settings"
      >
        <SubscriptionFormWrapper
          customerId={customerId}
          planExists={planExists}
        />
      </CustomModal>,
      async () => ({
        plans: {
          defaultPriceId: plan ? plan : '',
          plans: prices,
        },
      })
    )
  }
  return (
    <Card className="flex w-full flex-col justify-between">
      <div>
        <CardHeader className="flex flex-col justify-between gap-4 md:!flex-row md:items-start">
          <div className="min-w-0">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {/* Price set in the display serif, like the marketing pricing
              cards, and kept on one line beside its unit. */}
          <p className="flex shrink-0 items-baseline gap-1.5 font-display text-[40px] font-normal leading-none tracking-[-0.04em] tabular-nums">
            {amt}
            <small className="text-[13px] font-normal tracking-normal text-muted-foreground">
              {duration}
            </small>
          </p>
        </CardHeader>
        <CardContent>
          <ul>
            {features.map((feature) => (
              <li
                key={feature}
                className="list-disc ml-4 text-muted-foreground"
              >
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </div>
      <CardFooter>
        <Card className="w-full">
          <div className="flex flex-col md:!flex-row items-center justify-between rounded-lg border gap-4 p-4">
            <div>
              <p>{highlightTitle}</p>
              <p className="text-sm text-muted-foreground">
                {highlightDescription}
              </p>
            </div>

            <Button
              className="md:w-fit w-full"
              onClick={handleManagePlan}
            >
              {buttonCta}
            </Button>
          </div>
        </Card>
      </CardFooter>
    </Card>
  )
}

export default PricingCard
