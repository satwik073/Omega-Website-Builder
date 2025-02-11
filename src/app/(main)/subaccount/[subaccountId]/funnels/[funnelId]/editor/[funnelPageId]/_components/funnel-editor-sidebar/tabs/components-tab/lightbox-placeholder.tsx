import { EditorBtns } from '@/lib/constants'
import { Youtube } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

const LightboxPlaceholder = (props: Props) => {
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
       <svg data-wf-icon="AddPanelLightbox64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="12" width="40" height="26" rx="0.5" fill="currentColor" fill-opacity="0.1"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M27.75 41C26.6454 41 25.75 41.8954 25.75 43V52C25.75 53.1046 26.6454 54 27.75 54H36.25C37.3546 54 38.25 53.1046 38.25 52V43C38.25 41.8954 37.3546 41 36.25 41H27.75ZM26.75 43C26.75 42.4477 27.1977 42 27.75 42H36.25C36.8023 42 37.25 42.4477 37.25 43V52C37.25 52.5523 36.8023 53 36.25 53H27.75C27.1977 53 26.75 52.5523 26.75 52V43ZM42.5 41C41.3954 41 40.5 41.8954 40.5 43V52C40.5 53.1046 41.3954 54 42.5 54H51C52.1046 54 53 53.1046 53 52V43C53 41.8954 52.1046 41 51 41H42.5ZM41.5 43C41.5 42.4477 41.9477 42 42.5 42H51C51.5523 42 52 42.4477 52 43V52C52 52.5523 51.5523 53 51 53H42.5C41.9477 53 41.5 52.5523 41.5 52V43Z" fill="currentColor" fill-opacity="0.22"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 11C11.6716 11 11 11.6716 11 12.5V37.5C11 38.3284 11.6716 39 12.5 39H51.5C52.3284 39 53 38.3284 53 37.5V12.5C53 11.6716 52.3284 11 51.5 11H12.5ZM12 12.5C12 12.2239 12.2239 12 12.5 12H51.5C51.7761 12 52 12.2239 52 12.5V37.2806L37.8595 22.6525L37.5002 22.2808L37.1407 22.6523L22.2881 38H12.5C12.2239 38 12 37.7761 12 37.5V12.5ZM23.6797 38H51.3046L37.4998 23.7192L23.6797 38ZM24 20C24 21.1046 23.1046 22 22 22C20.8954 22 20 21.1046 20 20C20 18.8954 20.8954 18 22 18C23.1046 18 24 18.8954 24 20ZM12.5 41C11.6716 41 11 41.6716 11 42.5V52.5C11 53.3284 11.6716 54 12.5 54H22C22.8284 54 23.5 53.3284 23.5 52.5V42.5C23.5 41.6716 22.8284 41 22 41H12.5ZM12 42.5C12 42.2239 12.2239 42 12.5 42H22C22.2761 42 22.5 42.2239 22.5 42.5V52.5C22.5 52.7761 22.2761 53 22 53H12.5C12.2239 53 12 52.7761 12 52.5V42.5Z" fill="currentColor"></path></svg></div>
    </div>
  )
}

export default LightboxPlaceholder
