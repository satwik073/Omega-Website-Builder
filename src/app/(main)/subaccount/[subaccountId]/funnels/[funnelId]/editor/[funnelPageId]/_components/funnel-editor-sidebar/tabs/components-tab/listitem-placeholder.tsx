import { EditorBtns } from '@/lib/constants'
import { Youtube } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

const ListItemPlaceholder = (props: Props) => {
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
       <svg data-wf-icon="AddPanelListItem64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 19H51V45H13L13 19ZM12 19C12 18.4477 12.4477 18 13 18H51C51.5523 18 52 18.4477 52 19V45C52 45.5523 51.5523 46 51 46H13C12.4477 46 12 45.5523 12 45V19ZM46 24H22V40H46V24ZM22 23C21.4477 23 21 23.4477 21 24V40C21 40.5523 21.4477 41 22 41H46C46.5523 41 47 40.5523 47 40V24C47 23.4477 46.5523 23 46 23H22ZM19 33C19 33.5523 18.5523 34 18 34C17.4477 34 17 33.5523 17 33C17 32.4477 17.4477 32 18 32C18.5523 32 19 32.4477 19 33Z" fill="currentColor" fill-opacity="0.22"></path><circle cx="18" cy="24" r="1" fill="white"></circle><rect x="21.5" y="23.5" width="25" height="9" rx="0.5" fill="currentColor" fill-opacity="0.1" stroke="currentColor"></rect></svg>      </div>
    </div>
  )
}

export default ListItemPlaceholder
