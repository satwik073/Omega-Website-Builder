import BlurPage from '@/components/global/blur-page'
import InfoBar from '@/components/global/infobar'
import Sidebar from '@/components/sidebar'
import Unauthorized from '@/components/unauthorized'
import {
  getNotificationAndUser,
  verifyAndAcceptInvitation,
} from '@/lib/queries'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  children: React.ReactNode
  params: Promise<{ agencyId: string }>
}

const layout = async ({ children, params }: Props) => {
  const resolvedParams = await params
  const agencyId = await verifyAndAcceptInvitation()
  const user = await currentUser()

  if (!user) {
    return redirect('/')
  }

  if (!agencyId) {
    return redirect('/agency')
  }

  if (
    user.privateMetadata.role !== 'AGENCY_OWNER' &&
    user.privateMetadata.role !== 'AGENCY_ADMIN'
  )
    return <Unauthorized />

  let allNoti: any = []
  const notifications = await getNotificationAndUser(agencyId)
  if (notifications) allNoti = notifications

  return (
    <div className="min-h-screen bg-background">
      <Sidebar id={resolvedParams.agencyId} type="agency" />
      <div className="md:pl-[272px]">
        <InfoBar notifications={allNoti} role={allNoti.User?.role} />
        <BlurPage>{children}</BlurPage>
      </div>
    </div>
  )
}

export default layout
