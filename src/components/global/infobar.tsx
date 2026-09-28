'use client'

import { NotificationWithUser } from '@/lib/types'
import { cleanText, cn, displayName } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import { Role } from '@prisma/client'
import { Bell, ChevronRight, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { Switch } from '../ui/switch'
import { ModeToggle } from './mode-toggle'

type Props = {
  notifications: NotificationWithUser | []
  role?: Role
  className?: string
  subAccountId?: string
}

const isRecordId = (seg: string) =>
  seg.length > 15 && /^[a-z0-9-]+$/i.test(seg) && /\d/.test(seg)

const titleise = (seg: string) =>
  seg
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

/**
 * Breadcrumb trail from the pathname, with record ids dropped.
 * `/agency/<id>/billing` reads "Agency / Billing".
 */
const useBreadcrumbs = () => {
  const pathname = usePathname()
  return useMemo(() => {
    const parts = pathname.split('/').filter(Boolean)
    const crumbs: { label: string; href: string }[] = []
    let href = ''
    parts.forEach((seg) => {
      href += `/${seg}`
      if (isRecordId(seg)) return
      crumbs.push({ label: titleise(seg), href })
    })
    if (crumbs.length === 1) crumbs.push({ label: 'Dashboard', href: pathname })
    return crumbs
  }, [pathname])
}

const InfoBar = ({ notifications, subAccountId, className, role }: Props) => {
  const [allNotifications, setAllNotifications] = useState(notifications)
  const [showAll, setShowAll] = useState(true)
  const crumbs = useBreadcrumbs()

  const handleClick = () => {
    if (!showAll) {
      setAllNotifications(notifications)
    } else {
      if (notifications?.length !== 0) {
        setAllNotifications(
          notifications?.filter((item) => item.subAccountId === subAccountId) ??
            []
        )
      }
    }
    setShowAll((prev) => !prev)
  }

  const unread = allNotifications?.length ?? 0

  return (
    <header
      className={twMerge(
        'fixed left-0 right-0 top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-md md:left-[272px] md:px-5',
        className
      )}
    >
      {/* Breadcrumbs. Left padding on small screens clears the menu trigger. */}
      <nav aria-label="Breadcrumb" className="min-w-0 pl-12 md:pl-0">
        <ol className="flex items-center gap-1.5">
          {crumbs.map((crumb, i) => {
            const last = i === crumbs.length - 1
            return (
              <li key={crumb.href} className="flex min-w-0 items-center gap-1.5">
                {i > 0 && (
                  <ChevronRight
                    className="size-3.5 shrink-0 text-muted-foreground/50"
                    aria-hidden
                  />
                )}
                <span
                  className={cn(
                    'truncate text-[13px]',
                    last
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground'
                  )}
                  aria-current={last ? 'page' : undefined}
                >
                  {crumb.label}
                </span>
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="ml-auto flex items-center gap-1.5">
        {/* Search affordance. Opens the browser's find for now — the command
            palette is not built yet, so this stays honest about what it does
            rather than shipping a button that does nothing. */}
        <button
          type="button"
          onClick={() => document.getElementById('app-search')?.focus()}
          className="hidden h-8 items-center gap-2 rounded-sm border border-border bg-card px-2.5 text-[12px] text-muted-foreground transition-colors duration-fast hover:border-muted-foreground/30 hover:text-foreground lg:flex"
        >
          <Search className="size-3.5" />
          Search
          <kbd className="ml-4 rounded-xs border border-border bg-muted px-1 font-mono text-[10px] leading-4">
            /
          </kbd>
        </button>

        <ModeToggle />

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="relative"
              aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}
            >
              <Bell />
              {unread > 0 && (
                <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-brand" />
              )}
            </Button>
          </SheetTrigger>

          <SheetContent className="no-scrollbar flex w-full flex-col gap-0 overflow-y-auto sm:max-w-md">
            <SheetHeader className="text-left">
              <SheetTitle>Notifications</SheetTitle>
            </SheetHeader>

            {(role === 'AGENCY_ADMIN' || role === 'AGENCY_OWNER') && (
              <label className="mt-5 flex items-center justify-between gap-4 rounded-md border border-border px-4 py-3">
                <span className="text-[13px]">Current sub account only</span>
                <Switch onCheckedChange={handleClick} />
              </label>
            )}

            <div className="mt-5 flex flex-col">
              {allNotifications?.map((notification) => (
                <div
                  key={notification.id}
                  className="flex gap-3 border-b border-border py-3.5 last:border-0"
                >
                  <Avatar className="size-7 shrink-0">
                    <AvatarImage src={notification.User.avatarUrl} alt="" />
                    <AvatarFallback className="bg-muted text-[10px] text-foreground">
                      {displayName(notification.User.name)
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <p className="text-[13px] leading-relaxed">
                      <span className="font-medium">
                        {cleanText(notification.notification.split('|')[0])}
                      </span>
                      <span className="text-muted-foreground">
                        {cleanText(notification.notification.split('|')[1])}
                      </span>
                      <span className="font-medium">
                        {cleanText(notification.notification.split('|')[2])}
                      </span>
                    </p>
                    <span className="text-[11px] text-muted-foreground">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}

              {unread === 0 && (
                <p className="py-12 text-center text-[13px] text-muted-foreground">
                  Nothing here yet. Activity across your agency shows up in this
                  panel.
                </p>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <div className="ml-1 flex items-center">
          <UserButton />
        </div>
      </div>
    </header>
  )
}

export default InfoBar
