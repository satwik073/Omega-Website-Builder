'use client'

import EntityLogo from '@/components/global/entity-logo'
import { EmptyState } from '@/components/global/states'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  deleteSubAccount,
  getSubaccountDetails,
  saveActivityLogsNotification,
} from '@/lib/queries'
import type { SubAccount } from '@prisma/client'
import { Building2, MoreHorizontal, Search, Settings, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { toast } from 'sonner'

/**
 * Sub-account grid with working search and row actions.
 *
 * The previous version wrapped the grid in a `Command` and rendered a
 * `CommandInput` above it, but the cards were plain divs rather than
 * `CommandItem`s — so the search box filtered nothing. It also rendered an
 * `AlertDialogContent` per card with no trigger, so the "…" affordance was
 * inert. Both are real controls now.
 */

type Props = {
  subaccounts: SubAccount[]
  /** Sub-account ids the current user can actually open. */
  accessibleIds: string[]
  createAction: React.ReactNode
}

const SubaccountsGrid = ({ subaccounts, accessibleIds, createAction }: Props) => {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [pendingDelete, setPendingDelete] = useState<SubAccount | null>(null)
  const [deleting, setDeleting] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return subaccounts
    return subaccounts.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.companyEmail.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q)
    )
  }, [subaccounts, query])

  const confirmDelete = async () => {
    if (!pendingDelete) return
    setDeleting(true)
    try {
      const details = await getSubaccountDetails(pendingDelete.id)
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Deleted a subaccount | ${details?.name}`,
        subaccountId: pendingDelete.id,
      })
      await deleteSubAccount(pendingDelete.id)
      toast.success('Sub account deleted')
      setPendingDelete(null)
      router.refresh()
    } catch {
      toast.error('Could not delete this sub account')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sub accounts…"
            aria-label="Search sub accounts"
            className="pl-9"
          />
        </div>

        <p className="shrink-0 text-sm text-muted-foreground tabular-nums">
          {filtered.length} of {subaccounts.length}
        </p>
      </div>

      {subaccounts.length === 0 ? (
        <EmptyState
          className="mt-6"
          icon={<Building2 />}
          title="No sub accounts yet"
          description="Sub accounts are the client workspaces your agency manages. Create one to start building sites for a client."
          action={createAction}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          className="mt-6"
          icon={<Search />}
          title={`No matches for “${query}”`}
          description="Try a different name, city or email address."
          action={
            <Button size="sm" variant="outline" onClick={() => setQuery('')}>
              Clear search
            </Button>
          }
        />
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((subaccount) => {
            const hasAccess = accessibleIds.includes(subaccount.id)
            return (
              <div
                key={subaccount.id}
                className="group flex flex-col overflow-hidden rounded-card border border-border bg-background transition-shadow duration-base ease-standard hover:shadow-md"
              >
                <Link
                  href={`/subaccount/${subaccount.id}`}
                  className="relative block aspect-[16/10] overflow-hidden border-b border-border bg-muted/40"
                >
                  <EntityLogo
                    src={subaccount.subAccountLogo}
                    name={subaccount.name}
                    fill
                    rounded="none"
                    className="size-full"
                    imageClassName="p-6 transition-transform duration-slow ease-standard group-hover:scale-[1.04]"
                  />
                </Link>

                <div className="flex items-start justify-between gap-2 p-4">
                  <div className="min-w-0">
                    <Link
                      href={`/subaccount/${subaccount.id}`}
                      className="block truncate text-sm font-medium transition-colors hover:text-muted-foreground"
                    >
                      {subaccount.name}
                    </Link>

                    <p className="mt-1 flex items-center gap-1.5 text-[13px] text-muted-foreground">
                      <span
                        className={cn(
                          'size-1.5 shrink-0 rounded-full',
                          hasAccess ? 'bg-emerald-600' : 'bg-muted-foreground/50'
                        )}
                        aria-hidden
                      />
                      {/* This reflects the viewer's permission, not a publish
                          state — the old copy said "Published / Pending". */}
                      {hasAccess ? 'Access granted' : 'No access'}
                    </p>

                    {subaccount.city && (
                      <p className="mt-1 truncate text-[13px] text-muted-foreground">
                        {subaccount.city}
                      </p>
                    )}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Actions for ${subaccount.name}`}
                      >
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem asChild>
                        <Link href={`/subaccount/${subaccount.id}`}>Open</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/subaccount/${subaccount.id}/settings`}>
                          <Settings className="mr-2 size-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onSelect={() => setPendingDelete(subaccount)}
                      >
                        <Trash2 className="mr-2 size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* One dialog for the whole grid, driven by which row was chosen. */}
      <AlertDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-left">
              Delete {pendingDelete?.name}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              This permanently deletes the sub account along with its funnels,
              media, contacts and pipelines. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                loading={deleting}
                onClick={(e) => {
                  // Keep the dialog open while the request is in flight.
                  e.preventDefault()
                  confirmDelete()
                }}
              >
                Delete sub account
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default SubaccountsGrid
