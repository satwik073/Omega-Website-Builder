import { cn } from '@/lib/utils'
import React from 'react'

/**
 * Generated marks for the client marquee.
 *
 * Everything else on the page now uses real photography (see ./images.ts).
 * Client logos stay generated, because standing in for a real company's
 * wordmark with a real company's logo would misrepresent them.
 */

/* ------------------------------------------------------------------ */
/* Client logos — the marquee rows                                     */
/* ------------------------------------------------------------------ */

/**
 * A wordmark lockup standing in for a client logo: a generated glyph plus
 * the name. Sized to the reference's 40px logo height.
 */
export const ClientLogo = ({
  name,
  mark,
}: {
  name: string
  /** 0-5, picks one of the generated marks. */
  mark: number
}) => {
  const marks = [
    <circle key="m" cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.4" />,
    <path key="m" d="M4 20 12 4l8 16H4Z" fill="currentColor" />,
    <path
      key="m"
      d="M12 3v18M3 12h18"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
    />,
    <rect key="m" x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="2.4" />,
    <path
      key="m"
      d="M4 12a8 8 0 0 1 16 0 8 8 0 0 1-16 0Zm8-8v16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    />,
    <path key="m" d="M5 19 12 5l7 14-7-4-7 4Z" fill="currentColor" />,
  ]

  return (
    <span className="inline-flex h-10 shrink-0 items-center gap-2.5 text-[#a4a4a4]">
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        {marks[mark % marks.length]}
      </svg>
      <span className="text-[19px] font-medium tracking-[-0.03em] text-current">
        {name}
      </span>
    </span>
  )
}
