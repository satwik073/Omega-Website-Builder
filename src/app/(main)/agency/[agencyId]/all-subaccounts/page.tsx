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
    <AlertDialog>
      <div className="flex flex-col">
        <CreateSubaccountButton
          user={user}
          id={resolvedParams.agencyId}
          className="w-[200px] self-end m-6"
        />
        <Command className="rounded-lg">
          <CommandInput placeholder="Search Account..." />
          <CommandList>
            <CommandEmpty>No Results Found.</CommandEmpty>
            <CommandGroup heading="Sub Accounts">
              <div className="px-4">
                <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6 p-2">
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
                              width={160}
                              height={200}
                              className="object-contain border-[6px] border-black rounded-md"
                            />
                          </div>
                          {/* Subaccount Info */}
                          <Separator />
                          <div className='flex justify-between w-full items-center '>

                            <div className="p-4">
                              <h2 className="text-md font-semibold tracking-tight text-gray-900 truncate">
                                {subaccount.name}
                              </h2>
                              <p className="text-sm text-green-600 truncate items-center gap-2 flex"><IconCircleFilled size={10} /> Published</p>
                              {/* <p className="text-sm text-gray-600 truncate">{subaccount.address}</p> */}
                            </div>
                            <div className="flex justify-end p-4">
                              <div className="w-8 h-8 border-[1px] border-gray-400 rounded-md flex items-center justify-center">
                                <IconDots/>
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
  )
}

export default AllSubaccountsPage
