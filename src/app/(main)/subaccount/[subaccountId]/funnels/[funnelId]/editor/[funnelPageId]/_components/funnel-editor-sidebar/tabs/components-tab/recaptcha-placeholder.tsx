import { EditorBtns } from '@/lib/constants'
import { Youtube } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

const CaptchaPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'list')}
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
       <svg data-wf-icon="AddPanelFormRecaptcha64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 40.4848L24.236 38.2488C26.0786 40.4848 28.8419 41.932 31.9999 41.932C35.2227 41.932 38.1178 40.4171 39.8935 37.9845L36.2096 34.2336C35.8804 34.8905 34.0137 36.8643 31.9343 36.8643C29.8528 36.8643 28.71 35.7456 27.9213 34.5613L30.4864 31.9976C27.1966 31.9321 23.5127 31.9321 22 31.9976V40.4826V40.4848Z" fill="currentColor"></path><path opacity="0.6" d="M31.9337 22H23.4458L25.6818 24.236C23.5784 25.882 22.263 28.3146 22.0649 31.0786H27.196C27.4596 29.7632 28.3147 28.6445 29.3664 27.9868L31.933 30.5534C31.9985 27.198 31.9985 23.5142 31.933 22.0015L31.9337 22Z" fill="currentColor"></path><path opacity="0.3" d="M41.9996 31.9329V23.4479L39.7614 25.6839C38.1176 23.579 35.5517 22.3285 32.854 22.0656V27.1966C34.2356 27.3932 35.4199 28.3153 36.1431 29.367L33.575 31.9329H41.9996Z" fill="currentColor"></path></svg>
      </div>
    </div>
  )
}

export default CaptchaPlaceholder
