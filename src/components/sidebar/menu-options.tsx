'use client'

import {
  Agency,
  AgencySidebarOption,
  SubAccount,
  SubAccountSidebarOption,
} from '@prisma/client'
import clsx from 'clsx'
import { ArrowUpRight, Check, ChevronsUpDown, Menu, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

import { icons } from '@/lib/constants'
import { cn, displayName } from '@/lib/utils'
import { useModal } from '@/providers/modal-provider'
import SubAccountDetails from '../forms/subaccount-details'
import { BrandMark } from '../global/brand-mark'
import CustomModal from '../global/custom-modal'
import EntityLogo from '../global/entity-logo'
import { Button } from '../ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet'

type Props = {
  defaultOpen?: boolean
  subAccounts: SubAccount[]
  sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[]
  sidebarLogo: string
  details: any
  user: any
  id: string
}

/** Identity row: logo, name, and one line of context. */
const AccountRow = ({
  logo,
  name,
  meta,
  selected,
}: {
  logo?: string | null
  name?: string | null
  meta?: string | null
  selected?: boolean
}) => (
  <div className="flex min-w-0 flex-1 items-center gap-2.5">
    <div className="relative size-8 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
      <EntityLogo
        src={logo}
        name={name ?? '—'}
        fill
        rounded="none"
        className="size-full"
        imageClassName="p-1"
      />
    </div>
    <div className="flex min-w-0 flex-col text-left">
      <span className="truncate text-[13px] font-medium leading-tight">
        {name}
      </span>
      {meta && (
        <span className="truncate text-[11px] leading-tight text-muted-foreground">
          {meta}
        </span>
      )}
    </div>
    {selected && <Check className="size-3.5 shrink-0 text-muted-foreground" />}
  </div>
)

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
  const pathname = usePathname()

  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const routes: string[] = []
    if (user?.Agency?.id) routes.push(`/agency/${user.Agency.id}`)
    subAccounts.forEach((sa) => routes.push(`/subaccount/${sa.id}`))
    routes.forEach((r) => router.prefetch(r))
  }, [router, user?.Agency?.id, subAccounts])

  if (!isMounted) return null

  // Exactly one item lights up: the longest link matching the current path.
  // Marking every prefix match left the dashboard permanently lit.
  const activeLink = sidebarOpt
    .map((option) => option.link)
    .filter(
      (link) =>
        pathname === link || (link !== '/' && pathname.startsWith(`${link}/`))
    )
    .sort((a, b) => b.length - a.length)[0]

  const isAgencyStaff =
    user?.role === 'AGENCY_OWNER' || user?.role === 'AGENCY_ADMIN'
  const isAgencyContext = pathname.startsWith('/agency')

  return (
    <Sheet modal={false} {...openState}>
      <SheetTrigger asChild className="absolute left-4 top-3 z-[100] md:!hidden">
        <Button variant="outline" size="icon-sm" aria-label="Open navigation">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        showX={!defaultOpen}
        side="left"
        className={clsx(
          'fixed top-0 flex flex-col gap-0 border-r border-border bg-card p-0',
          {
            'hidden md:flex z-0 w-[272px]': defaultOpen,
            'flex md:hidden z-[100] w-full': !defaultOpen,
          }
        )}
      >
        {/* Workspace switcher. Doubles as the brand anchor, so the sidebar
            opens with identity rather than a bare list of links. */}
        <div className="p-2.5">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-md border border-border bg-background p-2 text-left transition-colors duration-fast ease-standard hover:border-muted-foreground/30 hover:bg-muted"
              >
                <AccountRow
                  logo={sidebarLogo}
                  name={details?.name}
                  meta={isAgencyContext ? 'Agency' : 'Sub account'}
                />
                <ChevronsUpDown className="size-3.5 shrink-0 text-muted-foreground" />
              </button>
            </PopoverTrigger>

            <PopoverContent align="start" className="z-[10000] w-[268px] p-0">
              <Command className="rounded-md">
                <CommandInput placeholder="Search workspaces…" />
                <CommandList className="max-h-[320px]">
                  <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                    Nothing found
                  </CommandEmpty>

                  {isAgencyStaff && user?.Agency && (
                    <CommandGroup heading="Agency">
                      <CommandItem className="cursor-pointer p-0">
                        <Link
                          href={`/agency/${user.Agency.id}`}
                          className="flex w-full px-2 py-1.5"
                        >
                          <AccountRow
                            logo={user.Agency.agencyLogo}
                            name={user.Agency.name}
                            meta="Agency"
                            selected={isAgencyContext}
                          />
                        </Link>
                      </CommandItem>
                    </CommandGroup>
                  )}

                  <CommandGroup heading="Sub accounts">
                    {subAccounts?.length ? (
                      subAccounts.map((subaccount) => (
                        <CommandItem
                          key={subaccount.id}
                          className="cursor-pointer p-0"
                        >
                          <Link
                            href={`/subaccount/${subaccount.id}`}
                            className="flex w-full px-2 py-1.5"
                          >
                            <AccountRow
                              logo={subaccount.subAccountLogo}
                              name={subaccount.name}
                              meta={subaccount.city || 'Sub account'}
                              selected={!isAgencyContext && subaccount.id === id}
                            />
                          </Link>
                        </CommandItem>
                      ))
                    ) : (
                      <p className="px-3 py-4 text-sm text-muted-foreground">
                        No sub accounts yet
                      </p>
                    )}
                  </CommandGroup>
                </CommandList>

                {isAgencyStaff && (
                  <div className="border-t border-border p-1.5">
                    <SheetClose asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() =>
                          setOpen(
                            <CustomModal
                              title="Create a sub account"
                              subheading="Sub accounts are the client workspaces you build and publish sites in."
                            >
                              <SubAccountDetails
                                agencyDetails={user?.Agency as Agency}
                                userId={user?.id as string}
                                userName={user?.name}
                              />
                            </CustomModal>
                          )
                        }
                      >
                        <PlusCircle />
                        Create sub account
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Primary navigation */}
        <nav className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-2.5 pb-4">
          <ul className="flex flex-col gap-0.5">
            {sidebarOpt.map((option) => {
              const result = icons.find((icon) => icon.value === option.icon)
              const Glyph = result?.path
              const active = option.link === activeLink

              return (
                <li key={option.id}>
                  <Link
                    href={option.link}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'group relative flex items-center gap-2.5 rounded-md py-2 pl-3 pr-2.5 text-[13px] transition-colors duration-fast ease-standard',
                      active
                        ? 'bg-accent font-medium text-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {/* Accent rule on the active row, echoing the marketing
                        eyebrow dot. */}
                    <span
                      aria-hidden
                      className={cn(
                        'absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full bg-brand transition-opacity duration-fast',
                        active ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {Glyph && (
                      <span className="flex size-4 shrink-0 items-center justify-center [&_svg]:size-4">
                        <Glyph />
                      </span>
                    )}
                    <span className="truncate">{option.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer: who you are, and a way back out to the public site. */}
        <div className="mt-auto border-t border-border p-2.5">
          {user?.name && (
            <div className="mb-1 flex items-center gap-2.5 rounded-md px-3 py-2">
              <div className="relative size-6 shrink-0 overflow-hidden rounded-full">
                <EntityLogo
                  src={user.avatarUrl}
                  name={displayName(user.name, user.email)}
                  fill
                  rounded="full"
                  className="size-full"
                  imageClassName="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[12px] font-medium leading-tight">
                  {displayName(user.name, user.email)}
                </span>
                <span className="truncate text-[11px] capitalize leading-tight text-muted-foreground">
                  {String(user.role ?? '')
                    .toLowerCase()
                    .replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          )}

          <Link
            href="/site"
            className="flex items-center justify-between gap-2 rounded-md px-3 py-2 text-[13px] text-muted-foreground transition-colors duration-fast hover:bg-muted hover:text-foreground"
          >
            <span className="flex items-center gap-2.5">
              <BrandMark className="size-4" />
              Arobix
            </span>
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MenuOptions
