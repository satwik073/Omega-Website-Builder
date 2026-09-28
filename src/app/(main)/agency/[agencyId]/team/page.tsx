import { db } from '@/lib/db'
import PageHeader from '@/components/global/page-header'
import React from 'react'
import DataTable from './data-table'
import { Plus } from 'lucide-react'
import { currentUser } from '@clerk/nextjs/server'
import { columns } from './columns'
import SendInvitation from '@/components/forms/send-invitation'

type Props = {
  params: Promise<{ agencyId: string }>
}

const TeamPage = async ({ params }: Props) => {
  const resolvedParams = await params

  const authUser = await currentUser()
  if (!authUser) return null

  const [teamMembers, agencyDetails] = await Promise.all([
    db.user.findMany({
      where: {
        Agency: {
          id: resolvedParams.agencyId,
        },
      },
      include: {
        Agency: { include: { SubAccount: true } },
        Permissions: { include: { SubAccount: true } },
      },
    }),
    db.agency.findUnique({
      where: {
        id: resolvedParams.agencyId,
      },
      include: {
        SubAccount: true,
      },
    }),
  ])

  if (!agencyDetails) return null

  return (
    <>
      <PageHeader
        title="Team"
        description="People with access to your agency and its sub accounts."
      />
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
          Add
        </>
      }
      modalChildren={<SendInvitation agencyId={agencyDetails.id} />}
      searchPlaceholder="Search team…"
      emptyMessage="No team members yet."
      filterValue="name"
      columns={columns}
      data={teamMembers}
    ></DataTable>
    </>
  )
}

export default TeamPage
