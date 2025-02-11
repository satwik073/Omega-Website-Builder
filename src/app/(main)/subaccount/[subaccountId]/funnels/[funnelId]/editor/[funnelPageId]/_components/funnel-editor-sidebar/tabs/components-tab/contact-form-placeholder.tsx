import { EditorBtns } from '@/lib/constants'
import { Contact2Icon, TypeIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const ContactFormComponentPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'contactForm')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
       <div className=' '>
       <svg data-wf-icon="AddPanelForm64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14 17C12.8954 17 12 17.8954 12 19V23C12 24.1046 12.8954 25 14 25H50C51.1046 25 52 24.1046 52 23V19C52 17.8954 51.1046 17 50 17H14ZM14 29C12.8954 29 12 29.8954 12 31V35C12 36.1046 12.8954 37 14 37H50C51.1046 37 52 36.1046 52 35V31C52 29.8954 51.1046 29 50 29H14Z" fill="currentColor" fill-opacity="0.1"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M50 18H14C13.4477 18 13 18.4477 13 19V23C13 23.5523 13.4477 24 14 24H50C50.5523 24 51 23.5523 51 23V19C51 18.4477 50.5523 18 50 18ZM14 17C12.8954 17 12 17.8954 12 19V23C12 24.1046 12.8954 25 14 25H50C51.1046 25 52 24.1046 52 23V19C52 17.8954 51.1046 17 50 17H14ZM50 30H14C13.4477 30 13 30.4477 13 31V35C13 35.5523 13.4477 36 14 36H50C50.5523 36 51 35.5523 51 35V31C51 30.4477 50.5523 30 50 30ZM14 29C12.8954 29 12 29.8954 12 31V35C12 36.1046 12.8954 37 14 37H50C51.1046 37 52 36.1046 52 35V31C52 29.8954 51.1046 29 50 29H14ZM14 41C12.8954 41 12 41.8954 12 43V45C12 46.1046 12.8954 47 14 47H30C31.1046 47 32 46.1046 32 45V43C32 41.8954 31.1046 41 30 41H14Z" fill="currentColor"></path></svg>
      </div>
    </div>
  )
}

export default ContactFormComponentPlaceholder
