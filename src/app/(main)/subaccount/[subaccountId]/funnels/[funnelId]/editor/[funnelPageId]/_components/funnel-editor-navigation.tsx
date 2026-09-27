'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { saveActivityLogsNotification, upsertFunnelPage } from '@/lib/queries'
import { DeviceTypes, useEditor } from '@/providers/editor/editor-provider'
import { FunnelPage } from '@prisma/client'
import clsx from 'clsx'
import {
  ArrowLeftCircle,
  EyeIcon,
  Laptop,
  Redo2,
  Smartphone,
  Tablet,
  Undo2,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FocusEventHandler, useEffect } from 'react'
import { toast } from 'sonner'

type Props = {
  funnelId: string
  funnelPageDetails: FunnelPage
  subaccountId: string
}

const FunnelEditorNavigation = ({
  funnelId,
  funnelPageDetails,
  subaccountId,
}: Props) => {
  const router = useRouter()
  const { state, dispatch } = useEditor()

  useEffect(() => {
    dispatch({
      type: 'SET_FUNNELPAGE_ID',
      payload: { funnelPageId: funnelPageDetails.id },
    })
  }, [funnelPageDetails])

  const handleOnBlurTitleChange: FocusEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (event.target.value === funnelPageDetails.name) return
    if (event.target.value) {
      await upsertFunnelPage(
        subaccountId,
        {
          id: funnelPageDetails.id,
          name: event.target.value,
          order: funnelPageDetails.order,
        },
        funnelId
      )

      toast('Success', {
        description: 'Saved Funnel Page title',
      })
      router.refresh()
    } else {
      toast('Oppse!', {
        description: 'You need to have a title!',
      })
      event.target.value = funnelPageDetails.name
    }
  }

  const handlePreviewClick = () => {
    dispatch({ type: 'TOGGLE_PREVIEW_MODE' })
    dispatch({ type: 'TOGGLE_LIVE_MODE' })
  }

  const handleUndo = () => {
    dispatch({ type: 'UNDO' })
  }

  const handleRedo = () => {
    dispatch({ type: 'REDO' })
  }

  const handleOnSave = async () => {
    const content = JSON.stringify(state.editor.elements)
    try {
      const response = await upsertFunnelPage(
        subaccountId,
        {
          ...funnelPageDetails,
          content,
        },
        funnelId
      )
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Updated a funnel page | ${response?.name}`,
        subaccountId: subaccountId,
      })
      toast('Success', {
        description: 'Saved Editor',
      })
    } catch (error) {
      toast('Oppse!', {
        description: 'Could not save editor',
      })
    }
  }

  return (
    <TooltipProvider>
      <nav
        className={clsx(
          'flex h-14 items-center justify-between gap-4 border-b border-border bg-background px-4 transition-all',
          { '!h-0 !p-0 !overflow-hidden': state.editor.previewMode }
        )}
      >
        <aside className="flex w-[300px] max-w-[300px] items-center gap-3">
          <Link
            href={`/subaccount/${subaccountId}/funnels/${funnelId}`}
            aria-label="Back to funnel"
            className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeftCircle className="size-[18px]" />
          </Link>
          <div className="flex min-w-0 flex-col">
            <Input
              defaultValue={funnelPageDetails.name}
              aria-label="Page name"
              className="h-7 border-none bg-transparent px-0 text-sm font-medium focus-visible:ring-0"
              onBlur={handleOnBlurTitleChange}
            />
            <span className="truncate text-xs text-muted-foreground">
              /{funnelPageDetails.pathName}
            </span>
          </div>
        </aside>
        <aside>
          <Tabs
            defaultValue="Desktop"
            className="w-fit gap-3 "
            value={state.editor.device}
            onValueChange={(value) => {
              dispatch({
                type: 'CHANGE_DEVICE',
                payload: { device: value as DeviceTypes },
              })
            }}
          >
            <TabsList className="grid h-fit w-full grid-cols-3 gap-1 bg-transparent p-0">
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Desktop"
                    className="size-9 rounded-[var(--radius)] p-0 text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-foreground"
                  >
                    <Laptop />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Desktop</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Tablet"
                    className="size-9 rounded-[var(--radius)] p-0 text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-foreground"
                  >
                    <Tablet />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tablet</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Mobile"
                    className="size-9 rounded-[var(--radius)] p-0 text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-foreground"
                  >
                    <Smartphone />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mobile</p>
                </TooltipContent>
              </Tooltip>
            </TabsList>
          </Tabs>
        </aside>
        <aside className="flex items-center gap-2">
          <Button
            variant={'ghost'}
            size={'icon'}
            onClick={handlePreviewClick}
          >
            <EyeIcon />
          </Button>
          <Button
            disabled={!(state.history.currentIndex > 0)}
            onClick={handleUndo}
            variant={'ghost'}
            size={'icon'}
          >
            <Undo2 />
          </Button>
          <Button
            disabled={
              !(state.history.currentIndex < state.history.history.length - 1)
            }
            onClick={handleRedo}
            variant={'ghost'}
            size={'icon'}
          >
            <Redo2 />
          </Button>
          <div className="mx-3 hidden flex-col items-end lg:flex">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Draft</span>
              <Switch disabled defaultChecked />
              <span>Publish</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Updated {funnelPageDetails.updatedAt.toLocaleDateString()}
            </span>
          </div>
          <Button size="sm" onClick={handleOnSave}>
            Save
          </Button>
        </aside>
      </nav>
    </TooltipProvider>
  )
}

export default FunnelEditorNavigation
