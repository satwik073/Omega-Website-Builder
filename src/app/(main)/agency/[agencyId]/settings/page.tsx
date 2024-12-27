import AgencyDetails from '@/components/forms/agency-details'
import UserDetails from '@/components/forms/user-details'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

type Props = {
  params: Promise<{ agencyId: string }>
}

const SettingsPage = async ({ params }: Props) => {
  try {
    // Resolve the Promise for params
    const resolvedParams = await params

    // Fetch current authenticated user
    const authUserPromise = currentUser()

    // Fetch user details from the database
    const userDetailsPromise = authUserPromise.then(async (authUser) => {
      if (!authUser) return null
      return await db.user.findUnique({
        where: {
          email: authUser.emailAddresses[0]?.emailAddress,
        },
      })
    })

    // Fetch agency details from the database
    const agencyDetailsPromise = userDetailsPromise.then(async (userDetails) => {
      if (!userDetails) return null
      return await db.agency.findUnique({
        where: {
          id: resolvedParams.agencyId,
        },
        include: {
          SubAccount: true, // Include related SubAccounts
        },
      })
    })

    // Resolve all promises
    const [authUser, userDetails, agencyDetails] = await Promise.all([
      authUserPromise,
      userDetailsPromise,
      agencyDetailsPromise,
    ])

    // Handle missing data
    if (!authUser) return <p>Authentication required</p>
    if (!userDetails) return <p>User details not found</p>
    if (!agencyDetails) return <p>Agency details not found</p>

    // Extract sub-accounts for rendering
    const subAccounts = agencyDetails.SubAccount

    return (
      <div className="flex lg:!flex-row flex-col gap-4">
        {/* Render agency details */}
        <AgencyDetails data={agencyDetails} />

        {/* Render user details with sub-accounts */}
        <UserDetails
          type="agency"
          id={resolvedParams.agencyId}
          subAccounts={subAccounts}
          userData={userDetails}
        />
      </div>
    )
  } catch (error) {
    console.error('Error loading settings page:', error)
    return <p>An error occurred while loading the settings. Please try again later.</p>
  }
}

export default SettingsPage
