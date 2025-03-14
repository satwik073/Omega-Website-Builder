import { EditorBtns } from '@/lib/constants'
import { Link2Icon, TypeIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const RichPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'RichText')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <div className=' '>
      <svg data-wf-icon="AddPanelRichtext64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 24C21 24.5523 20.5523 25 20 25C19.4477 25 19 24.5523 19 24C19 23.4477 19.4477 23 20 23C20.5523 23 21 23.4477 21 24Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16 21.5C16 20.6716 16.6716 20 17.5 20H27.5C28.3284 20 29 20.6716 29 21.5V31.5C29 32.3284 28.3284 33 27.5 33H17.5C16.6716 33 16 32.3284 16 31.5V21.5ZM17.5 21C17.2239 21 17 21.2239 17 21.5V31.2929L21.7929 26.5C22.1834 26.1095 22.8166 26.1095 23.2071 26.5L28 31.2929V21.5C28 21.2239 27.7761 21 27.5 21H17.5ZM27.2929 32L22.5 27.2071L17.7071 32H27.2929Z" fill="currentColor"></path><path d="M48 33L35 33V32H48V33Z" fill="currentColor"></path><path d="M16 39L48 39V38L16 38V39Z" fill="currentColor"></path><path d="M16 45H32V44H16V45Z" fill="currentColor"></path></svg>    </div>
    </div>
  )
}

export default RichPlaceholder
