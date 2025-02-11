import { EditorBtns } from '@/lib/constants'
import { Link2Icon, TypeIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const AnimationPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'animation')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <div className=' '>
      <svg data-wf-icon="AddPanelLottie64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M49 35C49 37.2091 47.2091 39 45 39C42.7909 39 41 37.2091 41 35C41 32.7909 42.7909 31 45 31C47.2091 31 49 32.7909 49 35Z" fill="currentColor" fill-opacity="0.1"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 23.5C17.6939 23.5 19.8146 25.2915 21.4167 28.4957C23.0039 31.67 24 36.0902 24 41H25C25 37.7471 25.6603 34.8268 26.7046 32.7383C27.7638 30.6199 29.1346 29.5 30.5 29.5C31.8654 29.5 33.2362 30.6199 34.2954 32.7383C35.3397 34.8268 36 37.7471 36 41H37C37 39.4039 37.3245 37.9837 37.8259 36.981C38.3422 35.9483 38.963 35.5 39.5 35.5V34.5C38.3802 34.5 37.5009 35.3948 36.9315 36.5338C36.8427 36.7112 36.7595 36.8981 36.6821 37.0936C36.3765 35.2743 35.8623 33.6359 35.1899 32.2911C34.0775 30.0664 32.4483 28.5 30.5 28.5C28.5517 28.5 26.9225 30.0664 25.8101 32.2911C25.3171 33.2772 24.9091 34.4211 24.606 35.6785C24.1639 32.772 23.368 30.1621 22.3112 28.0485C20.6559 24.738 18.2767 22.5 15.5 22.5V23.5ZM48 35C48 36.6569 46.6569 38 45 38C43.3431 38 42 36.6569 42 35C42 33.3431 43.3431 32 45 32C46.6569 32 48 33.3431 48 35ZM49 35C49 37.2091 47.2091 39 45 39C42.7909 39 41 37.2091 41 35C41 32.7909 42.7909 31 45 31C47.2091 31 49 32.7909 49 35Z" fill="currentColor"></path></svg>      </div>
    </div>
  )
}

export default AnimationPlaceholder
