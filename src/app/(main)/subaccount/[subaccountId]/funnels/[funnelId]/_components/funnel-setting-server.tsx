import React from 'react'
import { Funnel, SubAccount } from '@prisma/client'
import { db } from '@/lib/db'
import { getConnectAccountProducts } from '@/lib/stripe/stripe-actions'
import FunnelSettingsClient from './funnel-settings'

interface FunnelSettingsProps {
  subaccountId: string
  defaultData: Funnel
}

const FunnelSettings: React.FC<FunnelSettingsProps> = async ({
  subaccountId,
  defaultData,
}) => {
  const subaccountDetails = await db.subAccount.findUnique({
    where: {
      id: subaccountId,
    },
  })

  // Handle cases where subaccountDetails is undefined or null
  if (!subaccountDetails) {
    return <div>Error: Subaccount not found.</div>
  }

  const products = subaccountDetails.connectAccountId
    ? await getConnectAccountProducts(subaccountDetails.connectAccountId)
    : []

  return (
    <FunnelSettingsClient
      subaccountDetails={subaccountDetails}
      defaultData={defaultData}
      products={products}
    />
  )
}

export default FunnelSettings
