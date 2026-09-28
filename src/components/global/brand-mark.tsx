import { cn } from '@/lib/utils'
import React from 'react'

/**
 * The Arobix mark — a six-point asterisk, drawn rather than imported.
 *
 * Kept as a vector so it stays crisp at every size and inherits `currentColor`
 * in both themes. The marketing nav, the auth screens and the app sidebar all
 * render this, so the mark only has to change in one place.
 */
export const BrandMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={cn('size-5', className)} aria-hidden>
    <path
      d="M12 1.6v20.8M3 6.8l18 10.4M21 6.8 3 17.2"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
)

/**
 * Mark plus wordmark. `tone` picks the accent used for the mark: `brand`
 * for the light surfaces, `inherit` when it sits on an inverted panel.
 */
export const BrandLockup = ({
  className,
  markClassName,
  tone = 'brand',
}: {
  className?: string
  markClassName?: string
  tone?: 'brand' | 'inherit'
}) => (
  <span className={cn('inline-flex items-center gap-2', className)}>
    <BrandMark
      className={cn(
        'size-[18px]',
        tone === 'brand' && 'text-[#c2352f]',
        markClassName
      )}
    />
    <span className="font-display text-[19px] font-medium tracking-[-0.045em]">
      arobix
    </span>
  </span>
)

export default BrandMark
