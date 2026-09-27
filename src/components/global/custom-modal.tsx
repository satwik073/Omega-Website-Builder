'use client'
import { useModal } from '@/providers/modal-provider'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'

type Props = {
  title: string
  subheading: string
  children: React.ReactNode
  defaultOpen?: boolean
}

const CustomModal = ({ children, defaultOpen, subheading, title }: Props) => {
  const { isOpen, setClose } = useModal()
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto bg-background p-0 sm:max-w-lg">
        <DialogHeader className="border-b border-border px-6 py-5 text-left">
          <DialogTitle className="text-lg font-semibold tracking-[-0.02em]">
            {title}
          </DialogTitle>
          {subheading && (
            <DialogDescription className="text-sm text-muted-foreground">
              {subheading}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Body sits outside the header — a form nested in DialogHeader
            inherits its centred mobile styles and reads as a heading. */}
        <div className="px-6 py-6">{children}</div>
      </DialogContent>
    </Dialog>
  )
}

export default CustomModal
