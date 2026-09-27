import { cn } from '@/lib/utils'
import React from 'react'

/**
 * Brand spinner.
 *
 * Previously MUI's `CircularProgress`, which rendered in MUI's default blue —
 * the one saturated colour in an otherwise monochrome product — and pulled
 * the MUI bundle in for a single glyph. This inherits `currentColor`, so it
 * matches whatever it sits inside (buttons, forms, panels).
 */
const Loading = ({
  size = 20,
  className,
  label = 'Loading',
}: {
  size?: number
  className?: string
  label?: string
}) => (
  <span role="status" aria-live="polite" className={cn('inline-flex', className)}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin motion-reduce:animate-none"
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="2.5"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
    <span className="sr-only">{label}</span>
  </span>
)

export default Loading
