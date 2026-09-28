import { getFunnels } from '@/lib/queries'
import PageHeader from '@/components/global/page-header'
import React from 'react'
import FunnelsDataTable from './data-table'
import { Plus } from 'lucide-react'
import { columns } from './columns'
import FunnelForm from '@/components/forms/funnel-form'

type Props = {
  params: Promise<{ subaccountId: string }>
}

const Funnels = async ({ params }: Props) => {
  const resolvedParams = await params

  const funnels = await getFunnels(resolvedParams.subaccountId)
  if (!funnels) return null

  return (
    <>
      <PageHeader
        title="Funnels"
        description="Landing pages and multi-step flows for this sub account."
      />
            <FunnelsDataTable
        actionButtonText={
          <>
            <Plus size={15} />
            Create Funnel
          </>
        }
        modalChildren={
          <FunnelForm subAccountId={resolvedParams.subaccountId}></FunnelForm>
        }
        searchPlaceholder="Search funnels…"
        emptyMessage="No funnels yet. Create your first one."
        filterValue="name"
        columns={columns}
        data={funnels}
      />
    </>
  )
}

export default Funnels
