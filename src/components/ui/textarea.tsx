import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
}

/** Multi-line input. Matches Input's border, focus and error treatment. */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <textarea
        aria-invalid={invalid || undefined}
        className={cn(
          'flex min-h-[92px] w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground',
          'transition-[border-color,box-shadow] duration-fast ease-standard',
          'placeholder:text-muted-foreground/60',
          'hover:border-muted-foreground/40',
          'focus-visible:border-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground',
          'disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60',
          'aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:border-destructive aria-[invalid=true]:focus-visible:ring-destructive',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
