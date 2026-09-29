'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ChevronDown, Search } from 'lucide-react'
import React from 'react'

/**
 * Admin page chrome: a title row, then a row of filters.
 *
 * Both are generic so every list screen in the product reads the same way —
 * title left, search and primary action right, filters directly underneath.
 */

export const PageToolbar = ({
  title,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search…',
  action,
  className,
}: {
  title: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  action?: React.ReactNode
  className?: string
}) => (
  <div
    className={cn(
      'flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between',
      className
    )}
  >
    <h1 className="font-display text-[30px] font-light leading-none tracking-[-0.035em]">
      {title}
    </h1>

    <div className="flex items-center gap-3">
      {onSearchChange && (
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchValue ?? ''}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="h-10 pl-9"
          />
        </div>
      )}
      {action}
    </div>
  </div>
)

export type FilterChip = { id: string; label: string }

/**
 * Segmented chip filters plus optional multi-select dropdowns.
 *
 * Chips are single-select (one view at a time); dropdowns are multi-select
 * refinements on top of the chosen view — the same split the reference uses.
 */
export const FilterBar = ({
  chips,
  activeChip,
  onChipChange,
  selects = [],
  className,
}: {
  chips: FilterChip[]
  activeChip: string
  onChipChange: (id: string) => void
  selects?: {
    id: string
    label: string
    options: FilterChip[]
    selected: string[]
    onChange: (selected: string[]) => void
  }[]
  className?: string
}) => (
  <div className={cn('flex flex-wrap items-center gap-2', className)}>
    {chips.map((chip) => {
      const active = chip.id === activeChip
      return (
        <button
          key={chip.id}
          type="button"
          onClick={() => onChipChange(chip.id)}
          aria-pressed={active}
          className={cn(
            'h-9 rounded-sm border px-4 text-[13px] font-medium transition-colors duration-fast',
            active
              ? 'border-transparent bg-primary text-primary-foreground'
              : 'border-border text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground'
          )}
        >
          {chip.label}
        </button>
      )
    })}

    {selects.map((select) => {
      const count = select.selected.length
      return (
        <DropdownMenu key={select.id}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex h-9 items-center gap-2 rounded-sm border border-border px-4 text-[13px] font-medium text-muted-foreground transition-colors duration-fast hover:border-muted-foreground/30 hover:text-foreground"
            >
              {select.label}
              {count > 0 && (
                <span className="rounded-xs bg-accent px-1.5 text-[11px] tabular-nums text-foreground">
                  {count}
                </span>
              )}
              <ChevronDown className="size-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52">
            {select.options.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.id}
                checked={select.selected.includes(option.id)}
                onCheckedChange={(checked) =>
                  select.onChange(
                    checked
                      ? [...select.selected, option.id]
                      : select.selected.filter((id) => id !== option.id)
                  )
                }
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    })}
  </div>
)

/**
 * Bulk action bar. Replaces the filter row while a selection exists, rather
 * than stacking below it — otherwise the toolbar grows and the table jumps
 * down the page every time someone ticks a box.
 */
export const BulkBar = ({
  count,
  onClear,
  children,
}: {
  count: number
  onClear: () => void
  children: React.ReactNode
}) => (
  <div className="flex flex-wrap items-center gap-3">
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={onClear}
      aria-label="Clear selection"
    >
      <span aria-hidden className="text-base leading-none">
        ×
      </span>
    </Button>

    <span className="text-[13px] font-medium tabular-nums">
      {count} selected
    </span>

    <span className="h-5 w-px bg-border" />

    <div className="flex flex-wrap items-center gap-2">{children}</div>
  </div>
)
