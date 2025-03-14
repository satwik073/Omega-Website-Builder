import { EditorBtns } from '@/lib/constants'
import { Heading, TypeIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const HeadingPlaceholder = (props: Props) => {
  const handleDragState = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragState(e, 'heading')
      }}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
         <div className=' '>
     {/* <svg viewBox="0 0 24 24">
          <path d="M8.3 11.5h7.4V6.9l-.2-1.6a1 1 0 00-.5-.5c-.3-.2-.7-.3-1-.3h-.6v-.4h6.8v.4h-.6c-.4 0-.7.1-1 .3a1 1 0 00-.6.6L18 6.9v10.3c0 .8 0 1.3.2 1.6 0 .2.2.3.4.5.4.2.7.3 1.1.3h.6v.4h-6.8v-.4h.5c.7 0 1.2-.2 1.5-.6.2-.3.3-.9.3-1.8v-4.9H8.3v4.9l.1 1.6.5.5c.3.2.7.3 1 .3h.7v.4H3.7v-.4h.6c.7 0 1.1-.2 1.4-.6.2-.3.3-.9.3-1.8V6.9L6 5.3a1 1 0 00-.5-.5l-1-.3h-.7v-.4h6.9v.4H10c-.4 0-.8.1-1 .3a1 1 0 00-.6.6l-.1 1.5v4.6z"></path>
        </svg> */}
        <svg data-wf-icon="AddPanelHeading64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 21V27.5M16.5 33V27.5M16.5 27.5H23.5V21V33" stroke="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16 39L48 39V38L16 38V39ZM16 45L32 45V44L16 44V45Z" fill="currentColor" fill-opacity="0.22"></path></svg>
        </div>
    </div>
  )
}

export default HeadingPlaceholder
