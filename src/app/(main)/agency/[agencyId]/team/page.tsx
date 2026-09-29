import { db } from '@/lib/db'
import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import InviteButton from './_components/invite-button'
import TeamList from './_components/team-list'

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
    <TeamList
      members={teamMembers as never}
      onInvite={<InviteButton agencyId={agencyDetails.id} />}
    />
  )
}

export default TeamPage
