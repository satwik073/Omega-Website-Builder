import { EditorBtns } from '@/lib/constants'
import { Youtube } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

const SelectPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'select')}
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
       <svg data-wf-icon="AddPanelFormSelect64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 26C5 23.2386 7.23858 21 10 21H54C56.7614 21 59 23.2386 59 26V38C59 40.7614 56.7614 43 54 43H10C7.23858 43 5 40.7614 5 38V26ZM50.6465 29.6465L48 32.2929L45.3536 29.6465L44.6465 30.3536L48 33.7071L51.3536 30.3536L50.6465 29.6465ZM15 32H36V31H15V32Z" fill="currentColor"></path></svg>
      </div>
    </div>
  )
}

export default SelectPlaceholder
