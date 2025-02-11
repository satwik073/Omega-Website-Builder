import { EditorBtns } from '@/lib/constants'
import { Youtube } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

const  BackVideoPlaceholder= (props: Props) => {
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
       <svg data-wf-icon="AddPanelBgVideo64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 18C10 15.7909 11.7909 14 14 14H50C52.2091 14 54 15.7909 54 18V46C54 48.2091 52.2091 50 50 50H14C11.7909 50 10 48.2091 10 46V18Z" fill="currentColor" fill-opacity="0.1"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14 15H50C51.6569 15 53 16.3431 53 18V46C53 47.6569 51.6569 49 50 49H14C12.3431 49 11 47.6569 11 46V18C11 16.3431 12.3431 15 14 15ZM10 18C10 15.7909 11.7909 14 14 14H50C52.2091 14 54 15.7909 54 18V46C54 48.2091 52.2091 50 50 50H14C11.7909 50 10 48.2091 10 46V18ZM28.7725 25.0808C28.6188 24.9809 28.4227 24.9731 28.2615 25.0605C28.1004 25.148 28 25.3166 28 25.5V38.5C28 38.6834 28.1004 38.852 28.2615 38.9395C28.4227 39.0269 28.6188 39.0191 28.7725 38.9192L38.7725 32.4192C38.9144 32.327 39 32.1692 39 32C39 31.8308 38.9144 31.673 38.7725 31.5808L28.7725 25.0808ZM29 37.5787V26.4213L37.5826 32L29 37.5787Z" fill="currentColor"></path></svg></div>
    </div>
  )
}

export default BackVideoPlaceholder
