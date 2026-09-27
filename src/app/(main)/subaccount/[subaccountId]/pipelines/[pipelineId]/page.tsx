import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PageHeader from '@/components/global/page-header'
import { db } from '@/lib/db'
import {
  getLanesWithTicketAndTags,
  getPipelineDetails,
  updateLanesOrder,
  updateTicketsOrder,
} from '@/lib/queries'
import { LaneDetail } from '@/lib/types'
import { redirect } from 'next/navigation'
import React from 'react'
import PipelineInfoBar from '../_components/pipeline-infobar'
import PipelineSettings from '../_components/pipeline-settings'
import PipelineView from '../_components/pipeline-view'

type Props = {
  params: Promise<{ subaccountId: string; pipelineId: string }>
}

const PipelinePage = async ({ params }: Props) => {
  const resolvedParams = await params

  const pipelineDetails = await getPipelineDetails(resolvedParams.pipelineId)
  if (!pipelineDetails)
    return redirect(`/subaccount/${resolvedParams.subaccountId}/pipelines`)

  const pipelines = await db.pipeline.findMany({
    where: { subAccountId: resolvedParams.subaccountId },
  })

  const lanes = (await getLanesWithTicketAndTags(
    resolvedParams.pipelineId
  )) as LaneDetail[]

  return (
    <>
      <PageHeader
        title={pipelineDetails?.name ?? 'Pipeline'}
        description="Drag tickets between lanes to move work forward."
        className="mb-6"
      />
    <Tabs defaultValue="view" className="w-full">
      <TabsList className="mb-6 h-auto w-full justify-between gap-4 rounded-none border-b border-border bg-transparent p-0 pb-3">
        <PipelineInfoBar
          pipelineId={resolvedParams.pipelineId}
          subAccountId={resolvedParams.subaccountId}
          pipelines={pipelines}
        />
        <div className="flex gap-1">
          <TabsTrigger
            value="view"
            className="rounded-[var(--radius)] px-3 py-1.5 text-sm data-[state=active]:bg-muted data-[state=active]:shadow-none"
          >
            Board
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="rounded-[var(--radius)] px-3 py-1.5 text-sm data-[state=active]:bg-muted data-[state=active]:shadow-none"
          >
            Settings
          </TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="view">
        <PipelineView
          lanes={lanes}
          pipelineDetails={pipelineDetails}
          pipelineId={resolvedParams.pipelineId}
          subaccountId={resolvedParams.subaccountId}
          updateLanesOrder={updateLanesOrder}
          updateTicketsOrder={updateTicketsOrder}
        />
      </TabsContent>
      <TabsContent value="settings">
        <PipelineSettings
          pipelineId={resolvedParams.pipelineId}
          pipelines={pipelines}
          subaccountId={resolvedParams.subaccountId}
        />
      </TabsContent>
    </Tabs>
    </>
  )
}

export default PipelinePage
