import { EditorBtns } from '@/lib/constants'
import { Link2Icon, TypeIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const RivePlaceholder = (props: Props) => {
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
      <svg data-wf-icon="AddPanelRive64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 19H36.5C40.6421 19 44 22.3579 44 26.5C44 30.1831 41.3451 33.2462 37.8446 33.8798L44.9188 44.7269L44.0812 45.2731L36.7269 33.9966C36.6516 33.9989 36.5759 34 36.5 34H29.6304V33H36.5C40.0898 33 43 30.0899 43 26.5C43 22.9101 40.0898 20 36.5 20H20.5V19Z" fill="currentColor"></path></svg>      </div>
    </div>
  )
}

export default RivePlaceholder
