import { EditorBtns } from '@/lib/constants'
import { Youtube } from 'lucide-react'
import React from 'react'

type Props = {}

const VideoPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'video')}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
       <div className=' '>
       <svg data-wf-icon="AddPanelVideoUrl64Icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M26.7773 23.4525C26.4451 23.2309 26 23.4691 26 23.8685V40.1315C26 40.5308 26.4451 40.769 26.7774 40.5475L38.9746 32.416C39.2714 32.2181 39.2714 31.7819 38.9746 31.5839L26.7773 23.4525ZM25 23.8685C25 22.6704 26.3352 21.9559 27.332 22.6204L39.5293 30.7519C40.4199 31.3456 40.4199 32.6543 39.5293 33.248L27.3321 41.3795C26.3352 42.0441 25 41.3295 25 40.1315V23.8685Z" fill="currentColor"></path></svg>      </div>
    </div>
  )
}

export default VideoPlaceholder
