'use client'

import {
  Agency,
  AgencySidebarOption,
  SubAccount,
  SubAccountSidebarOption,
} from '@prisma/client'
import React, { useEffect, useMemo, useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { ChevronsUpDown, Compass, Menu, PlusCircleIcon } from 'lucide-react'
import clsx from 'clsx'
import { AspectRatio } from '../ui/aspect-ratio'
import Image from 'next/image'
import { IconChevronUp, IconHome, IconSearch, IconSelector } from '@tabler/icons-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { useModal } from '@/providers/modal-provider'
import CustomModal from '../global/custom-modal'
import SubAccountDetails from '../forms/subaccount-details'
import { Separator } from '../ui/separator'
import { icons } from '@/lib/constants'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Tooltip, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { TooltipContent } from '../ui/tooltip'
import { useRouter } from 'next/navigation'

type Props = {
  defaultOpen?: boolean
  subAccounts: SubAccount[]
  sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[]
  sidebarLogo: string
  details: any
  user: any
  id: string
}

const MenuOptions = ({
  details,
  id,
  sidebarLogo,
  sidebarOpt,
  subAccounts,
  user,
  defaultOpen,
}: Props) => {
  const { setOpen } = useModal()
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const routes: string[] = []
    if (user?.Agency?.id) {
      routes.push(`/agency/${user.Agency.id}`)
    }
    subAccounts.forEach((sa) => routes.push(`/subaccount/${sa.id}`))
    routes.forEach((r) => router.prefetch(r))
  }, [router, user?.Agency?.id, subAccounts])

  if (!isMounted) return

  return (
    <Sheet 
      modal={false}
      {...openState}
    >
      <SheetTrigger
        asChild
        className="absolute left-4 z-[100] md:!hidden felx"
      >
        <Button
          variant="outline"
          size={'icon'}
        >
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        showX={!defaultOpen}
        side={'left'}
        className={clsx(
          'bg-gray-100 backdrop-blur-xl fixed top-0 border-r-[1px] p-6',
          {
            'hidden md:inline-block z-0 w-[300px]': defaultOpen,
            'inline-block md:hidden z-[100] w-full': !defaultOpen,
          }
        )}
      >
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <div className="w-full   cursor-pointer mb-4 flex items-center justify-between">
                {/* Left Section: Image and Details */}
                <div className="flex items-center gap-4 w-full">
                  {/* Image */}
                  <div className="w-12 h-12 flex-shrink-0 flex justify-center items-center relative bg-gradient-to-br from-black/10 to-gray-500 rounded-xl">
                    {/* Uncomment this if using the Image */}
                    <Image
                      src={sidebarLogo}
                      alt="Sidebar Logo"
                      fill
                      className="rounded-md object-contain"
                    />
                    {/* <Image
                      src={'/assets/one-week.png'}
                      alt="Sidebar Logo"
                      fill
                      className="rounded-md object-contain"
                    /> */}
                  </div>
                  {/* Name and Details */}

                  <div className='flex flex-col'>

                    <span className="text-base text-start font-bold truncate ">{details?.name}</span>
                    <span className="text-xs text-start">{details?.address}</span>
                  </div>
                </div>

                {/* Right Section: Selector Icon */}
                <div className="flex items-center flex-shrink-0">
                  <IconSelector size={24} className="text-muted-foreground" />
                </div>
              </div>

            </PopoverTrigger>
            <PopoverContent className="w-80 mx-6 mt-3 z-[10000]">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </p>
                </div>
                <Command className="rounded-lg">
                  <CommandInput placeholder="Search Accounts..." />
                  <CommandList className="pb-16  overflow-y-scroll no-scrollbar max-h-[305px]">
                    <CommandEmpty className=' text-red-600 text-center text-sm pt-4'>No Results Found</CommandEmpty>

                    {/* Agency Section */}
                    {(user?.role === 'AGENCY_OWNER' || user?.role === 'AGENCY_ADMIN') && user?.Agency && (
                      <CommandGroup heading="Agency">
                        <CommandItem className="my-2 text-primary border-[1px] border-border p-2 rounded-md cursor-pointer transition-all">
                          <Link href={`/agency/${user?.Agency?.id}`} className="flex gap-4 w-full h-full">
                            <div className="w-full cursor-pointer flex items-center justify-between">
                              {/* Left Section: Image and Details */}
                              <div className="flex items-center gap-4 w-full">
                                <div className="w-12 h-12 flex-shrink-0 flex justify-center items-center relative bg-gradient-to-br from-black/10 to-gray-500 rounded-xl">
                                  <Image
                                    src={user?.Agency?.agencyLogo || '/placeholder.png'}
                                    alt="Agency Logo"
                                    fill
                                    className="rounded-md object-contain aspect-square justify-center  items-center flex"
                                  />
                                  {/* <Image
                                    src={'/assets/one-week.png'}
                                    alt="Sidebar Logo"
                                    fill
                                    className="rounded-md object-contain"
                                  /> */}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-base text-start font-bold truncate">{user?.Agency?.name}</span>
                                  <span className="text-xs text-start truncate w-[80%]">{user?.Agency?.address}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </CommandItem>
                      </CommandGroup>
                    )}

                    {/* Subaccounts Section */}
                    <CommandGroup heading="Accounts" >
                      {subAccounts?.length ? (
                        subAccounts.map((subaccount) => (
                          <CommandItem
                            key={subaccount?.id}
                            className="my-2 text-primary border-[1px] border-border p-2 rounded-md cursor-pointer transition-all"
                          >
                            <Link href={`/subaccount/${subaccount.id}`} className="flex gap-4 w-full h-full">
                              <div className="w-full cursor-pointer flex items-center justify-between">
                                <div className="flex items-center gap-4 w-full">
                                  <div className="w-12 h-12 flex-shrink-0 flex justify-center items-center relative bg-gradient-to-br from-black/10 to-gray-500 rounded-xl">
                                    <Image
                                      src={subaccount.subAccountLogo || '/placeholder.png'}
                                      alt="Subaccount Logo"
                                      fill
                                      className="rounded-md object-contain"
                                    />
                                    {/* <Image
                                      src={'/assets/fireart.png'}
                                      alt="Sidebar Logo"
                                      fill
                                      className="rounded-md object-contain"
                                    /> */}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-base text-start font-bold truncate">{subaccount.name}</span>
                                    <span className="text-xs text-start truncate w-[80%]">{subaccount.address}</span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </CommandItem>
                        ))
                      ) : (
                        <CommandEmpty>No Accounts</CommandEmpty>
                      )}
                    </CommandGroup>
                  </CommandList>

                  {/* Create Subaccount Section */}
                  {(user?.role === 'AGENCY_OWNER' || user?.role === 'AGENCY_ADMIN') && (
                    <SheetClose>
                      <Button
                        className="w-full flex gap-2"
                        onClick={() => {
                          setOpen(
                            <CustomModal
                              title="Create A Subaccount"
                              subheading="You can switch between your agency account and the subaccount from the sidebar"
                            >
                              <SubAccountDetails
                                agencyDetails={user?.Agency as Agency}
                                userId={user?.id as string}
                                userName={user?.name}
                              />
                            </CustomModal>
                          );
                        }}
                      >
                        <PlusCircleIcon size={15} />
                        Create Sub Account
                      </Button>
                    </SheetClose>
                  )}
                </Command>

              </div>
            </PopoverContent>
          </Popover>
          <p className="text-muted-foreground text-xs mb-2">MENU LINKS</p>
          <Separator className="mb-4" />
          <nav className="relative h-screen overflow-y-scroll no-scrollbar">
            <Command className="rounded-lg overflow-hidden bg-transparent h-full">
              <CommandInput placeholder="Search..." />
              {/* Scrollable Container */}
              <div className="h-[calc(100%-3rem)]  overflow-y-scroll no-scrollbar">
                {/* Command List 1 */}
                <div className='w-full py-0.5 flex justify-between items-center mt-6'>

                  <p className="text-muted-foreground flex items-center text-xs">WORKFLOWS</p>
                  <IconChevronUp size={16} className='flex items-center text-inherit' />
                </div>
                <Separator className='mt-2' />
                <CommandList className="py-4">
                  <CommandEmpty className='text-red-600 text-center text-sm pt-4'>No Results Found</CommandEmpty>
                  <CommandGroup>
                    {sidebarOpt.map((sidebarOptions) => {
                      const result = icons.find((icon) => icon.value === sidebarOptions.icon);
                      const val = result ? <result.path /> : null;
                      return (
                        <CommandItem key={sidebarOptions.id} className="md:w-[320px] w-full px-0">
                          <Link
                            href={sidebarOptions.link}
                            className="flex items-center text-inherit gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                          >
                            {val}
                            <span>{sidebarOptions.name}</span>
                          </Link>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
                {/* Command List 2 */}
                <div className='w-full py-0.5 flex justify-between items-center'>

                  <p className="text-muted-foreground flex items-center text-xs">DOCUMENTS</p>
                  <IconChevronUp size={16} className='flex items-center text-inherit' />
                </div>
                <Separator className='mt-2' />
                <CommandList className="py-4">
                  <CommandEmpty className=' text-red-600 text-center text-sm pt-4'>No Results Found</CommandEmpty>
                  <CommandGroup>
                    {sidebarOpt.map((sidebarOptions) => {
                      const result = icons.find((icon) => icon.value === sidebarOptions.icon);
                      const val = result ? <result.path /> : null;
                      return (
                        <TooltipProvider>
                          <Tooltip>
                            <CommandItem key={sidebarOptions.id} className="md:w-[320px] w-full px-0">
                              <Link
                                href={sidebarOptions.link}
                                className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                              >
                                {val}
                                <TooltipTrigger asChild>
                                  <span>{sidebarOptions.name}</span>
                                </TooltipTrigger>
                              </Link>
                            </CommandItem>
                            <TooltipContent side="right" className="bg-gray-800 text-white text-sm p-2 rounded-md shadow-lg">
                              {sidebarOptions.name || 'Tooltip content goes here'}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
                {/* Command List 3 */}
                <div className='w-full py-0.5 flex justify-between items-center'>

                  <p className="text-muted-foreground flex items-center text-xs">CONTACTS</p>
                  <IconChevronUp size={16} className='flex items-center text-inherit' />
                </div>
                <Separator className='mt-2' />
                <CommandList className="mb-36">
                  <CommandEmpty className=' text-red-600 text-center text-sm pt-4'>No Results Found</CommandEmpty>
                  <CommandGroup>
                    {sidebarOpt.map((sidebarOptions) => {
                      const result = icons.find((icon) => icon.value === sidebarOptions.icon);
                      const val = result ? <result.path /> : null;
                      return (
                        <CommandItem key={sidebarOptions.id} className="md:w-[320px] w-full px-0">
                          <Link
                            href={sidebarOptions.link}
                            className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                          >
                            {val}
                            <span>{sidebarOptions.name}</span>
                          </Link>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </div>
            </Command>
          </nav>



        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MenuOptions
