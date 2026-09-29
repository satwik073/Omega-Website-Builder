import { parsePageContent } from '@/components/builder/data'
import { db } from '@/lib/db'
import { getDomainContent } from '@/lib/queries'
import { notFound } from 'next/navigation'
import React from 'react'
import PublishedPage from '../_components/published-page'

/**
 * Strips surrounding slashes and casing so a stored path and a routed one
 * compare. `pathName` is user-entered and inconsistently saved — "about",
 * "/about" and "about/" all occur — while the route param is always bare,
 * so an exact string match silently 404'd.
 */
const normalisePath = (value: string) =>
  value.replace(/^\/+|\/+$/g, '').trim().toLowerCase()

type Props = {
  params: Promise<{ domain: string; path: string }>
}

/** A published funnel page at a specific path on the funnel's subdomain. */
const Page = async ({ params }: Props) => {
  const resolvedParams = await params

  const domainData = await getDomainContent(resolvedParams.domain)
  const slug = normalisePath(resolvedParams.path)
  const pageData = domainData?.FunnelPages.find(
    (page) => normalisePath(page.pathName) === slug
  )

  if (!pageData || !domainData) return notFound()

  await db.funnelPage.update({
    where: { id: pageData.id },
    data: { visits: { increment: 1 } },
  })

  const { data, legacy } = parsePageContent(pageData.content, pageData.name)

  return (
    <PublishedPage
      data={data}
      legacy={legacy}
      pageDetails={pageData}
      subaccountId={domainData.subAccountId}
      funnelId={domainData.id}
    />
  )
}

export default Page
