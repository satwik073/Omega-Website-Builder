import AgencyDetails from '@/components/forms/agency-details'
import OnboardAgencyDetails from '@/components/forms/onboard-agency'
import { Button } from '@/components/ui/button'
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries'
import { currentUser } from '@clerk/nextjs'
import { Plan } from '@prisma/client'
import { IconArrowUpRight } from '@tabler/icons-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ plan: Plan; state: string; code: string }>
}) => {
  const resolvedSearchParams = await searchParams
  const agencyId = await verifyAndAcceptInvitation()
  console.log(agencyId)

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
    <div className="flex lg:!flex-row flex-col gap-4 justify-start items-center min-h-screen">
    {/* Uncomment this if you want a title */}
    {/* <div className='text-3xl lg:text-4xl tracking-tighter font-bold mb-2 text-left'>Create An Agency</div> */}
  <div className='md:w-1/2 scroll-smooth relative border-none  lg:overflow-y-scroll no-scrollbar lg:h-[100vh]'>

    <OnboardAgencyDetails
      typeConfiguration="AGENCY_CONFIGURATION"
      data={{ companyEmail: authUser?.emailAddresses[0].emailAddress }}
      titleContent="Company Information"
      descriptionContent="Let's create an agency for your business. You can edit agency settings later from the agency settings tab."
    />
  </div>
    <div className='md:w-1/2 lg:w-2/3 '>
      {/* <Image src={'/assets/dash.png'} width={800} height={800} alt='image'/> */}
      <video
              src="/assets/using2.mp4"
              className="  border-none"
              height="100%"
              width="100%"
              autoPlay
              preload='1'
              loop
              muted
              playsInline

            >
              Your browser does not support the video tag.
            </video>
    </div>
  </div>
  
  
 
  )
}

export default Page
