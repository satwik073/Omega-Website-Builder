import { EditorBtns } from '@/lib/constants'
import { Link2Icon, TypeIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const CollectionPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'CMS')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <div className=' '>
      <svg data-wf-icon="AddPanelCollectionlist64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 17C16 16.4477 16.4477 16 17 16H47C47.5523 16 48 16.4477 48 17V47C48 47.5523 47.5523 48 47 48H17C16.4477 48 16 47.5523 16 47V17Z" fill="#875FFD" fill-opacity="0.15"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M47 17H17V26H47V17ZM16 26V27V37V38V47C16 47.5523 16.4477 48 17 48H47C47.5523 48 48 47.5523 48 47V38V37V27V26V17C48 16.4477 47.5523 16 47 16H17C16.4477 16 16 16.4477 16 17V26ZM47 37V27H17V37H47ZM17 38V47H47V38H17Z" fill="#C4AFFF"></path></svg>  </div>
    </div>
  )
}

export default CollectionPlaceholder
