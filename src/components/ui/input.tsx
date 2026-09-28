import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Renders the error treatment. Pair with <Field error="..."> for the message. */
  invalid?: boolean
}

/**
 * Text input, product register.
 *
 * Pill-shaped inputs read as marketing; a tighter radius reads as a form you
 * are meant to fill in. Focus is a 1px ring plus a border swap rather than a
 * glow, so dense forms don't shimmer as you tab through them.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, invalid, ...props }, ref) => {
    return (
      <input
        type={type}
        aria-invalid={invalid || undefined}
        className={cn(
          'flex h-control-md w-full rounded-sm border border-input bg-background px-3 py-2 text-sm text-foreground',
          'transition-[border-color,box-shadow] duration-fast ease-standard',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
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
Input.displayName = 'Input'

export { Input }
