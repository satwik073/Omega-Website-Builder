import { EditorBtns } from '@/lib/constants'
import { Youtube } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

const FileUploadPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'fileUpload')}
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
       <svg data-wf-icon="AddPanelFormFileUpload64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M26 27C26 23.6863 28.6863 21 32 21C35.3137 21 38 23.6863 38 27C38 27.1556 37.9941 27.3097 37.9825 27.4621L37.9415 28.0009L38.4818 28L38.5 28H38.5005C41.5378 28.0002 44 30.4626 44 33.5C44 36.5376 41.5376 39 38.5 39H37V40H38.5C42.0899 40 45 37.0899 45 33.5C45 30.0784 42.3562 27.2742 39 27.0189L39 27C39 23.134 35.866 20 32 20C28.134 20 25 23.134 25 27C25 27.0255 25.0001 27.051 25.0004 27.0764C21.8849 27.5575 19.5 30.25 19.5 33.5C19.5 37.0899 22.4101 40 26 40H27V39H26C22.9624 39 20.5 36.5376 20.5 33.5C20.5 30.6107 22.7283 28.2413 25.5598 28.0173L26.0582 27.9779L26.0189 27.4795C26.0064 27.3214 26 27.1615 26 27ZM31.5 32.2071L27.8536 35.8536L27.1464 35.1464L31.6464 30.6464L32 30.2929L32.3536 30.6464L36.8536 35.1464L36.1464 35.8536L32.5 32.2071V44H31.5V32.2071Z" fill="currentColor"></path></svg>
      </div>
    </div>
  )
}

export default FileUploadPlaceholder
