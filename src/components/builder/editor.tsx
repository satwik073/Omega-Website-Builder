'use client'

import { Puck, type Data } from '@puckeditor/core'
import '@puckeditor/core/puck.css'

import { saveActivityLogsNotification, upsertFunnelPage } from '@/lib/queries'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { toast } from 'sonner'

import { puckConfig } from './config'
import { serializePageContent } from './data'
import { elementorOverrides } from './elementor/overrides'
import './puck-theme.css'
import './elementor/elementor.css'

type Props = {
  data: Data
  pageId: string
  pageName: string
  pagePath: string
  pageOrder: number
  funnelId: string
  subaccountId: string
  /** The stored document came from the retired editor and was not imported. */
  legacy?: boolean
  /** Published site URL, when the funnel has a domain. */
  liveUrl?: string
}

/**
 * Page editor.
 *
 * Wraps Puck with the Arobix block library, persistence and chrome. Puck owns
 * the canvas, drag-and-drop, the fields panel, undo/redo and the outline; this
 * component owns saving and the surrounding navigation.
 */
const PageBuilder = ({
  data,
  pageId,
  pageName,
  pagePath,
  pageOrder,
  funnelId,
  subaccountId,
  legacy,
  liveUrl,
}: Props) => {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const save = useCallback(
    async (next: Data) => {
      setSaving(true)
      try {
        await upsertFunnelPage(
          subaccountId,
          {
            id: pageId,
            name: pageName,
            order: pageOrder,
            pathName: pagePath,
            content: serializePageContent(next),
          },
          funnelId
        )
        await saveActivityLogsNotification({
          agencyId: undefined,
          description: `Updated a funnel page | ${pageName}`,
          subaccountId,
        })
        toast.success('Page saved')
        router.refresh()
      } catch {
        toast.error('Could not save this page')
      } finally {
        setSaving(false)
      }
    },
    [funnelId, pageId, pageName, pageOrder, pagePath, router, subaccountId]
  )

  return (
    <div className="fixed inset-0 z-[60] bg-background">
      {/* Puck keeps its own layout; the Elementor look comes from overrides.
          Replacing the layout wholesale (compositional mode) broke
          click-to-select on the canvas. */}
      <Puck
        config={puckConfig}
        data={data}
        onPublish={save}
        overrides={elementorOverrides}
        viewports={[
          { width: 390, height: 'auto', label: 'Mobile', icon: 'Smartphone' },
          { width: 768, height: 'auto', label: 'Tablet', icon: 'Tablet' },
          { width: 1280, height: 'auto', label: 'Desktop', icon: 'Monitor' },
        ]}
      />

      {legacy && (
        <div className="pointer-events-none fixed bottom-4 left-1/2 z-[70] w-[min(560px,calc(100vw-2rem))] -translate-x-1/2">
          <div className="pointer-events-auto rounded-card border border-border bg-popover p-4 shadow-lg">
            <p className="text-[13px] font-medium">
              This page was built in the previous editor
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
              Its old layout can&rsquo;t be imported automatically — the two
              editors use different components. Rebuild the page here; the
              original is kept in the database until you save.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PageBuilder
