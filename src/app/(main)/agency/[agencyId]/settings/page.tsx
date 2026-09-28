import AgencyDetails from '@/components/forms/agency-details'
import PageHeader from '@/components/global/page-header'
import UserDetails from '@/components/forms/user-details'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
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
    if (!authUser)
      return <p className="text-sm text-muted-foreground">Authentication required</p>
    if (!userDetails)
      return <p className="text-sm text-muted-foreground">User details not found</p>
    if (!agencyDetails)
      return <p className="text-sm text-muted-foreground">Agency details not found</p>

    // Extract sub-accounts for rendering
    const subAccounts = agencyDetails.SubAccount

    return (
      <>
        <PageHeader
          title="Settings"
          description="Manage your agency profile and the people who can access it."
        />
        <div className="grid gap-6 lg:grid-cols-2">
        {/* Render agency details */}
        <AgencyDetails data={agencyDetails}  titleContent='Agency Information'
            descriptionContent='Create an agency for your business. You can change these settings
            later from the agency settings tab.'/>

        {/* Render user details with sub-accounts */}
        <UserDetails
          type="AGENCY_OWNER"
          id={resolvedParams.agencyId}
          subAccounts={subAccounts}
          userData={userDetails}
        />
        </div>
      </>
    )
  } catch (error) {
    console.error('Error loading settings page:', error)
    return (
      <p className="text-sm text-muted-foreground">
        An error occurred while loading the settings. Please try again later.
      </p>
    )
  }
}

export default SettingsPage
