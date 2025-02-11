
import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const DivPlaceholder = (props: Props) => {
    const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
        if (type === null) return
        e.dataTransfer.setData('componentType', type)
    }
    return (
        <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'div')}
            className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px]"
        >
            {/* <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full"></div>
      <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full"></div> */}
            <div className='flex items-center ml-[-11px]'>
            <svg data-wf-icon="AddPanelDiv64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M47 17H17V47H47V17ZM17 16C16.4477 16 16 16.4477 16 17V47C16 47.5523 16.4477 48 17 48H47C47.5523 48 48 47.5523 48 47V17C48 16.4477 47.5523 16 47 16H17Z" fill="currentColor"></path></svg>        </div>
            </div>
    )
}

export default DivPlaceholder
