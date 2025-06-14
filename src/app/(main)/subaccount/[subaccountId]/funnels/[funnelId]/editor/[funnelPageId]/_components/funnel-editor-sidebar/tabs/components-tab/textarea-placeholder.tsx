import { EditorBtns } from '@/lib/constants'
import { Youtube } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

const TextAreaPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'textarea')}
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
       <svg data-wf-icon="AddPanelFormTextarea64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 18C8 15.7909 9.79086 14 12 14H52C54.2091 14 56 15.7909 56 18V46C56 48.2091 54.2091 50 52 50H12C9.79086 50 8 48.2091 8 46V18Z" fill="currentColor" fill-opacity="0.1"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M46.8536 47.8536L53.8536 40.8536L53.1465 40.1465L46.1465 47.1465L46.8536 47.8536ZM50.8536 47.8536L53.8536 44.8536L53.1465 44.1465L50.1465 47.1465L50.8536 47.8536Z" fill="currentColor" fill-opacity="0.1"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 15H52C53.6569 15 55 16.3431 55 18V46C55 47.6569 53.6569 49 52 49H12C10.3431 49 9 47.6569 9 46V18C9 16.3431 10.3431 15 12 15ZM8 18C8 15.7909 9.79086 14 12 14H52C54.2091 14 56 15.7909 56 18V46C56 48.2091 54.2091 50 52 50H12C9.79086 50 8 48.2091 8 46V18ZM13 19L13 30H14L14 19H13Z" fill="currentColor"></path></svg>
      </div>
    </div>
  )
}

export default TextAreaPlaceholder
