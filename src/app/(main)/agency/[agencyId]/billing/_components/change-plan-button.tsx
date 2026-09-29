'use client'

import SubscriptionFormWrapper from '@/components/forms/subscription-form/subscription-form-wrapper'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import type { PlanPrice } from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { CreditCard } from 'lucide-react'
import React from 'react'

/** Opens the plan picker. Split out so the billing view stays presentational. */
const ChangePlanButton = ({
  prices,
  customerId,
  planExists,
}: {
  prices: PlanPrice[]
  customerId: string
  planExists: boolean
}) => {
  const { setOpen } = useModal()

  return (
    <Button
      onClick={() =>
        setOpen(
          <CustomModal
            title={planExists ? 'Change your plan' : 'Choose a plan'}
            subheading="Pick the plan that fits how you work. You can change it at any time."
          >
            <SubscriptionFormWrapper
              planExists={planExists}
              customerId={customerId}
            />
          </CustomModal>,
          async () => ({
            plans: { defaultPriceId: '', plans: prices },
          })
        )
      }
    >
      <CreditCard />
      {planExists ? 'Change plan' : 'Choose a plan'}
    </Button>
  )
}

export default ChangePlanButton
