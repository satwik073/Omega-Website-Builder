import { EditorBtns } from '@/lib/constants'
import { Link2Icon, TypeIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const NavPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'link')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
         <div className=' '>
         <svg data-wf-icon="AddPanelNav64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 24C2 21.7909 3.79086 20 6 20H58C60.2091 20 62 21.7909 62 24V40C62 42.2091 60.2091 44 58 44H6C3.79086 44 2 42.2091 2 40V24Z" fill="currentColor" fill-opacity="0.1"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M58 21H6C4.34315 21 3 22.3431 3 24V40C3 41.6569 4.34315 43 6 43H58C59.6569 43 61 41.6569 61 40V24C61 22.3431 59.6569 21 58 21ZM6 20C3.79086 20 2 21.7909 2 24V40C2 42.2091 3.79086 44 6 44H58C60.2091 44 62 42.2091 62 40V24C62 21.7909 60.2091 20 58 20H6ZM13.6465 25.6464C13.8417 25.4512 14.1583 25.4512 14.3536 25.6464L20.8536 32.1464L20.1465 32.8536L19 31.7071V36C19 36.5523 18.5523 37 18 37H10C9.44775 37 9.00004 36.5523 9.00004 36V31.7071L7.85359 32.8536L7.14648 32.1464L13.6465 25.6464ZM14 26.7071L18 30.7071V36H10V30.7071L14 26.7071Z" fill="currentColor"></path></svg>
        </div>
    </div>
  )
}

export default NavPlaceholder
