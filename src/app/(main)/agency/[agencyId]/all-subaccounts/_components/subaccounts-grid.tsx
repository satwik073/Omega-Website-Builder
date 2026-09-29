'use client'

import {
  AdminTable,
  MetricCell,
  StackedCell,
  StatusCell,
  type Column,
} from '@/components/admin/data-table'
import { BulkBar, FilterBar, PageToolbar } from '@/components/admin/toolbar'
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
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import {
  deleteSubAccount,
  getSubaccountDetails,
  saveActivityLogsNotification,
} from '@/lib/queries'
import type { SubAccount } from '@prisma/client'
import { Building2, Settings, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  subaccounts: SubAccount[]
  accessibleIds: string[]
  createAction: React.ReactNode
}

const CHIPS = [
  { id: 'all', label: 'All' },
  { id: 'access', label: 'With access' },
  { id: 'noaccess', label: 'No access' },
]

/**
 * Sub-account list on the shared admin table.
 *
 * Previously a card grid; moved onto the same table every other list screen
 * uses so selection, bulk actions and empty states behave identically and an
 * agency with fifty clients can scan them in one view.
 */
const SubaccountsGrid = ({ subaccounts, accessibleIds, createAction }: Props) => {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [chip, setChip] = useState('all')
  const [selected, setSelected] = useState<string[]>([])
  const [pendingDelete, setPendingDelete] = useState<SubAccount | null>(null)
  const [deleting, setDeleting] = useState(false)

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return subaccounts.filter((s) => {
      const hasAccess = accessibleIds.includes(s.id)
      if (chip === 'access' && !hasAccess) return false
      if (chip === 'noaccess' && hasAccess) return false
      if (!q) return true
      return [s.name, s.companyEmail, s.city, s.address]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q))
    })
  }, [subaccounts, accessibleIds, query, chip])

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
      setSelected((s) => s.filter((id) => id !== pendingDelete.id))
      router.refresh()
    } catch {
      toast.error('Could not delete this sub account')
    } finally {
      setDeleting(false)
    }
  }

  const columns: Column<SubAccount>[] = [
    {
      id: 'name',
      header: 'Sub account',
      width: 'minmax(240px, 1.6fr)',
      cell: (s) => (
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative size-8 shrink-0 overflow-hidden rounded-sm border border-border bg-muted">
            <EntityLogo
              src={s.subAccountLogo}
              name={s.name}
              fill
              rounded="none"
              className="size-full"
              imageClassName="p-0.5"
            />
          </div>
          <StackedCell title={s.name} detail={s.companyEmail} />
        </div>
      ),
    },
    {
      id: 'location',
      header: 'Location',
      width: 'minmax(150px, 1fr)',
      cell: (s) => (
        <span className="truncate text-[12.5px] text-muted-foreground">
          {[s.city, s.country].filter(Boolean).join(', ') || '—'}
        </span>
      ),
    },
    {
      id: 'access',
      header: 'Access',
      width: '150px',
      cell: (s) => (
        <StatusCell tone={accessibleIds.includes(s.id) ? 'success' : 'neutral'}>
          {accessibleIds.includes(s.id) ? 'Granted' : 'No access'}
        </StatusCell>
      ),
    },
    {
      id: 'created',
      header: 'Created',
      width: '140px',
      align: 'right',
      cell: (s) => (
        <MetricCell primary={new Date(s.createdAt).toLocaleDateString()} />
      ),
    },
  ]

  return (
    <>
      <PageToolbar
        title="Sub accounts"
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Search sub accounts"
        action={createAction}
      />

      <div className="py-5">
        {selected.length > 0 ? (
          <BulkBar count={selected.length} onClear={() => setSelected([])}>
            <Button size="sm" variant="outline">
              <Settings />
              Manage access
            </Button>
            <Button
              size="sm"
              variant="destructive-ghost"
              // Bulk delete is destructive and irreversible, so it routes
              // through the same single confirm rather than firing directly.
              onClick={() => {
                const first = subaccounts.find((s) => s.id === selected[0])
                if (first) setPendingDelete(first)
              }}
            >
              <Trash2 />
              Delete
            </Button>
          </BulkBar>
        ) : (
          <FilterBar chips={CHIPS} activeChip={chip} onChipChange={setChip} />
        )}
      </div>

      <AdminTable
        rows={rows}
        columns={columns}
        rowId={(s) => s.id}
        selected={selected}
        onSelectedChange={setSelected}
        onRowClick={(s) => router.push(`/subaccount/${s.id}`)}
        rowMenu={(s) => (
          <>
            <DropdownMenuItem asChild>
              <Link href={`/subaccount/${s.id}`}>Open</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/subaccount/${s.id}/settings`}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onSelect={() => setPendingDelete(s)}
            >
              Delete
            </DropdownMenuItem>
          </>
        )}
        empty={
          <EmptyState
            icon={<Building2 />}
            title={
              query || chip !== 'all'
                ? 'No matching sub accounts'
                : 'No sub accounts yet'
            }
            description={
              query || chip !== 'all'
                ? 'Try a different name, city or email.'
                : 'Sub accounts are the client workspaces your agency builds and publishes sites in.'
            }
            action={query || chip !== 'all' ? undefined : createAction}
          />
        }
      />

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
