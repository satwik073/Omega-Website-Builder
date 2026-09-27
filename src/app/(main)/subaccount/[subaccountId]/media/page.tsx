import MediaComponent from '@/components/media'
import PageHeader from '@/components/global/page-header'
import { getMedia } from '@/lib/queries'
import React from 'react'

type Props = {
  params: Promise<{ subaccountId: string }>
}

const MediaPage = async ({ params }: Props) => {
  const resolvedParams = await params
  const data = await getMedia(resolvedParams.subaccountId)

  return (
    <>
      <PageHeader
        title="Media"
        description="Images and files available to this sub account."
      />
            <MediaComponent
        data={data}
        subaccountId={resolvedParams.subaccountId}
      />
    </>
  )
}

export default MediaPage
