import PageHeader from '@/components/global/page-header'
import { EmptyState } from '@/components/global/states'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { db } from '@/lib/db'
import { format } from 'date-fns'
import { Workflow } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: Promise<{ subaccountId: string }>
}

/**
 * Automations.
 *
 * Every sub account is seeded with an "Automations" sidebar entry (see
 * `createSubAccount` in lib/queries), but the route did not exist — the link
 * returned a raw Next.js 404 from the primary navigation. This lists the
 * `Automation` rows that already exist for the sub account, and explains the
 * state of the feature rather than dead-ending.
 */
const AutomationsPage = async ({ params }: Props) => {
  const resolvedParams = await params

  const automations = await db.automation.findMany({
    where: { subAccountId: resolvedParams.subaccountId },
    orderBy: { updatedAt: 'desc' },
    include: { Trigger: true, Action: true },
  })

  return (
    <>
      <PageHeader
        title="Automations"
        description="Rules that react to activity in this sub account — a form submission, a new contact, a ticket moving lane."
      />

      {automations.length === 0 ? (
        <EmptyState
          icon={<Workflow />}
          title="No automations yet"
          description="Authoring new automations isn't available in the app yet. Existing automations for this sub account will appear here."
          action={
            <Button size="sm" variant="outline" asChild>
              <Link href={`/subaccount/${resolvedParams.subaccountId}/pipelines`}>
                Go to pipelines
              </Link>
            </Button>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-card border border-border bg-background">
          <Table className="min-w-[680px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Trigger</TableHead>
                <TableHead>Actions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Last updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {automations.map((automation) => (
                <TableRow key={automation.id} className="border-border">
                  <TableCell className="py-3.5 text-sm font-medium">
                    {automation.name}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-muted-foreground">
                    {automation.Trigger?.name ?? 'No trigger'}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm tabular-nums text-muted-foreground">
                    {automation.Action.length}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <Badge
                      variant={automation.published ? 'success' : 'secondary'}
                    >
                      {automation.published ? 'Live' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3.5 text-right text-sm text-muted-foreground">
                    {format(automation.updatedAt, 'd MMM yyyy')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  )
}

export default AutomationsPage
