'use client'

import React from 'react'
import { Eyebrow, MaskLines, Rise } from './shared'

/**
 * Process — measured at 1440px: heading block 520 wide at the left gutter,
 * then three 400px columns on a 48px gutter (72 / 520 / 968), each opening
 * with a 36px icon tile, a 40/44 title and a 16/24 body capped at 320px.
 */

const STEPS = [
  {
    title: 'Choose',
    body: 'Start from a template or an empty canvas. Every block is editable from the first click, and nothing is locked behind a theme you have to fight.',
    tile: 'from-[#f0a868] to-[#c2703a]',
    glyph: (
      <path
        d="M5 7h14M5 12h14M5 17h9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    ),
  },
  {
    title: 'Build',
    body: 'Drag sections into place, wire up content and commerce, and watch the page update live as you work — on every breakpoint at once.',
    tile: 'from-[#8b9ce8] to-[#4a5fc4]',
    glyph: (
      <path
        d="M4 5h7v7H4zM13 5h7v4h-7zM13 11h7v8h-7zM4 14h7v5H4z"
        fill="currentColor"
      />
    ),
  },
  {
    title: 'Publish',
    body: 'Connect a domain and ship. Arobix provisions SSL, optimises every asset and serves the finished site from the edge by default.',
    tile: 'from-[#8fc98f] to-[#3f7a4a]',
    glyph: (
      <path
        d="M12 3v13m0-13 5 5m-5-5-5 5M4 19h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
]

const Process = () => (
  <section id="process" className="ori-container py-16 md:py-20">
    <Rise>
      <Eyebrow>How we work</Eyebrow>
    </Rise>

    <MaskLines
      as="h2"
      lines={['From blank canvas to', 'a live site in 3 steps']}
      className="ori-h2 mt-7 max-w-[520px] text-[#141414]"
    />

    <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-12 lg:mt-[126px] lg:gap-[48px]">
      {STEPS.map((s, i) => (
        <Rise key={s.title} delay={0.08 * i}>
          <span
            className={`inline-flex size-9 items-center justify-center rounded-[10px] bg-gradient-to-br ${s.tile} text-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.35)]`}
          >
            <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
              {s.glyph}
            </svg>
          </span>

          <h3 className="ori-h4 mt-[38px] text-[#141414]">{s.title}</h3>
          <p className="ori-body mt-3 max-w-[320px] text-[#656565]">{s.body}</p>
        </Rise>
      ))}
    </div>
  </section>
)

export default Process
