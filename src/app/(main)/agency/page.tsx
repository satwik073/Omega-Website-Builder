import OnboardAgencyDetails from '@/components/forms/onboard-agency'
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries'
import { currentUser } from '@clerk/nextjs/server'
import { Plan } from '@prisma/client'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ plan: Plan; state: string; code: string }>
}) => {
  const resolvedSearchParams = await searchParams
  const agencyId = await verifyAndAcceptInvitation()

  // Get the user's details
  const user = await getAuthUserDetails()
  if (agencyId) {
    if (user?.role === 'SUBACCOUNT_GUEST' || user?.role === 'SUBACCOUNT_USER') {
      return redirect('/subaccount')
    } else if (user?.role === 'AGENCY_OWNER' || user?.role === 'AGENCY_ADMIN') {
      if (resolvedSearchParams.plan) {
        return redirect(
          `/agency/${agencyId}/billing?plan=${resolvedSearchParams.plan}`
        )
      }
      if (resolvedSearchParams.state) {
        const statePath = resolvedSearchParams.state.split('___')[0]
        const stateAgencyId = resolvedSearchParams.state.split('___')[1]
        if (!stateAgencyId) return <div>Not authorized</div>
        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${resolvedSearchParams.code}`
        )
      } else return redirect(`/agency/${agencyId}`)
    } else {
      return <div>Not authorized</div>
    }
  }

  const authUser = await currentUser()

  return (
    // Onboarding mirrors the sign-in split: the form on the left, a calm
    // product-led column on the right that collapses away on small screens.
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="no-scrollbar flex flex-col overflow-y-auto px-6 py-10 md:px-12 lg:h-screen">
        <div className="mx-auto w-full max-w-xl">
          <OnboardAgencyDetails
            typeConfiguration="AGENCY_CONFIGURATION"
            data={{ companyEmail: authUser?.emailAddresses[0].emailAddress }}
            titleContent="Company Information"
            descriptionContent="Let's create an agency for your business. You can edit agency settings later from the agency settings tab."
          />
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-foreground lg:block">
        <video
          src="/assets/using2.mp4"
          className="size-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </div>
  )
}

export default Page
