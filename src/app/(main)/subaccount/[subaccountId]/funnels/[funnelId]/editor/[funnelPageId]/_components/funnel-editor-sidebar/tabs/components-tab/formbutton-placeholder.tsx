import { EditorBtns } from '@/lib/constants'
import { Youtube } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

const FormBtnPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'button')}
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
       <svg data-wf-icon="AddPanelFormSubmit64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 21C12.2386 21 10 23.2386 10 26V38C10 40.7614 12.2386 43 15 43H49C51.7614 43 54 40.7614 54 38V26C54 23.2386 51.7614 21 49 21H15ZM30.9422 34.9425L37.442 28.4419L36.5581 27.5581L30.5002 33.6166L27.442 30.5581L26.5581 31.4419L30.0582 34.9425C30.1755 35.0597 30.3344 35.1255 30.5002 35.1255C30.666 35.1255 30.825 35.0597 30.9422 34.9425Z" fill="currentColor"></path></svg>
      </div>
    </div>
  )
}

export default FormBtnPlaceholder
