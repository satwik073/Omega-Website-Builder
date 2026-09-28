'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { ClientLogo } from './art'
import { Eyebrow, MaskLines, Rise } from './shared'

/**
 * Clients — heading top-left, three full-bleed logo marquees behind it.
 * Measured: rows sit at a 159px pitch, logos are 40px tall with ~150px
 * gaps, and each row runs at its own speed and phase so the grid never
 * lines up into columns. Row one shares its band with the heading, so it
 * carries a longer left fade.
 */

const ROWS: { name: string; mark: number }[][] = [
  [
    { name: 'Shutterframe', mark: 0 },
    { name: 'Convergence', mark: 1 },
    { name: 'Layers', mark: 2 },
    { name: 'Northwind', mark: 3 },
  ],
  [
    { name: 'Ikigai Labs', mark: 4 },
    { name: 'CoreOS', mark: 5 },
    { name: 'Meridian', mark: 1 },
    { name: 'Halcyon', mark: 0 },
  ],
  [
    { name: 'Parallel', mark: 2 },
    { name: 'Vantage', mark: 3 },
    { name: 'Quarry', mark: 5 },
    { name: 'Signal', mark: 4 },
  ],
]

const Row = ({
  items,
  duration,
  reverse,
  fade,
}: {
  items: { name: string; mark: number }[]
  duration: number
  reverse?: boolean
  /** Extra left fade, used by the row that shares a band with the heading. */
  fade: 'edges' | 'heading'
}) => (
  <div
    className="relative flex h-10 overflow-hidden"
    style={{
      maskImage:
        fade === 'heading'
          ? 'linear-gradient(90deg, transparent 0%, transparent 34%, #000 46%, #000 92%, transparent 100%)'
          : 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
      WebkitMaskImage:
        fade === 'heading'
          ? 'linear-gradient(90deg, transparent 0%, transparent 34%, #000 46%, #000 92%, transparent 100%)'
          : 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
    }}
  >
    {/* Two identical tracks so the loop is seamless at any width. */}
    {[0, 1].map((copy) => (
      <div
        key={copy}
        aria-hidden={copy === 1}
        className={cn(
          'flex shrink-0 items-center gap-[150px] pr-[150px]',
          reverse ? 'animate-[marquee-rev_linear_infinite]' : 'animate-[marquee-fwd_linear_infinite]'
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {items.map((c) => (
          <ClientLogo key={`${copy}-${c.name}`} name={c.name} mark={c.mark} />
        ))}
      </div>
    ))}
  </div>
)

const Clients = () => (
  <section className="ori-container relative py-16 md:pb-[131px] md:pt-[86px]" id="clients">
    <div className="relative">
      <Rise>
        <Eyebrow>Our clients</Eyebrow>
      </Rise>

      {/* Rows are absolutely placed on desktop so the first one shares its
          band with the heading, so the wrapper reserves their height itself. */}
      <div className="relative mt-6 md:mt-[38px] md:min-h-[366px]">
        <MaskLines
          as="h2"
          lines={['Trusted by teams', 'shipping bold work']}
          className="ori-h2 relative z-10 max-w-[520px] text-[#141414]"
        />

        <div className="pointer-events-none mt-10 flex flex-col gap-[119px] md:absolute md:inset-x-0 md:top-2 md:z-0 md:mt-0">
          <Row items={ROWS[0]} duration={42} fade="heading" />
          <Row items={ROWS[1]} duration={54} reverse fade="edges" />
          <Row items={ROWS[2]} duration={48} fade="edges" />
        </div>
      </div>
    </div>
  </section>
)

export default Clients
