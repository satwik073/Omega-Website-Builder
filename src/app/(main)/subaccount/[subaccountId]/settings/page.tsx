import SubAccountDetails from '@/components/forms/subaccount-details'
import PageHeader from '@/components/global/page-header'
import UserDetails from '@/components/forms/user-details'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

type Props = {
  params: Promise<{ subaccountId: string }>
}

const SubaccountSettingPage = async ({ params }: Props) => {
  const resolvedParams = await params

  const authUser = await currentUser()
  if (!authUser) return null

  const userDetails = await db.user.findUnique({
    where: {
      email: authUser.emailAddresses[0]?.emailAddress,
    },
  })
  if (!userDetails) return null

  const subAccount = await db.subAccount.findUnique({
    where: { id: resolvedParams.subaccountId },
  })
  if (!subAccount) return null

  const agencyDetails = await db.agency.findUnique({
    where: { id: subAccount.agencyId },
    include: { SubAccount: true },
  })

  if (!agencyDetails) return null

  const subAccounts = agencyDetails.SubAccount

  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage this sub account and the people who can access it."
      />
            <div className="flex lg:!flex-row flex-col gap-4">
        <SubAccountDetails
          agencyDetails={agencyDetails}
          details={subAccount}
          userId={userDetails.id}
          userName={userDetails.name}
        />
        <UserDetails
          type="SUBACCOUNT_USER"
          id={resolvedParams.subaccountId}
          subAccounts={subAccounts}
          userData={userDetails}
        />
      </div>
    </>
  )
}

export default SubaccountSettingPage
