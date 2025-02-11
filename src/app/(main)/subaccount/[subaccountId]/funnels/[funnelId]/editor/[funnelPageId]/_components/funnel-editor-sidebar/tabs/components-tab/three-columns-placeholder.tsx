
import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const ThreeColumnsPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, '3Col')}
      className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px]"
    >
      {/* <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full"></div>
      <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full"></div>
      <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full"></div> */}
      <div className='flex items-center ml-[-11px] '>

      <svg data-wf-icon="AddPanelQuickStack64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M32 16H16V31H32V16ZM32 15H16C15.4477 15 15 15.4477 15 16V31V32V48C15 48.5523 15.4477 49 16 49H32H33H48C48.5523 49 49 48.5523 49 48V16C49 15.4477 48.5523 15 48 15H33H32ZM33 48H48V16H33V31V32V48ZM32 48V32H16V48H32Z" fill="currentColor"></path></svg>
      </div>
    </div>
  )
}

export default ThreeColumnsPlaceholder
