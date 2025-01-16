'use client'
import React, { useState } from 'react'
import { Table, TableBody,TableCell,TableHead,TableHeader,TableRow,} from '@/components/ui/table'
import Stripe from 'stripe'
import Image from 'next/image'
import { saveActivityLogsNotification, updateFunnelProducts, } from '@/lib/queries'
import { Funnel } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import _, { head, uniqueId } from 'lodash'
import { v4 as CrypticRecord } from 'uuid'
import { conditionalRendering, getComputedBordersConfig } from '@/Utils/utils'
import { TableHeaderConfig } from '../Constants'
import { _DEFAULT, BoxTypeIdentifier, ButtonTextConfig, InputTypes, IntervalsSettings, VISIBILITY } from '@/lib/structures'
import { TableHeaderSetting } from '../../structure'
import ProductImage from '@/Controllers/ImageContainer'
import Loading from '../../../pipelines/loading'
import LoadingAgencyPage from '@/app/(main)/subaccount/loading'
interface FunnelProductsTableProps {
  defaultData: Funnel
  products: Stripe.Product[]
}

const FunnelProductsTable: React.FC<FunnelProductsTableProps> = ({
  products,
  defaultData,
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [liveProducts, setLiveProducts] = useState<{ productId: string; recurring: boolean }[] 
  | []>(JSON.parse(defaultData.liveProducts || '[]'))
  const customBorderClass = getComputedBordersConfig("md")

  const handleSaveProducts = async () => {
    setIsLoading(true)
    const response = await updateFunnelProducts(
      JSON.stringify(liveProducts),
      defaultData.id
    )
    await saveActivityLogsNotification({
      agencyId: undefined,
      description: `Update funnel products | ${response.name}`,
      subaccountId: defaultData.subAccountId,
    })
    setIsLoading(false)
    router.refresh()
  }

  const handleAddProduct = async (product: Stripe.Product) => {
    const productIdExists = liveProducts.find(
      //@ts-ignore
      (prod) => prod.productId === product.default_price.id
    )
    productIdExists
      ? setLiveProducts(
        liveProducts.filter(
          (prod) =>
            prod.productId !==
            //@ts-ignore
            product.default_price?.id
        )
      )
      : //@ts-ignore
      setLiveProducts([
        ...liveProducts,
        {
          //@ts-ignore
          productId: product.default_price.id as string,
          //@ts-ignore
          recurring: !!product.default_price.recurring,
        },
      ])
  }

  return (
    <>
      <Table className="bg-card border-[1px] border-border"
        style={{ borderRadius: customBorderClass }} id={uniqueId('_id_table')}>

        <TableHeader id={uniqueId('_id_table_header')} className="rounded-md">
          <TableRow key={uniqueId('_id_table_row')}>
            {Object.values(TableHeaderConfig).map((configController) => (
              <TableHead className={configController?.className}
                key={configController?.key_salutation}
                itemID={configController?._id ?? CrypticRecord()}
                title={(configController?.metadata?.visibility === VISIBILITY.SHOW) ? configController?.labelContent : _DEFAULT}
              >
                {(configController?.metadata?.visibility === VISIBILITY?.SHOW
                  && configController?.labelContent)
                  ? configController?.labelContent :
                  _DEFAULT}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="font-medium truncate" id={uniqueId('_id_table_body')}>
          {products.filter((product: { active: boolean }) => product?.active === VISIBILITY?.SHOW)
            .map((product: Stripe.Product) => (
              <TableRow key={product?.id || CrypticRecord()}>
                {Object.values(TableHeaderConfig).map((tableCellConfig) => (
                  <TableCell id={tableCellConfig?._id} key={`${tableCellConfig._id}-${product.id}`}
                    className={product?.active && tableCellConfig?.metadata?.visibility ? tableCellConfig?.className : _DEFAULT}>
                    {(() => {
                      switch (tableCellConfig?.labelContent) {
                        case TableHeaderSetting._Live || 'LIVE':
                          return (conditionalRendering("INPUT_ELEMENT",
                            liveProducts, () => handleAddProduct(product), "w-4 h-4", product));
                        case TableHeaderSetting._DIMENSION || 'DIMENSIONAL_MEASUREMENT':
                          return (conditionalRendering("DIMENSIONAL_MEASUREMENT",
                            [], undefined, _DEFAULT, product));
                        case TableHeaderSetting.DETAIL || 'DATA_CONFIG':
                          return product?.name
                        case TableHeaderSetting.TM_RANGE || 'INTERAL_SETTING':
                          return (conditionalRendering("RANGE",
                            [], undefined, _DEFAULT, product))
                        case TableHeaderSetting.PRICE || 'PRICE':
                          return (conditionalRendering("AMOUNT_VALIDATOR",
                            [], undefined, _DEFAULT, product));
                        default:
                          return null;
                      }
                    })()}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Button
        id={uniqueId('_id_cnx_btn')}
        disabled={isLoading}
        onClick={handleSaveProducts}
        className="mt-4"
      >
        {isLoading ? <BoxTypeIdentifier.Span id={CrypticRecord()}>
          {ButtonTextConfig?.saveProducts?.loading}
        </BoxTypeIdentifier.Span> :
          <BoxTypeIdentifier.Span id={CrypticRecord()}>
            {ButtonTextConfig?.saveProducts?.default}
          </BoxTypeIdentifier.Span>}
      </Button>
    </>
  )
}

export default FunnelProductsTable
