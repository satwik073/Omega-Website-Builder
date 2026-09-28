import { db } from '@/lib/db'
import EditorProvider from '@/providers/editor/editor-provider'
import { redirect } from 'next/navigation'
import React from 'react'
import FunnelEditorNavigation from './_components/funnel-editor-navigation'
import FunnelEditorSidebar from './_components/funnel-editor-sidebar'
import FunnelEditor from './_components/funnel-editor'
import FunnelEditorLayers from './_components/funnel-editor-layers'

type Props = {
  params: Promise<{
    subaccountId: string
    funnelId: string
    funnelPageId: string
  }>
}

const Page = async ({ params }: Props) => {
  const resolvedParams = await params

  const funnelPageDetails = await db.funnelPage.findFirst({
    where: {
      id: resolvedParams.funnelPageId,
    },
  })

  // The left rail lists every page in this funnel, so the user can move
  // between them without leaving the editor.
  const funnelPages = await db.funnelPage.findMany({
    where: { funnelId: resolvedParams.funnelId },
    orderBy: { order: 'asc' },
    select: { id: true, name: true, pathName: true, order: true },
  })

  if (!funnelPageDetails) {
    return redirect(
      `/subaccount/${resolvedParams.subaccountId}/funnels/${resolvedParams.funnelId}`
    )
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden">
      <EditorProvider
        subaccountId={resolvedParams.subaccountId}
        funnelId={resolvedParams.funnelId}
        pageDetails={funnelPageDetails}
      >
        <FunnelEditorNavigation
          funnelId={resolvedParams.funnelId}
          funnelPageDetails={funnelPageDetails}
          subaccountId={resolvedParams.subaccountId}
        />
        <FunnelEditorLayers
          pages={funnelPages}
          funnelId={resolvedParams.funnelId}
          subaccountId={resolvedParams.subaccountId}
          activePageId={resolvedParams.funnelPageId}
        />
        <div className="flex h-[calc(100%-3.5rem)]">
          <FunnelEditor funnelPageId={resolvedParams.funnelPageId} />
        </div>
        <FunnelEditorSidebar subaccountId={resolvedParams.subaccountId} />
      </EditorProvider>
    </div>
  )
}

export default Page
