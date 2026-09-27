'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AlertTriangle } from 'lucide-react'
import React from 'react'

/**
 * Empty, error and loading states.
 *
 * A blank screen is a bug, not a state. Every list, grid and panel in the
 * product should render one of these instead of nothing, so the user always
 * knows whether something is loading, broken, or simply not there yet.
 */

/**
 * Empty state. Always offers at least one way forward — an empty state with
 * no action is just a dead end with nicer typography.
 */
export const EmptyState = ({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  secondaryAction?: React.ReactNode
  className?: string
}) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center rounded-card border border-dashed border-border px-6 py-16 text-center',
      className
    )}
  >
    {icon && (
      <span className="mb-5 flex size-11 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground [&_svg]:size-5">
        {icon}
      </span>
    )}

    <h3 className="text-base font-medium tracking-[-0.01em]">{title}</h3>

    {description && (
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    )}

    {(action || secondaryAction) && (
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {action}
        {secondaryAction}
      </div>
    )}
  </div>
)

/**
 * Error state. Says what failed and what to do about it — "Something went
 * wrong" tells the user nothing they didn't already know.
 */
export const ErrorState = ({
  title = 'We couldn’t load this',
  description = 'The request didn’t complete. Try again, or head back and come at it from another route.',
  onRetry,
  backHref,
  backLabel = 'Go back',
  className,
}: {
  title?: string
  description?: string
  onRetry?: () => void
  backHref?: string
  backLabel?: string
  className?: string
}) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center rounded-card border border-border px-6 py-16 text-center',
      className
    )}
    role="alert"
  >
    <span className="mb-5 flex size-11 items-center justify-center rounded-md border border-destructive/20 bg-destructive/10 text-destructive [&_svg]:size-5">
      <AlertTriangle />
    </span>

    <h3 className="text-base font-medium tracking-[-0.01em]">{title}</h3>
    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
      {description}
    </p>

    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
      {onRetry && (
        <Button size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
      {backHref && (
        <Button size="sm" variant="outline" asChild>
          <a href={backHref}>{backLabel}</a>
        </Button>
      )}
    </div>
  </div>
)

/**
 * Shimmer block. Uses a background sweep rather than a pulse, so a grid of
 * them reads as one loading surface instead of many blinking boxes.
 */
export const Shimmer = ({ className }: { className?: string }) => (
  <div
    className={cn('shimmer rounded-sm bg-muted', className)}
    aria-hidden
  />
)

/** Skeleton for a media card grid — projects, funnels, templates. */
export const CardGridSkeleton = ({
  count = 6,
  className,
}: {
  count?: number
  className?: string
}) => (
  <div
    className={cn(
      'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4',
      className
    )}
    aria-busy
    aria-live="polite"
    aria-label="Loading"
  >
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="overflow-hidden rounded-card border border-border">
        <Shimmer className="aspect-[16/10] rounded-none" />
        <div className="flex flex-col gap-2 p-4">
          <Shimmer className="h-4 w-1/2" />
          <Shimmer className="h-3 w-1/3" />
        </div>
      </div>
    ))}
  </div>
)

/** Skeleton for a data table. */
export const TableSkeleton = ({ rows = 6 }: { rows?: number }) => (
  <div
    className="flex flex-col divide-y divide-border rounded-card border border-border"
    aria-busy
    aria-live="polite"
    aria-label="Loading"
  >
    {Array.from({ length: rows }, (_, i) => (
      <div key={i} className="flex items-center gap-4 px-4 py-3.5">
        <Shimmer className="size-8 rounded-full" />
        <Shimmer className="h-3.5 flex-1" />
        <Shimmer className="hidden h-3.5 w-28 sm:block" />
        <Shimmer className="hidden h-3.5 w-20 md:block" />
      </div>
    ))}
  </div>
)
