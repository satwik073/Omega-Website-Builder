import { getAuthUserDetails } from '@/lib/queries'
import React from 'react'
import CreateSubaccountButton from './_components/create-subaccount-btn'
import SubaccountsGrid from './_components/subaccounts-grid'

type Props = {
  params: Promise<{ agencyId: string }>
}

/**
 * Every client workspace the agency manages.
 *
 * This page previously stacked three competing headings (a PageHeader, a
 * 5xl marketing headline, and an "Accounts" title) over a search box that
 * filtered nothing. It is now a single header plus a working grid.
 */
const AllSubaccountsPage = async ({ params }: Props) => {
  const resolvedParams = await params
  const user = await getAuthUserDetails()

  if (!user) return null

  const subaccounts = user.Agency?.SubAccount ?? []
  const accessibleIds = (user.Permissions ?? [])
    .filter((permission) => permission.access)
    .map((permission) => permission.subAccountId)

  const createButton = (
    <CreateSubaccountButton user={user} id={resolvedParams.agencyId} />
  )

  return (
    <SubaccountsGrid
      subaccounts={subaccounts}
      accessibleIds={accessibleIds}
      createAction={createButton}
    />
  )
}

export default AllSubaccountsPage
