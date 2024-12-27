import BlurPage from '@/components/global/blur-page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getFunnel } from '@/lib/queries'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import FunnelSettings from './_components/funnel-settings'
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
    <BlurPage>
      <Link
        href={`/subaccount/${resolvedParams.subaccountId}/funnels`}
        className="flex justify-between gap-4 mb-4 text-muted-foreground"
      >
        Back
      </Link>
      <h1 className="text-3xl mb-8">{funnelPages.name}</h1>
      <Tabs
        defaultValue="steps"
        className="w-full"
      >
        <TabsList className="grid  grid-cols-2 w-[50%] bg-transparent ">
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
    </BlurPage>
  )
}

export default FunnelPage
