import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import PageHeader from '@/components/global/page-header'
import { EmptyState } from '@/components/global/states'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { db } from '@/lib/db'
import { Contact, SubAccount, Ticket } from '@prisma/client'
import { format } from 'date-fns/format'
import { Users } from 'lucide-react'
import React from 'react'
import CreateContactButton from './_components/create-contact-btn'

type Props = {
  params: Promise<{ subaccountId: string }>
}

const ContactPage = async ({ params }: Props) => {
  type SubAccountWithContacts = SubAccount & {
    Contact: (Contact & { Ticket: Ticket[] })[]
  }

  const resolvedParams = await params

  const contacts = (await db.subAccount.findUnique({
    where: {
      id: resolvedParams.subaccountId,
    },
    include: {
      Contact: {
        include: {
          Ticket: {
            select: {
              value: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })) as SubAccountWithContacts

  if (!contacts) return null

  const allContacts = contacts.Contact

  const formatTotal = (tickets: Ticket[]) => {
    if (!tickets || !tickets.length) return '$0.00'
    const amt = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
    })

    const laneAmt = tickets.reduce(
      (sum, ticket) => sum + (Number(ticket?.value) || 0),
      0
    )

    return amt.format(laneAmt)
  }

  return (
    <>
      <PageHeader
        title="Contacts"
        description="Everyone who has come through a funnel on this sub account."
        actions={
          <CreateContactButton subaccountId={resolvedParams.subaccountId} />
        }
      />
      {allContacts.length === 0 ? (
        <EmptyState
          icon={<Users />}
          title="No contacts yet"
          description="Contacts are created when someone submits a form in one of this sub account's funnels. You can also add one by hand."
          action={
            <CreateContactButton subaccountId={resolvedParams.subaccountId} />
          }
        />
      ) : (
      <div className="overflow-hidden rounded-card border border-border bg-background">
      <Table className="min-w-[680px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[300px]">Email</TableHead>
            <TableHead className="w-[200px]">Active</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Total Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-medium truncate">
          {allContacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage alt={contact.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {contact.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>
                {formatTotal(contact.Ticket) === '$0.00' ? (
                  <Badge variant={'destructive'}>Inactive</Badge>
                ) : (
                  <Badge className="bg-emerald-700">Active</Badge>
                )}
              </TableCell>
              <TableCell>{format(contact.createdAt, 'MM/dd/yyyy')}</TableCell>
              <TableCell className="text-right">
                {formatTotal(contact.Ticket)}
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

export default ContactPage
