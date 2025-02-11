
import { EditorBtns } from '@/lib/constants'
import React from 'react'

type Props = {}

const SlidesPlaceholder = (props: Props) => {
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
              <svg data-wf-icon="AddPanelSlider64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M32 47.5C32.8284 47.5 33.5 46.8284 33.5 46C33.5 45.1716 32.8284 44.5 32 44.5C31.1716 44.5 30.5 45.1716 30.5 46C30.5 46.8284 31.1716 47.5 32 47.5ZM38 47.5C38.8284 47.5 39.5 46.8284 39.5 46C39.5 45.1716 38.8284 44.5 38 44.5C37.1716 44.5 36.5 45.1716 36.5 46C36.5 46.8284 37.1716 47.5 38 47.5Z" fill="currentColor" fill-opacity="0.22"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 13H52C53.6569 13 55 14.3431 55 16V48C55 49.6569 53.6569 51 52 51H12C10.3431 51 9 49.6569 9 48V16C9 14.3431 10.3431 13 12 13ZM8 16C8 13.7909 9.79086 12 12 12H52C54.2091 12 56 13.7909 56 16V48C56 50.2091 54.2091 52 52 52H12C9.79086 52 8 50.2091 8 48V16ZM26 47.5C26.8284 47.5 27.5 46.8284 27.5 46C27.5 45.1716 26.8284 44.5 26 44.5C25.1716 44.5 24.5 45.1716 24.5 46C24.5 46.8284 25.1716 47.5 26 47.5Z" fill="currentColor"></path></svg>    {/* <svg data-wf-icon="AddPanelRow64Icon" width="3rem" height="3rem" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 13H53C54.1046 13 55 13.8954 55 15V49C55 50.1046 54.1046 51 53 51H11C9.89543 51 9 50.1046 9 49V15C9 13.8954 9.89543 13 11 13ZM8 15C8 13.3431 9.34315 12 11 12H53C54.6569 12 56 13.3431 56 15V49C56 50.6569 54.6569 52 53 52H11C9.34315 52 8 50.6569 8 49V15ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17ZM15 17C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15C14.4477 15 14 15.4477 14 16C14 16.5523 14.4477 17 15 17ZM19 16C19 16.5523 18.5523 17 18 17C17.4477 17 17 16.5523 17 16C17 15.4477 17.4477 15 18 15C18.5523 15 19 15.4477 19 16Z" fill="currentColor" fill-opacity="0.22"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M18 20H32V48H18V20ZM32 49H18C17.4477 49 17 48.5523 17 48V20C17 19.4477 17.4477 19 18 19H32H33H47C47.5523 19 48 19.4477 48 20V48C48 48.5523 47.5523 49 47 49H33H32ZM33 20V48H47V20H33Z" fill="currentColor"></path></svg> */}
            </div>
        </div>
    )
}

export default SlidesPlaceholder
