import { EditorBtns } from '@/lib/constants'
import { Link2Icon, TypeIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const LinkPlaceholder = (props: Props) => {
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
      <div className='w-[50px]'>

     <svg viewBox="0 0 24 24">
     
     <path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"></path>
   </svg>
      </div>
    </div>
  )
}

export default LinkPlaceholder
