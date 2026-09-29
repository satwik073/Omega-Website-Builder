'use client'

import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import { AlertCircle } from 'lucide-react'
import * as React from 'react'
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form'

import Loading from '@/components/global/loading'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Form primitives.
 *
 * Every form in the product composes from these, so field rhythm, error
 * treatment and footer layout only have to be right once. The rules that
 * matter:
 *
 * - Helper text and the error share one row. The error *replaces* the helper
 *   instead of stacking beneath it, so validating a field never reflows the
 *   rest of the form.
 * - Labels carry the required marker, so a form communicates what is optional
 *   before submission rather than after it.
 * - Submit buttons keep their label while busy and show the spinner beside it,
 *   so the button never changes width mid-click.
 */

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

type FormItemContextValue = {
  id: string
  /** Set by FormDescription so FormMessage knows whether it is replacing helper text. */
  hasDescription: boolean
  setHasDescription: (value: boolean) => void
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const fieldState = getFieldState(fieldContext.name, formState)
  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()
  const [hasDescription, setHasDescription] = React.useState(false)

  return (
    <FormItemContext.Provider value={{ id, hasDescription, setHasDescription }}>
      <div
        ref={ref}
        className={cn('flex min-w-0 flex-col gap-1.5', className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    /** Adds the required marker and the screen-reader equivalent. */
    required?: boolean
    /** Right-aligned affordance, e.g. a "Forgot password?" link. */
    aside?: React.ReactNode
  }
>(({ className, children, required, aside, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <div className="flex items-baseline justify-between gap-3">
      <LabelPrimitive.Root
        ref={ref}
        htmlFor={formItemId}
        className={cn(
          'text-[13px] font-medium leading-none text-foreground',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-60',
          error && 'text-destructive',
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <>
            <span className="ml-0.5 text-destructive" aria-hidden>
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </LabelPrimitive.Root>
      {aside}
    </div>
  )
})
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={error ? formMessageId : formDescriptionId}
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = 'FormControl'

/**
 * Helper text. Hidden once the field has an error — FormMessage takes the row
 * so the form keeps its height.
 */
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId, error } = useFormField()
  const { setHasDescription } = React.useContext(FormItemContext)

  React.useEffect(() => {
    setHasDescription(true)
    return () => setHasDescription(false)
  }, [setHasDescription])

  if (error) return null

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn(
        'text-[12.5px] leading-snug text-muted-foreground',
        className
      )}
      {...props}
    />
  )
})
FormDescription.displayName = 'FormDescription'

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) return null

  return (
    <p
      ref={ref}
      id={formMessageId}
      role="alert"
      className={cn(
        'flex items-start gap-1.5 text-[12.5px] leading-snug text-destructive',
        className
      )}
      {...props}
    >
      <AlertCircle className="mt-px size-3.5 shrink-0" aria-hidden />
      <span className="min-w-0">{body}</span>
    </p>
  )
})
FormMessage.displayName = 'FormMessage'

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

/**
 * Vertical field rhythm. One consistent gap between fields everywhere, rather
 * than each form picking its own `gap-4`/`gap-6`/`space-y-8`.
 */
const FormBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-5', className)} {...props} />
))
FormBody.displayName = 'FormBody'

/**
 * Side-by-side fields that collapse on narrow viewports — first/last name,
 * city/state, and so on.
 */
const FormRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { cols?: 2 | 3 }
>(({ className, cols = 2, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'grid grid-cols-1 gap-4',
      cols === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3',
      className
    )}
    {...props}
  />
))
FormRow.displayName = 'FormRow'

/**
 * Action bar. Separated by a rule and right-aligned on desktop; on mobile the
 * buttons go full-width and the primary action sits on top, where a thumb
 * reaches it first.
 */
const FormFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { align?: 'end' | 'between' }
>(({ className, align = 'end', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'mt-1 flex flex-col-reverse gap-2 border-t border-border pt-5',
      'sm:flex-row sm:items-center',
      align === 'end' ? 'sm:justify-end' : 'sm:justify-between',
      '[&>button]:w-full sm:[&>button]:w-auto',
      className
    )}
    {...props}
  />
))
FormFooter.displayName = 'FormFooter'

/**
 * Submit button.
 *
 * Reads `isSubmitting` from form context, so a form cannot forget to disable
 * itself. The label stays visible while busy and the spinner appears beside
 * it — swapping label for spinner makes the button resize under the cursor.
 */
const SubmitButton = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'type'> & {
    /** Shown in place of children while submitting, e.g. "Saving…". */
    pendingText?: string
  }
>(({ children, pendingText, disabled, className, ...props }, ref) => {
  const { formState } = useFormContext()
  const busy = formState.isSubmitting

  return (
    <Button
      ref={ref}
      type="submit"
      disabled={disabled || busy}
      aria-busy={busy || undefined}
      className={cn('gap-2', className)}
      {...props}
    >
      {busy && <Loading size={16} label="" />}
      {busy && pendingText ? pendingText : children}
    </Button>
  )
})
SubmitButton.displayName = 'SubmitButton'

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormBody,
  FormRow,
  FormFooter,
  SubmitButton,
}
