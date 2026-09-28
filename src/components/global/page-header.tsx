import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  title: string
  description?: string
  /** Right-aligned actions, e.g. a primary button. */
  actions?: React.ReactNode
  className?: string
}

/**
 * Standard heading block for every authenticated page. Keeps title size,
 * spacing and the hairline under the header consistent across the app.
 */
const PageHeader = ({ title, description, actions, className }: Props) => (
  <div
    className={cn(
      'mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between',
      className
    )}
  >
    <div className="min-w-0">
      {/* Fraunces, as on the marketing site. The product runs it smaller and
          tighter than the landing page so it reads as a workspace heading
          rather than a hero. */}
      <h1 className="font-display text-[28px] font-normal leading-[1.1] tracking-[-0.04em] md:text-[32px]">
        {title}
      </h1>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
    {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
  </div>
)

export default PageHeader
