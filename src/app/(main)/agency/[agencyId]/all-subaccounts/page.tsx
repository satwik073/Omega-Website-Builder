import { AlertDescription } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { getAuthUserDetails } from '@/lib/queries'
import { SubAccount } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

import React from 'react'
import DeleteButton from './_components/delete-button'
import CreateSubaccountButton from './_components/create-subaccount-btn'
import { Separator } from '@/components/ui/separator'
import { IconCircle, IconCircleFilled, IconDots } from '@tabler/icons-react'

type Props = {
  params: Promise<{ agencyId: string }>
}

const AllSubaccountsPage = async ({ params }: Props) => {
  // Resolve the Promise for params
  const resolvedParams = await params
  const user = await getAuthUserDetails()

  if (!user) return null // Return null or a fallback UI if no user is authenticated

  return (
    <React.Fragment>
      <section
        className=" w-full relative  flex items-center mt-6 justify-center flex-col"

      >
        <header className=' w-full lg:px-10 max-w-7xl justify-center item-center  h-full flex z-30'>
          <div className='w-full'>
            <div className='lg:flex items-start justify-between'>
              <div className='lg:w-1/2'>

                <div className='text-3xl lg:text-5xl tracking-tighter font-bold mb-2 lg:w-full w-full md:w-2/3'>Let’s Grow Together with New Clients!

                </div>
              </div>
              <div className='lg:w-1/2 lg:justify-end flex items-start lg:ml-8'>
                <p className='md:text-lg text-sm  max-w-md w-full'>    <p className="text-md lg:text-lg">
                  When you partner with Arobix, you gain access to personalized support, innovative solutions, and the tools you need to help your clients succeed and grow
                </p>


                </p>
              </div>

            </div>
          </div>
        </header>

      </section>
      <AlertDialog>
        <div className="flex flex-col">
          <Command className="rounded-lg w-full">
            <div className='sm:flex w-full my-8 md:my-12 items-center  gap-2 lg:px-10 justify-center'>
              <div className='text-3xl tracking-tighter font-bold mb-2 mr-4 '>Accounts</div>
              <CommandInput placeholder="Search Account..." />
              <div className='flex sm:mt-0 mt-2'>

                <CreateSubaccountButton
                  user={user}
                  id={resolvedParams.agencyId}
                  className="self-start "
                />

              </div>
            </div>
            <CommandList>
              {/* <CommandEmpty className='text-red-600 flex justify-center'>No Results Found.</CommandEmpty> */}
              <CommandGroup className='lg:px-10 '>
                <div className=''>
                  Showing {user?.Agency?.SubAccount?.length} Sub accounts
                </div>
                <div >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-6 max-w-7xl ">
                    {!!user.Agency?.SubAccount.length ? (
                      user.Agency.SubAccount.map((subaccount: SubAccount) => (
                        <div
                          key={subaccount.id}
                          className="rounded-lg overflow-hidden border"
                        >
                          {/* Subaccount Image */}
                          <Link href={`/subaccount/${subaccount.id}`} className="block">
                            <div className="relative w-full h-48 flex items-center justify-center p-4">
                              <Image
                                src={subaccount.subAccountLogo || '/placeholder.png'}
                                alt={`${subaccount.name} logo`}
                                width={200}
                                height={200}
                                className="sm:object-cover object-contain sm:w-full sm:h-full rounded-md border-[6px] border-black"
                              />
                            </div>

                            {/* Subaccount Info */}
                            <Separator />
                            <div className='flex justify-between w-full items-center '>

                              <div className="p-4">
                                <h2 className="text-md font-semibold tracking-tight  truncate">
                                  {subaccount.name}
                                </h2>
                                <div>

                                  {/* Access Value */}
                                  {user?.Permissions?.find(permission => permission.subAccountId === subaccount?.id)?.access === true
                                    ? <span className='text-sm text-green-600 dark:text-green-500 truncate items-center gap-2 flex'><IconCircleFilled size={10} />Published</span>
                                    : <span className=' text-sm truncate items-center gap-2 flex text-red-600'><IconCircleFilled size={10} />Pending</span>}
                                </div>
                                {/* <p className="text-sm text-gray-600 truncate">{subaccount.address}</p> */}
                              </div>
                              <div className="flex justify-end p-4">
                                <div className="w-8 h-8 border-[1px] border-gray-400 rounded-md flex items-center justify-center">
                                  <IconDots />
                                </div>
                              </div>
                            </div>

                          </Link>

                          {/* Action Buttons
                        <div className="flex items-center justify-between p-4 border-t border-gray-200">
                          <AlertDialogTrigger asChild>
                            <button className="text-sm text-red-600 hover:text-red-800">
                              Delete
                            </button>
                          </AlertDialogTrigger>
                          <Link
                            href={`/subaccount/${subaccount.id}`}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Manage
                          </Link>
                        </div> */}

                          {/* Alert Dialog */}
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-left">
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-left">
                                This action cannot be undone. This will delete the subaccount and
                                all associated data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction>
                                <DeleteButton subaccountId={subaccount.id} />
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center col-span-full">
                        No Subaccounts Available
                      </p>
                    )}
                  </div>

                </div>

              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </AlertDialog>
    </React.Fragment>
  )
}

export default AllSubaccountsPage
