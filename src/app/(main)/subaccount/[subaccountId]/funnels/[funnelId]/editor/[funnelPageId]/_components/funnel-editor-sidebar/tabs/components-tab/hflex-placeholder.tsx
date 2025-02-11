import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const HFlexContainerPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'HFlex')}
      className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px]"
    >
      {/* <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full" /> */}
      <div className=' flex items-center ml-[-11px]'>
      <svg data-wf-icon="AddPanelHFlexIcon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 17H47V47H17V17ZM16 17C16 16.4477 16.4477 16 17 16H47C47.5523 16 48 16.4477 48 17V47C48 47.5523 47.5523 48 47 48H17C16.4477 48 16 47.5523 16 47V17ZM37.8536 31.1464L33.8536 27.1464L33.1464 27.8536L36.2929 31H27V32H36.2929L33.1464 35.1464L33.8536 35.8536L37.8536 31.8536L38.2071 31.5L37.8536 31.1464Z" fill="currentColor"></path></svg>      </div>
    </div>
  )
}

export default HFlexContainerPlaceholder
