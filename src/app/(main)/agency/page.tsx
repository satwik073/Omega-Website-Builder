import AgencyDetails from '@/components/forms/agency-details'
import { Button } from '@/components/ui/button'
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries'
import { currentUser } from '@clerk/nextjs'
import { Plan } from '@prisma/client'
import { IconArrowUpRight } from '@tabler/icons-react'
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
    <React.Fragment>

      <section
        className=" w-full relative md:mt-20 mt-12 flex items-center justify-center flex-col px-4 lg:px-12 "

      >
        <header className=' w-full lg:px-0 md:px-10 lg:w-11/12 max-w-7xl justify-center item-center  h-full flex z-30'>
          <div className='w-full'>
            <div className='lg:flex items-center justify-between'>
              <div className='lg:w-1/2'>

                <div className='text-3xl lg:text-5xl tracking-tighter font-bold mb-2'> Grow your business online with Arobix</div>
              </div>
              <div className='lg:w-1/2 lg:justify-end flex items-end lg:ml-8'>
                <p className='md:text-lg text-sm  my-4 md:my-5 max-w-md w-full'> Select from any of our industry-leading website templates, designer fonts,
                  and color palettes that best fit your personal style and professional needs.
                  <div className='flex gap-4 mt-5'>
                    <Button variant={'default'} className={`text-[#2e4acd] text-md px-0 flex justify-start bg-transparent hover:bg-transparent cursor-pointer`}> Get Started <IconArrowUpRight className='text-[#2e4acd]' /></Button>

                  </div>
                </p>
              </div>

            </div>
          </div>
        </header>

      </section>
      <div className="flex justify-center items-center mt-4">
        <div className="max-w-[850px] border-[1px] p-4 rounded-xl">
          <h1 className="text-4xl">Create An Agency</h1>
          <AgencyDetails
            data={{ companyEmail: authUser?.emailAddresses[0].emailAddress }}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Page
