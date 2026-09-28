'use client'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useModal } from '@/providers/modal-provider'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CustomModal from '@/components/global/custom-modal'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterValue: string
  actionButtonText?: React.ReactNode
  modalChildren?: React.ReactNode
  /** Copy for the create modal. Defaults suit the funnels page. */
  modalTitle?: string
  modalSubheading?: string
  searchPlaceholder?: string
  emptyMessage?: string
}
export default function DataTable<TData, TValue>({
  columns,
  data,
  filterValue,
  actionButtonText,
  modalChildren,
  modalTitle = 'Create a funnel',
  modalSubheading = 'Funnels are like websites, but better. Try creating one.',
  searchPlaceholder = 'Search…',
  emptyMessage = 'Nothing here yet.',
}: DataTableProps<TData, TValue>) {
  const { setOpen } = useModal()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={
              (table.getColumn(filterValue)?.getFilterValue() as string) ?? ''
            }
            onChange={(event) => {
              table.getColumn(filterValue)?.setFilterValue(event.target.value)
            }}
            className="pl-9"
          />
        </div>

        {actionButtonText && (
          <Button
            onClick={() => {
              if (modalChildren) {
                setOpen(
                  <CustomModal title={modalTitle} subheading={modalSubheading}>
                    {modalChildren}
                  </CustomModal>
                )
              }
            }}
          >
            {actionButtonText}
          </Button>
        )}
      </div>

      <div className="overflow-hidden rounded-card border border-border bg-background">
        {/* Table brings its own overflow-auto wrapper; the min-width stops
            the columns compressing so it scrolls instead of being clipped. */}
        <Table className="min-w-[680px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-11 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="border-border"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3.5 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-28 text-center text-sm text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
