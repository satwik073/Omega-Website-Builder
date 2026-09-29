'use client'

import { EmptyState } from '@/components/global/states'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { MoreVertical } from 'lucide-react'
import React, { useMemo } from 'react'

/**
 * Admin list table.
 *
 * One table for every list screen, so selection, bulk actions, empty states
 * and row menus behave identically throughout the product. Columns are
 * described as data rather than JSX so a screen declares *what* it shows and
 * inherits *how* it looks.
 */

export type Column<T> = {
  id: string
  header: string
  /** Fixed width, e.g. '160px' or '1fr'. Defaults to '1fr'. */
  width?: string
  align?: 'left' | 'right'
  cell: (row: T) => React.ReactNode
}

export type AdminTableProps<T> = {
  rows: T[]
  columns: Column<T>[]
  rowId: (row: T) => string
  /** Omit to disable selection entirely. */
  selected?: string[]
  onSelectedChange?: (selected: string[]) => void
  rowMenu?: (row: T) => React.ReactNode
  onRowClick?: (row: T) => void
  empty?: React.ReactNode
  className?: string
}

export function AdminTable<T>({
  rows,
  columns,
  rowId,
  selected,
  onSelectedChange,
  rowMenu,
  onRowClick,
  empty,
  className,
}: AdminTableProps<T>) {
  const selectable = !!selected && !!onSelectedChange
  const ids = useMemo(() => rows.map(rowId), [rows, rowId])

  const allSelected = selectable && ids.length > 0 && ids.every((id) => selected!.includes(id))
  const someSelected = selectable && ids.some((id) => selected!.includes(id))

  // The grid template is shared by the header and every row, so columns line
  // up without the header and body being separate scroll contexts.
  const template = [
    selectable ? '44px' : null,
    ...columns.map((c) => c.width ?? '1fr'),
    rowMenu ? '52px' : null,
  ]
    .filter(Boolean)
    .join(' ')

  if (rows.length === 0) {
    return (
      <>
        {empty ?? (
          <EmptyState
            title="Nothing here yet"
            description="Items will appear in this list once they exist."
          />
        )}
      </>
    )
  }

  const toggleAll = () =>
    onSelectedChange!(
      allSelected
        ? selected!.filter((id) => !ids.includes(id))
        : Array.from(new Set([...selected!, ...ids]))
    )

  const toggleRow = (id: string) =>
    onSelectedChange!(
      selected!.includes(id)
        ? selected!.filter((s) => s !== id)
        : [...selected!, id]
    )

  return (
    <div
      className={cn(
        'overflow-hidden rounded-card border border-border bg-card',
        className
      )}
    >
      <div className="overflow-x-auto">
        <div className="min-w-[840px]">
          {/* Header */}
          <div
            role="row"
            className="grid items-center gap-4 border-b border-border bg-muted/40 px-4 py-2.5"
            style={{ gridTemplateColumns: template }}
          >
            {selectable && (
              <Checkbox
                checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                onCheckedChange={toggleAll}
                aria-label="Select all rows"
              />
            )}
            {columns.map((col) => (
              <span
                key={col.id}
                className={cn(
                  'font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground',
                  col.align === 'right' && 'text-right'
                )}
              >
                {col.header}
              </span>
            ))}
            {rowMenu && <span className="sr-only">Actions</span>}
          </div>

          {/* Rows */}
          <div className="divide-y divide-border">
            {rows.map((row) => {
              const id = rowId(row)
              const isSelected = selectable && selected!.includes(id)

              return (
                <div
                  key={id}
                  role="row"
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={cn(
                    'grid items-center gap-4 px-4 py-3.5 transition-colors duration-fast',
                    isSelected ? 'bg-accent/50' : 'hover:bg-muted/50',
                    onRowClick && 'cursor-pointer'
                  )}
                  style={{ gridTemplateColumns: template }}
                >
                  {selectable && (
                    // Stop the row's click handler firing when the intent was
                    // only to tick the box.
                    <span onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleRow(id)}
                        aria-label="Select row"
                      />
                    </span>
                  )}

                  {columns.map((col) => (
                    <div
                      key={col.id}
                      className={cn('min-w-0', col.align === 'right' && 'text-right')}
                    >
                      {col.cell(row)}
                    </div>
                  ))}

                  {rowMenu && (
                    <span
                      className="justify-self-end"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className="flex size-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          aria-label="Row actions"
                        >
                          <MoreVertical className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          {rowMenu(row)}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Cell primitives                                                     */
/* ------------------------------------------------------------------ */

/** Two-line cell: a title with secondary detail beneath. */
export const StackedCell = ({
  title,
  detail,
}: {
  title: React.ReactNode
  detail?: React.ReactNode
}) => (
  <div className="min-w-0">
    <p className="truncate text-[13px] font-medium">{title}</p>
    {detail && (
      <p className="truncate text-[12px] text-muted-foreground">{detail}</p>
    )}
  </div>
)

/** Monospace identifier with an optional origin tag, e.g. `page_view System`. */
export const CodeCell = ({
  value,
  tag,
}: {
  value: string
  tag?: string
}) => (
  <div className="flex min-w-0 items-center gap-2">
    <span className="truncate font-mono text-[12.5px]">{value}</span>
    {tag && (
      <span className="shrink-0 rounded-xs border border-border px-1.5 py-px text-[10px] text-muted-foreground">
        {tag}
      </span>
    )}
  </div>
)

/** Status dot + label. Colour comes from semantic tokens, not raw hex. */
export const StatusCell = ({
  tone = 'neutral',
  children,
}: {
  tone?: 'success' | 'warning' | 'danger' | 'neutral'
  children: React.ReactNode
}) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 rounded-pill px-2 py-1 text-[12px] font-medium',
      tone === 'success' && 'bg-success/12 text-success',
      tone === 'warning' && 'bg-warning/12 text-warning',
      tone === 'danger' && 'bg-destructive/12 text-destructive',
      tone === 'neutral' && 'bg-muted text-muted-foreground'
    )}
  >
    <span
      aria-hidden
      className={cn(
        'size-1.5 rounded-full',
        tone === 'success' && 'bg-success',
        tone === 'warning' && 'bg-warning',
        tone === 'danger' && 'bg-destructive',
        tone === 'neutral' && 'bg-muted-foreground'
      )}
    />
    {children}
  </span>
)

/** Right-aligned metric pair, e.g. `50d ago · 334 today`. */
export const MetricCell = ({
  primary,
  secondary,
}: {
  primary: React.ReactNode
  secondary?: React.ReactNode
}) => (
  <p className="whitespace-nowrap text-[12.5px] tabular-nums text-muted-foreground">
    {primary}
    {secondary != null && (
      <>
        <span className="px-1.5 opacity-50">·</span>
        <span className="font-medium text-foreground">{secondary}</span>
      </>
    )}
  </p>
)

export default AdminTable
