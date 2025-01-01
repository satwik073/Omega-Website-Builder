'use client'

import React from 'react'
import { Funnel, SubAccount } from '@prisma/client'
import FunnelForm from '@/components/forms/funnel-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import FunnelProductsTable from './funnel-products-table'

interface FunnelSettingsClientProps {
  subaccountDetails: SubAccount
  defaultData: Funnel
  products: any[]
}

const FunnelSettingsClient: React.FC<FunnelSettingsClientProps> = ({
  subaccountDetails,
  defaultData,
  products,
}) => {
  // Handle potential edge cases for missing subaccountDetails or connectAccountId
  if (!subaccountDetails || !subaccountDetails.connectAccountId) {
    return <div>Connect your Stripe account to sell products.</div>
  }

  return (
    <div className="flex gap-4 flex-col xl:!flex-row">
      <Card className="flex-1 flex-shrink">
        <CardHeader>
          <CardTitle>Funnel Products</CardTitle>
          <CardDescription>
            Select the products and services you wish to sell on this funnel.
            You can sell one time and recurring products too.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FunnelProductsTable
            defaultData={defaultData}
            products={products}
          />
        </CardContent>
      </Card>

      <FunnelForm subAccountId={subaccountDetails.id} defaultData={defaultData} />
    </div>
  )
}

export default FunnelSettingsClient
