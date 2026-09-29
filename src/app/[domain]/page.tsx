import { parsePageContent } from '@/components/builder/data'
import { db } from '@/lib/db'
import { getDomainContent } from '@/lib/queries'
import { notFound } from 'next/navigation'
import React from 'react'
import PublishedPage from './_components/published-page'

type Props = {
  params: Promise<{ domain: string }>
}

/** Published funnel home page, served on the funnel's own subdomain. */
const Page = async ({ params }: Props) => {
  const resolvedParams = await params

  // The param is already the bare subdomain — the middleware strips the
  // trailing dot before rewriting. A previous `.slice(0, -1)` here chopped a
  // real character off ("beaded" -> "beade"), so no funnel ever matched and
  // every subdomain 404'd.
  const domainData = await getDomainContent(resolvedParams.domain)
  if (!domainData) return notFound()

  const pageData = domainData.FunnelPages.find(
    (page) => !page.pathName.replace(/^\/+|\/+$/g, '')
  )
  if (!pageData) return notFound()

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
