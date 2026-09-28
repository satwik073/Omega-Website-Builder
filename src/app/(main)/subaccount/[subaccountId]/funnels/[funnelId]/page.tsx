import PageHeader from '@/components/global/page-header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getFunnel } from '@/lib/queries'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import FunnelSettings from './_components/funnel-setting-server'
import FunnelSteps from './_components/funnel-steps'

type Props = {
  params: Promise<{ funnelId: string; subaccountId: string }>
}

const FunnelPage = async ({ params }: Props) => {
  const resolvedParams = await params

  const funnelPages = await getFunnel(resolvedParams.funnelId)
  if (!funnelPages)
    return redirect(`/subaccount/${resolvedParams.subaccountId}/funnels`)

  return (
    <>
      <Link
        href={`/subaccount/${resolvedParams.subaccountId}/funnels`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        All funnels
      </Link>

      <PageHeader
        title={funnelPages.name}
        description="Build the steps in this funnel, then publish it to a domain."
      />

      <Tabs defaultValue="steps" className="w-full">
        <TabsList className="mb-6 bg-transparent p-0">
          <TabsTrigger value="steps">Steps</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="steps">
          <FunnelSteps
            funnel={funnelPages}
            subaccountId={resolvedParams.subaccountId}
            pages={funnelPages.FunnelPages}
            funnelId={resolvedParams.funnelId}
          />
        </TabsContent>
        <TabsContent value="settings">
          <FunnelSettings
            subaccountId={resolvedParams.subaccountId}
            defaultData={funnelPages}
          />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default FunnelPage
