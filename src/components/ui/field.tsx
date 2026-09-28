'use client'

import { cn } from '@/lib/utils'
import { AlertCircle } from 'lucide-react'
import * as React from 'react'

/**
 * Form field wrapper: label, required marker, helper text and error message,
 * wired together with the right aria attributes.
 *
 * The control is passed as a render prop so the generated ids can reach it —
 * that is what makes the label clickable and lets a screen reader announce
 * the helper text and the error alongside the input.
 *
 * Helper text and the error occupy the same row: the error replaces the
 * helper rather than stacking under it, so a form never reflows on validation.
 */
export const Field = ({
  label,
  helper,
  error,
  required,
  className,
  children,
}: {
  label?: React.ReactNode
  helper?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  className?: string
  children: (props: {
    id: string
    'aria-describedby'?: string
    'aria-invalid'?: boolean
    invalid?: boolean
  }) => React.ReactNode
}) => {
  const id = React.useId()
  const helperId = `${id}-helper`
  const errorId = `${id}-error`
  const describedBy = error ? errorId : helper ? helperId : undefined

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none text-foreground"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-destructive" aria-hidden>
              *
            </span>
          )}
          {required && <span className="sr-only"> (required)</span>}
        </label>
      )}

      {children({
        id,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : undefined,
        invalid: !!error,
      })}

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="flex items-start gap-1.5 text-[13px] leading-snug text-destructive"
        >
          <AlertCircle className="mt-px size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : helper ? (
        <p
          id={helperId}
          className="text-[13px] leading-snug text-muted-foreground"
        >
          {helper}
        </p>
      ) : null}
    </div>
  )
}

export default Field
