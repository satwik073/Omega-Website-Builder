'use client'
import { Badge } from '@/components/ui/badge'
import { EditorBtns } from '@/lib/constants'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React from 'react'

type Props = { element: EditorElement }

const ButtonElement = ({ element }: Props) => {
  const { dispatch, state } = useEditor()
  const styles = element.styles

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, 'button')}
      onClick={handleOnClickBody}
      className={clsx(
        'p-[2px] w-full m-[5px] relative transition-all',
        {
          '!border-blue-500': state.editor.selectedElement.id === element.id,
          '!border-solid': state.editor.selectedElement.id === element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
          {state.editor.selectedElement.name}
        </Badge>
      )}
      <button
        className="border px-3 py-1 bg-primary text-white"
        contentEditable={false}
      >
        {!Array.isArray(element.content) ? element.content.innerText : 'Button'}
      </button>
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
          <Trash className="cursor-pointer" size={16} onClick={handleDeleteElement} />
        </div>
      )}
    </div>
  )
}

export default ButtonElement
