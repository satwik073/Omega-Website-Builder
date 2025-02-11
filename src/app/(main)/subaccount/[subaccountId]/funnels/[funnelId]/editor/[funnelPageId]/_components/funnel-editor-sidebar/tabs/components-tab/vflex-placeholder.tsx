import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const VFlexContainerPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'VFlex')}
      className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px]"
    >
      {/* <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full" /> */}
      <div className=' flex items-center ml-[-11px]'>
      <svg data-wf-icon="AddPanelVFlexIcon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 17H47V47H17V17ZM16 17C16 16.4477 16.4477 16 17 16H47C47.5523 16 48 16.4477 48 17V47C48 47.5523 47.5523 48 47 48H17C16.4477 48 16 47.5523 16 47V17ZM32.8536 36.8536L36.8536 32.8536L36.1464 32.1464L33 35.2929V26H32V35.2929L28.8536 32.1464L28.1464 32.8536L32.1464 36.8536L32.5 37.2071L32.8536 36.8536Z" fill="currentColor"></path></svg>
      </div>
    </div>
  )
}

export default VFlexContainerPlaceholder
