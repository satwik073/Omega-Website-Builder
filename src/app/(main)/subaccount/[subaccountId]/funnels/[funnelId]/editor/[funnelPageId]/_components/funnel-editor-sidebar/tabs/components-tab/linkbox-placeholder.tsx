
import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const LinkBoxPlaceholder = (props: Props) => {
    const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
        if (type === null) return
        e.dataTransfer.setData('componentType', type)
    }
    return (
        <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'linkBox')}
            className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px]"
        >
            {/* <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full"></div>
      <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full"></div> */}
            <div className='flex items-center ml-[-11px]'>
            <svg data-wf-icon="AddPanelLinkBlock64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 17H47V47H17V17ZM16 17C16 16.4477 16.4477 16 17 16H47C47.5523 16 48 16.4477 48 17V47C48 47.5523 47.5523 48 47 48H17C16.4477 48 16 47.5523 16 47V17ZM27.3536 33.3536L28.8536 31.8536L28.1464 31.1464L26.6464 32.6464C25.3466 33.9463 25.3466 36.0537 26.6464 37.3536C27.9463 38.6534 30.0537 38.6534 31.3536 37.3536L32.8536 35.8536L32.1464 35.1464L30.6464 36.6464C29.7371 37.5558 28.2629 37.5558 27.3536 36.6464C26.4442 35.7371 26.4442 34.2629 27.3536 33.3536ZM32.6464 26.6464C33.9463 25.3466 36.0537 25.3466 37.3536 26.6464C38.6534 27.9463 38.6534 30.0537 37.3536 31.3536L35.8536 32.8536L35.1464 32.1464L36.6464 30.6464C37.5558 29.7371 37.5558 28.2629 36.6464 27.3536C35.7371 26.4442 34.2629 26.4442 33.3536 27.3536L31.8536 28.8536L31.1464 28.1464L32.6464 26.6464ZM30.3536 34.3536L34.3536 30.3536L33.6464 29.6464L29.6464 33.6464L30.3536 34.3536Z" fill="currentColor"></path></svg>      </div>
            </div>
    )
}

export default LinkBoxPlaceholder
