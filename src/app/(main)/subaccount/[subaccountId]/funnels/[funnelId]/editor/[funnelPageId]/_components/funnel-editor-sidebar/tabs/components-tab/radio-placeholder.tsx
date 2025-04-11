import { EditorBtns } from '@/lib/constants'
import { Youtube } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

const RadioPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'radio')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      {/* <Image
        src="/stripelogo.png"
        height={40}
        width={40}
        alt="stripe logo"
        className="object-cover"
      /> */}
       <div className=''>
       <svg data-wf-icon="AddPanelFormRadio64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M43 32C43 38.0751 38.0751 43 32 43C25.9249 43 21 38.0751 21 32C21 25.9249 25.9249 21 32 21C38.0751 21 43 25.9249 43 32Z" fill="currentColor" fill-opacity="0.1"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M32 42C37.5228 42 42 37.5228 42 32C42 26.4772 37.5228 22 32 22C26.4772 22 22 26.4772 22 32C22 37.5228 26.4772 42 32 42ZM32 43C38.0751 43 43 38.0751 43 32C43 25.9249 38.0751 21 32 21C25.9249 21 21 25.9249 21 32C21 38.0751 25.9249 43 32 43Z" fill="currentColor"></path><circle cx="32" cy="32" r="5" fill="white"></circle></svg>
      </div>
    </div>
  )
}

export default RadioPlaceholder
