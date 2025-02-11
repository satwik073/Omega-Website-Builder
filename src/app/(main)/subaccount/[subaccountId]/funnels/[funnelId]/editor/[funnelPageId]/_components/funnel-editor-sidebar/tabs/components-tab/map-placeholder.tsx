
import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const MapPlaceholder = (props: Props) => {
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
            <svg data-wf-icon="AddPanelMap64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M32 44.9442L25.1553 32.6497L25.1507 32.6417C24.4041 31.3569 24 29.8513 24 28.3334C24 23.6964 27.6157 20 32 20C36.3843 20 40 23.6964 40 28.3334C40 29.8505 39.5963 31.3554 38.8505 32.6397L38.8459 32.6475L32 44.9442ZM23 28.3334C23 30.0251 23.4494 31.7045 24.2861 33.1442L31.1263 45.4306C31.5075 46.1154 32.4925 46.1154 32.8738 45.4306L39.7152 33.1419C40.551 31.7028 41 30.0242 41 28.3334C41 23.1787 36.9706 19 32 19C27.0294 19 23 23.1787 23 28.3334ZM34 28C34 29.1046 33.1046 30 32 30C30.8954 30 30 29.1046 30 28C30 26.8954 30.8954 26 32 26C33.1046 26 34 26.8954 34 28ZM35 28C35 29.6569 33.6569 31 32 31C30.3431 31 29 29.6569 29 28C29 26.3431 30.3431 25 32 25C33.6569 25 35 26.3431 35 28Z" fill="currentColor"></path></svg>      {/* <svg data-wf-icon="AddPanelRow64Icon" width="3rem" height="3rem" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 13H53C54.1046 13 55 13.8954 55 15V49C55 50.1046 54.1046 51 53 51H11C9.89543 51 9 50.1046 9 49V15C9 13.8954 9.89543 13 11 13ZM8 15C8 13.3431 9.34315 12 11 12H53C54.6569 12 56 13.3431 56 15V49C56 50.6569 54.6569 52 53 52H11C9.34315 52 8 50.6569 8 49V15ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17ZM15 17C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15C14.4477 15 14 15.4477 14 16C14 16.5523 14.4477 17 15 17ZM19 16C19 16.5523 18.5523 17 18 17C17.4477 17 17 16.5523 17 16C17 15.4477 17.4477 15 18 15C18.5523 15 19 15.4477 19 16Z" fill="currentColor" fill-opacity="0.22"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M18 20H32V48H18V20ZM32 49H18C17.4477 49 17 48.5523 17 48V20C17 19.4477 17.4477 19 18 19H32H33H47C47.5523 19 48 19.4477 48 20V48C48 48.5523 47.5523 49 47 49H33H32ZM33 20V48H47V20H33Z" fill="currentColor"></path></svg> */}
            </div>
        </div>
    )
}

export default MapPlaceholder
