'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import {
  EditorElement,
  useEditor,
} from '@/providers/editor/editor-provider'
import {
  Box,
  ChevronRight,
  Columns2,
  FileText,
  Heading,
  Image as ImageIcon,
  Layers,
  Link2,
  Square,
  Trash2,
  Type,
  Video,
} from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

/**
 * Editor left rail: Pages and Layers.
 *
 * The editor previously had no left sidebar at all — the only way to reach a
 * nested element was to click it on the canvas, which is unusable once
 * anything is stacked or absolutely positioned. The layer tree reads directly
 * from editor state and dispatches the same selection action the canvas does,
 * so the two stay in sync without any new state.
 */

type PageSummary = { id: string; name: string; pathName: string; order: number }

/** Maps an element type to a glyph, so the tree is scannable at a glance. */
const glyphFor = (type: EditorElement['type']) => {
  switch (type) {
    case 'text':
      return Type
    case 'heading':
      return Heading
    case 'image':
      return ImageIcon
    case 'video':
      return Video
    case 'link':
      return Link2
    case '2Col':
      return Columns2
    case 'container':
    case 'section':
      return Square
    case '__body':
      return Box
    default:
      return Box
  }
}

const LayerRow = ({
  element,
  depth,
}: {
  element: EditorElement
  depth: number
}) => {
  const { state, dispatch } = useEditor()
  const [open, setOpen] = useState(true)

  const children = Array.isArray(element.content) ? element.content : []
  const hasChildren = children.length > 0
  const selected = state.editor.selectedElement.id === element.id
  const Glyph = glyphFor(element.type)
  const isBody = element.type === '__body'

  const select = () =>
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: { elementDetails: element },
    })

  return (
    <li>
      <div
        className={cn(
          'group flex items-center gap-1 rounded-sm pr-1 transition-colors duration-fast',
          selected
            ? 'bg-muted text-foreground'
            : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
        )}
        // Indent scales with depth so nesting is legible without a guide line.
        style={{ paddingLeft: depth * 12 }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Collapse' : 'Expand'}
            aria-expanded={open}
            className="flex size-5 shrink-0 items-center justify-center rounded-xs hover:bg-muted"
          >
            <ChevronRight
              className={cn(
                'size-3 transition-transform duration-fast ease-standard',
                open && 'rotate-90'
              )}
            />
          </button>
        ) : (
          <span className="size-5 shrink-0" />
        )}

        <button
          type="button"
          onClick={select}
          className="flex min-w-0 flex-1 items-center gap-2 py-1.5 text-left"
        >
          <Glyph className="size-3.5 shrink-0 opacity-70" />
          <span className="truncate text-[13px]">{element.name}</span>
        </button>

        {/* The body is the canvas root and cannot be removed. */}
        {!isBody && (
          <Button
            variant="destructive-ghost"
            size="icon-xs"
            aria-label={`Delete ${element.name}`}
            // Keep the control reachable by keyboard even while hidden.
            className="opacity-0 focus-visible:opacity-100 group-hover:opacity-100"
            onClick={() =>
              dispatch({
                type: 'DELETE_ELEMENT',
                payload: { elementDetails: element },
              })
            }
          >
            <Trash2 />
          </Button>
        )}
      </div>

      {hasChildren && open && (
        <ul>
          {children.map((child) => (
            <LayerRow key={child.id} element={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

const SectionLabel = ({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) => (
  <p className="flex items-center gap-2 px-2 pb-2 pt-1 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground [&_svg]:size-3.5">
    {icon}
    {children}
  </p>
)

const FunnelEditorLayers = ({
  pages,
  funnelId,
  subaccountId,
  activePageId,
}: {
  pages: PageSummary[]
  funnelId: string
  subaccountId: string
  activePageId: string
}) => {
  const { state } = useEditor()

  if (state.editor.previewMode || state.editor.liveMode) return null

  return (
    <TooltipProvider delayDuration={300}>
      <aside
        aria-label="Pages and layers"
        className="fixed bottom-0 left-0 top-14 z-[40] hidden w-[260px] flex-col border-r border-border bg-background lg:flex"
      >
        {/* Pages */}
        <div className="border-b border-border p-2">
          <SectionLabel icon={<FileText />}>Pages</SectionLabel>
          <ul className="flex flex-col gap-0.5">
            {pages.map((page) => {
              const active = page.id === activePageId
              return (
                <li key={page.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/subaccount/${subaccountId}/funnels/${funnelId}/editor/${page.id}`}
                        className={cn(
                          'flex items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-[13px] transition-colors duration-fast',
                          active
                            ? 'bg-muted font-medium text-foreground'
                            : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                        )}
                        aria-current={active ? 'page' : undefined}
                      >
                        <span className="truncate">{page.name}</span>
                        <span className="shrink-0 font-mono text-[11px] opacity-60">
                          /{page.pathName}
                        </span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      Edit {page.name}
                    </TooltipContent>
                  </Tooltip>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Layers */}
        <div className="flex min-h-0 flex-1 flex-col p-2">
          <SectionLabel icon={<Layers />}>Layers</SectionLabel>
          <ul className="no-scrollbar min-h-0 flex-1 overflow-y-auto pb-4">
            {state.editor.elements.map((element) => (
              <LayerRow key={element.id} element={element} depth={0} />
            ))}
          </ul>
        </div>
      </aside>
    </TooltipProvider>
  )
}

export default FunnelEditorLayers
