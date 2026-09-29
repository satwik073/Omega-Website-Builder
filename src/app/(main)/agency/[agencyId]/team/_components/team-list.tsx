'use client'

import {
  AdminTable,
  CodeCell,
  MetricCell,
  StackedCell,
  StatusCell,
  type Column,
} from '@/components/admin/data-table'
import { BulkBar, FilterBar, PageToolbar } from '@/components/admin/toolbar'
import EntityLogo from '@/components/global/entity-logo'
import { EmptyState } from '@/components/global/states'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { displayName } from '@/lib/utils'
import { Ban, Plus, ShieldCheck, Trash2, Users } from 'lucide-react'
import React, { useMemo, useState } from 'react'

type Member = {
  id: string
  name: string
  email: string
  avatarUrl: string
  role: string
  createdAt: Date | string
  Permissions?: { access: boolean }[]
}

const ROLE_LABEL: Record<string, string> = {
  AGENCY_OWNER: 'Agency owner',
  AGENCY_ADMIN: 'Agency admin',
  SUBACCOUNT_USER: 'Sub account user',
  SUBACCOUNT_GUEST: 'Sub account guest',
}

const CHIPS = [
  { id: 'all', label: 'All' },
  { id: 'agency', label: 'Agency' },
  { id: 'subaccount', label: 'Sub account' },
]

/**
 * Team list on the shared admin table: chip filters, search, selection and
 * bulk actions, matching every other list screen in the product.
 */
const TeamList = ({
  members,
  onInvite,
}: {
  members: Member[]
  onInvite: React.ReactNode
}) => {
  const [query, setQuery] = useState('')
  const [chip, setChip] = useState('all')
  const [selected, setSelected] = useState<string[]>([])

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return members.filter((m) => {
      const isAgency = m.role.startsWith('AGENCY')
      if (chip === 'agency' && !isAgency) return false
      if (chip === 'subaccount' && isAgency) return false
      if (!q) return true
      return (
        displayName(m.name, m.email).toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q)
      )
    })
  }, [members, query, chip])

  const columns: Column<Member>[] = [
    {
      id: 'name',
      header: 'Name',
      width: 'minmax(220px, 1.4fr)',
      cell: (m) => (
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative size-8 shrink-0 overflow-hidden rounded-full">
            <EntityLogo
              src={m.avatarUrl}
              name={displayName(m.name, m.email)}
              fill
              rounded="full"
              className="size-full"
              imageClassName="object-cover"
            />
          </div>
          <StackedCell
            title={displayName(m.name, m.email)}
            detail={m.email}
          />
        </div>
      ),
    },
    {
      id: 'role',
      header: 'Role',
      width: 'minmax(150px, 1fr)',
      cell: (m) => <CodeCell value={m.role} tag={ROLE_LABEL[m.role] ?? 'Member'} />,
    },
    {
      id: 'access',
      header: 'Sub accounts',
      width: '140px',
      cell: (m) => {
        const granted = m.Permissions?.filter((p) => p.access).length ?? 0
        return (
          <span className="text-[12.5px] tabular-nums text-muted-foreground">
            {granted === 0 ? '—' : `${granted} with access`}
          </span>
        )
      },
    },
    {
      id: 'status',
      header: 'Status',
      width: '120px',
      cell: (m) => (
        <StatusCell tone={m.role.startsWith('AGENCY') ? 'success' : 'neutral'}>
          {m.role.startsWith('AGENCY') ? 'Full access' : 'Scoped'}
        </StatusCell>
      ),
    },
    {
      id: 'joined',
      header: 'Joined',
      width: '150px',
      align: 'right',
      cell: (m) => (
        <MetricCell primary={new Date(m.createdAt).toLocaleDateString()} />
      ),
    },
  ]

  return (
    <>
      <PageToolbar
        title="Team"
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Search team"
        action={onInvite}
      />

      <div className="py-5">
        {selected.length > 0 ? (
          <BulkBar count={selected.length} onClear={() => setSelected([])}>
            <Button size="sm" variant="outline">
              <ShieldCheck />
              Change role
            </Button>
            <Button size="sm" variant="outline">
              <Ban />
              Revoke access
            </Button>
            <Button size="sm" variant="destructive-ghost">
              <Trash2 />
              Remove
            </Button>
          </BulkBar>
        ) : (
          <FilterBar chips={CHIPS} activeChip={chip} onChipChange={setChip} />
        )}
      </div>

      <AdminTable
        rows={rows}
        columns={columns}
        rowId={(m) => m.id}
        selected={selected}
        onSelectedChange={setSelected}
        rowMenu={() => (
          <>
            <DropdownMenuItem>View profile</DropdownMenuItem>
            <DropdownMenuItem>Change role</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              Remove from team
            </DropdownMenuItem>
          </>
        )}
        empty={
          <EmptyState
            icon={query || chip !== 'all' ? <Users /> : <Plus />}
            title={
              query || chip !== 'all'
                ? 'No matching people'
                : 'No team members yet'
            }
            description={
              query || chip !== 'all'
                ? 'Try a different name, email, or filter.'
                : 'Invite people to give them access to your agency and its sub accounts.'
            }
            action={query || chip !== 'all' ? undefined : onInvite}
          />
        }
      />
    </>
  )
}

export default TeamList
