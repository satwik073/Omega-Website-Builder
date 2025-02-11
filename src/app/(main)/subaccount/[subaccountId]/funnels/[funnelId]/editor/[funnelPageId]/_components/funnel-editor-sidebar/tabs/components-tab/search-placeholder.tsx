import { EditorBtns } from '@/lib/constants'
import { Youtube } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

const SearchPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'listItem')}
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
       <svg data-wf-icon="AddPanelSearch64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35.6316 34.6316L42.5 41.5M37.8846 29.1923C37.8846 33.4407 34.4407 36.8846 30.1923 36.8846C25.944 36.8846 22.5 33.4407 22.5 29.1923C22.5 24.944 25.944 21.5 30.1923 21.5C34.4407 21.5 37.8846 24.944 37.8846 29.1923Z" stroke="currentColor"></path></svg> </div>
    </div>
  )
}

export default SearchPlaceholder
