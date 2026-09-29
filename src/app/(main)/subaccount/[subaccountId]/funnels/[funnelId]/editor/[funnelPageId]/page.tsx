import PageBuilder from '@/components/builder/editor'
import { parsePageContent } from '@/components/builder/data'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  params: Promise<{
    subaccountId: string
    funnelId: string
    funnelPageId: string
  }>
}

/**
 * Page editor route.
 *
 * Backed by Puck with the Arobix block library. The previous in-house editor
 * (`_components/funnel-editor*`) is retained but no longer routed to — see the
 * deprecation note in `_components/DEPRECATED.md`.
 */
const Page = async ({ params }: Props) => {
  const resolvedParams = await params

  const funnelPageDetails = await db.funnelPage.findFirst({
    where: { id: resolvedParams.funnelPageId },
  })

  if (!funnelPageDetails) {
    return redirect(
      `/subaccount/${resolvedParams.subaccountId}/funnels/${resolvedParams.funnelId}`
    )
  }

  const funnel = await db.funnel.findUnique({
    where: { id: resolvedParams.funnelId },
    select: { subDomainName: true },
  })

  const { data, legacy } = parsePageContent(
    funnelPageDetails.content,
    funnelPageDetails.name
  )

  const domain = process.env.NEXT_PUBLIC_DOMAIN
  const liveUrl =
    funnel?.subDomainName && domain
      ? `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${funnel.subDomainName}.${domain}/${funnelPageDetails.pathName}`
      : undefined

  return (
    <PageBuilder
      data={data}
      legacy={legacy}
      pageId={funnelPageDetails.id}
      pageName={funnelPageDetails.name}
      pagePath={funnelPageDetails.pathName}
      pageOrder={funnelPageDetails.order}
      funnelId={resolvedParams.funnelId}
      subaccountId={resolvedParams.subaccountId}
      liveUrl={liveUrl}
    />
  )
}

export default Page
