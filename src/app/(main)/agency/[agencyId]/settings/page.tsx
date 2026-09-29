import AgencyDetails from '@/components/forms/agency-details'
import { PageToolbar } from '@/components/admin/toolbar'
import SettingsSection from '@/components/admin/settings-section'
import { ErrorState } from '@/components/global/states'
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
        <PageToolbar title="Settings" />

        <div className="max-w-5xl">
          <SettingsSection
            title="Agency profile"
            description="Your agency's name, logo and contact details. These appear on invoices and anywhere a client sees who built their site."
          >
            <AgencyDetails data={agencyDetails} />
          </SettingsSection>

          <SettingsSection
            title="Your account"
            description="How you appear to your team and on activity logs across the agency."
          >
            <UserDetails
              type="AGENCY_OWNER"
              id={resolvedParams.agencyId}
              subAccounts={agencyDetails.SubAccount}
              userData={userDetails}
            />
          </SettingsSection>
        </div>
      </>
    )
  } catch (error) {
    console.error('Settings page failed to load:', error)
    return (
      <>
        <PageToolbar title="Settings" />
        <div className="py-6">
          <ErrorState
            title="We couldn't load your settings"
            description="The request didn't complete. Reload the page, or come back in a moment."
            backHref={`/agency/${(await params).agencyId}`}
            backLabel="Back to dashboard"
          />
        </div>
      </>
    )
  }
}

export default SettingsPage
