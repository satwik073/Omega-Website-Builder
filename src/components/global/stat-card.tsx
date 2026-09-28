import { cn } from '@/lib/utils'
import { TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'

type Props = {
  label: string
  value: React.ReactNode
  /** Short qualifier under the value. Keep it to a few words. */
  hint?: string
  /** Signed percentage change against the previous period. */
  delta?: number | null
  deltaLabel?: string
  footer?: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

/**
 * KPI tile.
 *
 * Deliberately dense: label, number, one short qualifier. The earlier version
 * carried a two-line sentence under every value, which turned a row of four
 * metrics into a wall of prose and pushed the numbers apart.
 */
const StatCard = ({
  label,
  value,
  hint,
  delta,
  deltaLabel,
  footer,
  icon,
  className,
}: Props) => {
  const hasDelta = typeof delta === 'number' && Number.isFinite(delta)
  const up = hasDelta && delta! >= 0

  return (
    <div
      className={cn(
        'group flex flex-col rounded-card border border-border bg-card p-5 transition-colors duration-fast hover:border-muted-foreground/25',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">{label}</p>
        {icon && (
          <span className="text-muted-foreground/70 [&_svg]:size-3.5">
            {icon}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-end gap-2.5">
        <p className="font-display text-[30px] font-light leading-none tracking-[-0.035em] tabular-nums">
          {value}
        </p>

        {hasDelta && (
          <span
            className={cn(
              'mb-0.5 inline-flex items-center gap-1 text-[12px] font-medium tabular-nums',
              up ? 'text-success' : 'text-destructive'
            )}
          >
            {up ? (
              <TrendingUp className="size-3.5" />
            ) : (
              <TrendingDown className="size-3.5" />
            )}
            {Math.abs(delta!).toFixed(0)}%
          </span>
        )}
      </div>

      {(hint || deltaLabel) && (
        <p className="mt-1.5 truncate text-[12px] text-muted-foreground">
          {deltaLabel ?? hint}
        </p>
      )}

      {footer && <div className="mt-auto pt-4">{footer}</div>}
    </div>
  )
}

export default StatCard
