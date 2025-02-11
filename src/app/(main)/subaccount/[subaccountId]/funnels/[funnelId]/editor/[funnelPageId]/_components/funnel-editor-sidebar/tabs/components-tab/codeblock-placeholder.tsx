
import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const  CodePlaceholder = (props: Props) => {
    const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
        if (type === null) return
        e.dataTransfer.setData('componentType', type)
    }
    return (
        <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'button')}
            className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px]"
        >
            {/* <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full"></div>
      <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full"></div> */}
            <div className='flex items-center ml-[-11px]'>
            <svg data-wf-icon="AddPanelCodeBlock64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15C12 13.3431 13.3431 12 15 12H49C50.6569 12 52 13.3431 52 15V49C52 50.6569 50.6569 52 49 52H15C13.3431 52 12 50.6569 12 49V15Z" fill="currentColor" fill-opacity="0.1"></path><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M19 52L19 12L20 12L20 52H19Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15 13H49C50.1046 13 51 13.8954 51 15V49C51 50.1046 50.1046 51 49 51H15C13.8954 51 13 50.1046 13 49V15C13 13.8954 13.8954 13 15 13ZM12 15C12 13.3431 13.3431 12 15 12H49C50.6569 12 52 13.3431 52 15V49C52 50.6569 50.6569 52 49 52H15C13.3431 52 12 50.6569 12 49V15ZM33 18H24V17H33V18ZM41 23H29V22H41V23ZM43 23H47V22H43V23ZM35 28V27H47V28H35ZM29 28H33V27H29V28ZM33 33H24V32H33V33Z" fill="currentColor"></path></svg> </div>
            </div>
    )
}

export default CodePlaceholder
