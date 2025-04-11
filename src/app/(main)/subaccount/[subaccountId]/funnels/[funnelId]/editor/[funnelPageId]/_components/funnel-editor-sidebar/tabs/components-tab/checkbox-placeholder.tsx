import { EditorBtns } from '@/lib/constants'
import { Youtube } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

const CheckboxPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'checkbox')}
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
       <svg data-wf-icon="AddPanelFormCheckbox64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 25C22 23.3431 23.3431 22 25 22H39C40.6569 22 42 23.3431 42 25V39C42 40.6569 40.6569 42 39 42H25C23.3431 42 22 40.6569 22 39V25Z" fill="currentColor" fill-opacity="0.1"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M25 23H39C40.1046 23 41 23.8954 41 25V39C41 40.1046 40.1046 41 39 41H25C23.8954 41 23 40.1046 23 39V25C23 23.8954 23.8954 23 25 23ZM22 25C22 23.3431 23.3431 22 25 22H39C40.6569 22 42 23.3431 42 25V39C42 40.6569 40.6569 42 39 42H25C23.3431 42 22 40.6569 22 39V25ZM30.9417 34.9425L37.4415 28.4419L36.5576 27.5581L30.4997 33.6166L27.4416 30.5581L26.5576 31.4419L30.0578 34.9425C30.175 35.0597 30.334 35.1255 30.4997 35.1255C30.6655 35.1255 30.8245 35.0597 30.9417 34.9425Z" fill="currentColor"></path></svg>
      </div>
    </div>
  )
}

export default CheckboxPlaceholder
