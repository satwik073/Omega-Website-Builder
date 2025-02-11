
import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const TabsPlaceholder = (props: Props) => {
    const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
        if (type === null) return
        e.dataTransfer.setData('componentType', type)
    }
    return (
        <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'pageSlot')}
            className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px]"
        >
            {/* <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full"></div>
      <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full"></div> */}
            <div className='flex items-center ml-[-11px]'>
            <svg data-wf-icon="AddPanelTabs64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M51 24V49C51 50.1046 50.1046 51 49 51H15C13.8954 51 13 50.1046 13 49V15C13 13.8954 13.8954 13 15 13H25H25.5V19C25.5 20.1046 26.3954 21 27.5 21H49C50.1046 21 51 21.8954 51 23V24ZM52 24V49C52 50.6569 50.6569 52 49 52H15C13.3431 52 12 50.6569 12 49V15C12 13.3431 13.3431 12 15 12H25H25.5H39.5H48.5C50.433 12 52 13.567 52 15.5V23V24ZM51 20.7639V15.5C51 14.1193 49.8807 13 48.5 13H40V20H49C49.7684 20 50.4692 20.2889 51 20.7639ZM39 20V13H26.5V19C26.5 19.5523 26.9477 20 27.5 20H39Z" fill="currentColor"></path></svg>      {/* <svg data-wf-icon="AddPanelRow64Icon" width="3rem" height="3rem" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 13H53C54.1046 13 55 13.8954 55 15V49C55 50.1046 54.1046 51 53 51H11C9.89543 51 9 50.1046 9 49V15C9 13.8954 9.89543 13 11 13ZM8 15C8 13.3431 9.34315 12 11 12H53C54.6569 12 56 13.3431 56 15V49C56 50.6569 54.6569 52 53 52H11C9.34315 52 8 50.6569 8 49V15ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17ZM15 17C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15C14.4477 15 14 15.4477 14 16C14 16.5523 14.4477 17 15 17ZM19 16C19 16.5523 18.5523 17 18 17C17.4477 17 17 16.5523 17 16C17 15.4477 17.4477 15 18 15C18.5523 15 19 15.4477 19 16Z" fill="currentColor" fill-opacity="0.22"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M18 20H32V48H18V20ZM32 49H18C17.4477 49 17 48.5523 17 48V20C17 19.4477 17.4477 19 18 19H32H33H47C47.5523 19 48 19.4477 48 20V48C48 48.5523 47.5523 49 47 49H33H32ZM33 20V48H47V20H33Z" fill="currentColor"></path></svg> */}
            </div>
        </div>
    )
}

export default TabsPlaceholder
