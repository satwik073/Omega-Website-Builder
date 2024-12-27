import { db } from '@/lib/db'
import React from 'react'
import DataTable from './data-table'
import { Plus } from 'lucide-react'
import { currentUser } from '@clerk/nextjs'
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
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
          Add
        </>
      }
      modalChildren={<SendInvitation agencyId={agencyDetails.id} />}
      filterValue="name"
      columns={columns}
      data={teamMembers}
    ></DataTable>
  )
}

export default TeamPage
