'use client'
import { Button } from '@/components/ui/button'
import { getFunnelPageDetails } from '@/lib/queries'
import { useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { EyeOff } from 'lucide-react'
import React, { useEffect } from 'react'
import Recursive from './funnel-editor-components/recursive'

type Props = { funnelPageId: string; liveMode?: boolean }

const FunnelEditor = ({ funnelPageId, liveMode }: Props) => {
  const { dispatch, state } = useEditor()

  useEffect(() => {
    if (liveMode) {
      dispatch({
        type: 'TOGGLE_LIVE_MODE',
        payload: { value: true },
      })
    }
  }, [liveMode])

  //CHALLENGE: make this more performant
  useEffect(() => {
    const fetchData = async () => {
      const response = await getFunnelPageDetails(funnelPageId)
      if (!response) return

      dispatch({
        type: 'LOAD_DATA',
        payload: {
          elements: response.content ? JSON.parse(response?.content) : '',
          withLive: !!liveMode,
        },
      })
    }
    fetchData()
  }, [funnelPageId])

  const handleClick = () => {
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {},
    })
  }

  const handleUnpreview = () => {
    dispatch({ type: 'TOGGLE_PREVIEW_MODE' })
    dispatch({ type: 'TOGGLE_LIVE_MODE' })
  }
  const isPreview =
    state.editor.previewMode === true || state.editor.liveMode === true
  const device = state.editor.device

  return (
    // Scroll container. The rail offsets live here rather than on the parent
    // because only this client component knows about preview mode, where the
    // rails are hidden and the canvas should take the whole viewport.
    <div
      className={clsx(
        'no-scrollbar h-full w-full overflow-y-auto transition-[padding] duration-slow ease-standard',
        isPreview
          ? 'bg-background p-0'
          : 'bg-muted/40 pr-[376px] lg:pl-[260px]'
      )}
      onClick={handleClick}
    >
      {isPreview && (
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Exit preview"
          className="fixed left-3 top-3 z-[100] shadow-sm"
          onClick={handleUnpreview}
        >
          <EyeOff />
        </Button>
      )}

      {/* Device frame. Desktop fills the available width; the narrower
          breakpoints float as a centred surface so the user can see the edges
          of the viewport they are designing for. */}
      <div
        className={clsx(
          'mx-auto min-h-full bg-background transition-[width,margin] duration-slow ease-standard',
          {
            'w-full': device === 'Desktop' || isPreview,
            'w-[850px] max-w-full': device === 'Tablet' && !isPreview,
            'w-[420px] max-w-full': device === 'Mobile' && !isPreview,
            'my-6 min-h-[calc(100%-3rem)] rounded-md border border-border shadow-md':
              device !== 'Desktop' && !isPreview,
          }
        )}
      >
        {Array.isArray(state.editor.elements) &&
          state.editor.elements.map((childElement) => (
            <Recursive
              key={childElement.id}
              element={childElement}
            />
          ))}
      </div>
    </div>
  )
}

export default FunnelEditor
