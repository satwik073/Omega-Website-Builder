import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * The one button in the product.
 *
 * Two registers share a single scale: the marketing page is pill-shaped and
 * roomy, the app is tighter and denser so toolbars and tables don't feel like
 * landing pages. `shape="pill"` opts a button back into the marketing look.
 *
 * Every variant covers default / hover / active / focus / disabled / loading.
 * Focus uses `focus-visible` only, so pointer users never see a ring.
 */
const buttonVariants = cva(
  [
    'relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap',
    'text-sm font-medium tracking-[-0.01em]',
    'transition-[background-color,color,border-color,box-shadow,opacity]',
    'duration-fast ease-standard',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-40',
    '[&_svg]:size-4 [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        /** High emphasis. Near-black on light, near-white on dark. */
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 active:bg-primary',
        /** Standard emphasis — a bordered surface. */
        secondary:
          'border border-border bg-secondary text-secondary-foreground hover:bg-accent active:bg-accent',
        outline:
          'border border-border bg-background text-foreground hover:bg-muted hover:border-muted-foreground/30 active:bg-accent',
        /** Low emphasis — toolbars, table rows, menus. */
        ghost: 'text-foreground hover:bg-muted active:bg-accent',
        destructive:
          'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 active:bg-destructive',
        /** Destructive but low emphasis, for menus and row actions. */
        'destructive-ghost':
          'text-destructive hover:bg-destructive/10 active:bg-destructive/15',
        link: 'text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground',
        brand: 'bg-brand text-brand-foreground shadow-xs hover:bg-brand/90',
      },
      size: {
        /** Dense toolbars and inline row actions. */
        xs: 'h-control-xs gap-1.5 px-2.5 text-[13px] [&_svg]:size-3.5',
        sm: 'h-control-sm px-3 text-[13px]',
        default: 'h-control-md px-4',
        lg: 'h-control-lg px-6 text-[15px]',
        /** Square icon-only buttons, one per control height. */
        'icon-xs': 'h-control-xs w-control-xs [&_svg]:size-3.5',
        'icon-sm': 'h-control-sm w-control-sm',
        icon: 'h-control-md w-control-md',
        'icon-lg': 'h-control-lg w-control-lg',
      },
      shape: {
        /** Product default — tight, tool-like. */
        default: 'rounded-sm',
        /** Marketing register — matches the site's pill controls. */
        pill: 'rounded-pill',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /**
   * Shows a spinner and blocks interaction. The label stays in the DOM but
   * is hidden, so the button keeps its width and the row doesn't reflow.
   */
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    // `asChild` renders someone else's element, which must receive exactly one
    // child — so the loading affordance only applies to real buttons.
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, shape, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && (
          <Loader2
            className="absolute animate-spin motion-reduce:animate-none"
            aria-hidden
          />
        )}
        <span
          className={cn(
            'inline-flex items-center gap-2',
            loading && 'invisible'
          )}
        >
          {children}
        </span>
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
