'use client'

import PageRenderer from '@/components/builder/renderer'
import type { Data } from '@puckeditor/core'
import React from 'react'

import FunnelEditor from '@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor'
import EditorProvider from '@/providers/editor/editor-provider'

/**
 * Renders a published funnel page in whichever format it was saved in.
 *
 * Pages built since the switch to Puck render through the Puck config. Pages
 * saved by the retired editor still hold its element tree, and the only thing
 * that can draw those is the retired renderer — so it stays mounted in live
 * mode for exactly this case. Without it every page published before the
 * migration would 404.
 */
const PublishedPage = ({
  data,
  legacy,
  pageDetails,
  subaccountId,
  funnelId,
}: {
  data: Data
  legacy: boolean
  pageDetails: any
  subaccountId: string
  funnelId: string
}) => {
  if (legacy) {
    return (
      <EditorProvider
        subaccountId={subaccountId}
        pageDetails={pageDetails}
        funnelId={funnelId}
      >
        <FunnelEditor funnelPageId={pageDetails.id} liveMode />
      </EditorProvider>
    )
  }

  return <PageRenderer data={data} />
}

export default PublishedPage
