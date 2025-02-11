import { EditorBtns } from '@/lib/constants'
import { Link2Icon, TypeIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const BlockQuotePlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'BlockQuote')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <div className=' '>
      <svg data-wf-icon="AddPanelBlockquote64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 22C16.4477 22 16 22.4477 16 23V28.5C16 28.6326 16.0527 28.7598 16.1464 28.8536L21.1464 33.8536L21.8536 33.1464L17.7071 29H22C22.5523 29 23 28.5523 23 28V23C23 22.4477 22.5523 22 22 22H17ZM17 23V28H22V23H17Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M26 22C25.4477 22 25 22.4477 25 23V28.5C25 28.6326 25.0527 28.7598 25.1464 28.8536L30.1464 33.8536L30.8536 33.1464L26.7071 29H31C31.5523 29 32 28.5523 32 28V23C32 22.4477 31.5523 22 31 22H26ZM26 23V28H31V23H26Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16 39L48 39V38L16 38V39ZM16 45L32 45V44L16 44V45Z" fill="currentColor" fill-opacity="0.22"></path></svg>    </div>
    </div>
  )
}

export default BlockQuotePlaceholder
