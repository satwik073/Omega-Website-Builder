'use client'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import React from 'react'
import TabList from './tabs'
import SettingsTab from './tabs/settings-tab'
import MediaBucketTab from './tabs/media-bucket-tab'
import ComponentsTab from './tabs/components-tab'

type Props = {
  subaccountId: string
}

const FunnelEditorSidebar = ({ subaccountId }: Props) => {
  const { state, dispatch } = useEditor()

  return (
    <Sheet
      open={true}
      modal={false}
    >
      <Tabs
        className="w-full "
        defaultValue="Components"
      
      >
        <SheetContent
          showX={false}
          side="right"
          className={clsx(
            'mt-14 w-14 border-l border-border bg-background p-0 shadow-none transition-all overflow-hidden z-[80]',
            { hidden: state.editor.previewMode }
          )}
        >
          <TabList />
        </SheetContent>
        <SheetContent
          showX={false}
          side="right"
          className={clsx(
            'mt-14 mr-14 w-80 border-l border-border bg-background p-0 shadow-none transition-all overflow-hidden z-[40]',
            { hidden: state.editor.previewMode }
          )}
        >
          <div className="h-full overflow-y-auto no-scrollbar pb-36">
            <TabsContent value="Settings">
              <SheetHeader className="border-b border-border p-5 text-left">
                <SheetTitle className="text-base">Styles</SheetTitle>
                <SheetDescription className="text-xs">
                  Customise any component on the canvas.
                </SheetDescription>
              </SheetHeader>
              <SettingsTab />
            </TabsContent>
            <TabsContent value="Media">
              <MediaBucketTab subaccountId={subaccountId} />
            </TabsContent>
            <TabsContent value="Components">
              <SheetHeader className="border-b border-border p-5 text-left">
                <SheetTitle className="text-base">Components</SheetTitle>
                <SheetDescription className="text-xs">
                  Drag and drop components onto the canvas.
                </SheetDescription>
              </SheetHeader>
              <ComponentsTab />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  )
}

export default FunnelEditorSidebar
