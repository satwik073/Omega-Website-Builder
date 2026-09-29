'use client'

import { AdminTable, MetricCell, StatusCell, type Column } from '@/components/admin/data-table'
import { PageToolbar } from '@/components/admin/toolbar'
import { EmptyState } from '@/components/global/states'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Receipt } from 'lucide-react'
import React, { useMemo, useState } from 'react'

export type Charge = {
  id: string
  description: string | null
  date: string
  status: string
  amount: string
}

type Plan = {
  title: string
  description: string
  price: string
  duration: string
  features: string[]
  active: boolean
}

/**
 * Billing. Plan summary above, invoice history on the shared admin table
 * below, so payment history reads like every other list in the product.
 */
const BillingView = ({
  plan,
  charges,
  onChangePlan,
}: {
  plan: Plan
  charges: Charge[]
  onChangePlan: React.ReactNode
}) => {
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return charges
    return charges.filter((c) =>
      [c.description, c.id, c.amount].filter(Boolean).some((v) =>
        String(v).toLowerCase().includes(q)
      )
    )
  }, [charges, query])

  const columns: Column<Charge>[] = [
    {
      id: 'description',
      header: 'Description',
      width: 'minmax(220px, 1.6fr)',
      cell: (c) => (
        <span className="truncate text-[13px] font-medium">
          {c.description || 'Payment'}
        </span>
      ),
    },
    {
      id: 'invoice',
      header: 'Invoice',
      width: 'minmax(160px, 1fr)',
      cell: (c) => (
        <span className="truncate font-mono text-[12px] text-muted-foreground">
          {c.id}
        </span>
      ),
    },
    {
      id: 'date',
      header: 'Date',
      width: 'minmax(150px, 1fr)',
      cell: (c) => (
        <span className="text-[12.5px] text-muted-foreground">{c.date}</span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      width: '110px',
      cell: (c) => (
        <StatusCell tone={c.status.toLowerCase() === 'paid' ? 'success' : 'warning'}>
          {c.status}
        </StatusCell>
      ),
    },
    {
      id: 'amount',
      header: 'Amount',
      width: '120px',
      align: 'right',
      cell: (c) => <MetricCell primary={c.amount} />,
    },
  ]

  return (
    <>
      <PageToolbar title="Billing" action={onChangePlan} />

      <section className="py-6">
        <h2 className="section-label mb-4">Current plan</h2>

        <Card className="flex flex-col gap-6 p-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h3 className="text-[15px] font-medium">{plan.title}</h3>
              <StatusCell tone={plan.active ? 'success' : 'neutral'}>
                {plan.active ? 'Active' : 'Free'}
              </StatusCell>
            </div>
            <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted-foreground">
              {plan.description}
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-[12.5px] text-muted-foreground"
                >
                  <span aria-hidden className="size-1 rounded-full bg-brand" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex shrink-0 items-baseline gap-1.5">
            <span className="font-display text-[40px] font-light leading-none tracking-[-0.04em] tabular-nums">
              {plan.price}
            </span>
            <span className="text-[13px] text-muted-foreground">
              {plan.duration}
            </span>
          </div>
        </Card>
      </section>

      <section className="pb-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="section-label">Payment history</h2>
          {charges.length > 0 && (
            <div className="w-full max-w-xs">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search invoices"
                aria-label="Search invoices"
                className="h-9 w-full rounded-sm border border-border bg-background px-3 text-[13px] outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground"
              />
            </div>
          )}
        </div>

        <AdminTable
          rows={rows}
          columns={columns}
          rowId={(c) => c.id}
          empty={
            <EmptyState
              icon={<Receipt />}
              title={query ? 'No matching invoices' : 'No payments yet'}
              description={
                query
                  ? 'Try a different description, invoice id or amount.'
                  : 'Invoices appear here once your agency has been billed.'
              }
            />
          }
        />
      </section>
    </>
  )
}

export default BillingView
