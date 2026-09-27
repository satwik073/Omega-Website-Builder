'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { EASE, Eyebrow, MaskLines, Rise } from './shared'

/**
 * FAQ — measured at 1440px: a two-column split with the 520px heading at the
 * left gutter and a 634px accordion at x=726, inset 44px from the top. Rows
 * are 72px tall with 36px side padding and a numeral in the left inset.
 */

const ITEMS = [
  {
    q: 'What exactly is Arobix?',
    a: 'Arobix is a visual website builder. You compose pages on a real canvas, connect a domain, and publish — without writing markup or managing a deploy pipeline.',
  },
  {
    q: 'How long does it take to launch a site?',
    a: 'Most people publish a first site the same day. Starting from a template, a marketing site with a few pages usually takes an afternoon; commerce and CMS setup add a day or two.',
  },
  {
    q: 'Do you work for solo founders or agencies?',
    a: 'Both. Launch is built for a single site, while Scale gives agencies unlimited sub-accounts, team roles and white-label client domains inside one workspace.',
  },
  {
    q: 'Can I edit the design system, or only the pages?',
    a: 'Both. Type, spacing and colour live as tokens that every component inherits, so changing the system updates every page that uses it.',
  },
  {
    q: 'Can Arobix rebuild an existing brand or website?',
    a: 'Yes. You can rebuild an existing site page by page on the canvas, then point your current domain at Arobix when you are ready to cut over.',
  },
  {
    q: 'What happens after I publish?',
    a: 'Arobix provisions SSL, optimises assets and serves the site from the edge. You keep editing in the same canvas, and changes go live when you republish.',
  },
]

const Row = ({
  item,
  index,
  open,
  onToggle,
}: {
  item: (typeof ITEMS)[number]
  index: number
  open: boolean
  onToggle: () => void
}) => (
  <div className="border-b border-black/[0.08]">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="group flex w-full items-center gap-4 py-4 text-left md:gap-0"
    >
      <span className="ori-meta w-9 shrink-0 text-[#a4a4a4]">{index + 1}</span>

      <span className="flex-1 text-base font-medium leading-6 tracking-[-0.02em] text-[#141414]">
        {item.q}
      </span>

      {/* Chevron rotates into a minus-like horizontal when the row opens. */}
      <span
        className={cn(
          'ml-4 flex size-9 shrink-0 items-center justify-center rounded-full border border-black/[0.1] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          open
            ? 'rotate-180 border-[#141414] bg-[#141414] text-white'
            : 'text-[#141414] group-hover:border-black/30'
        )}
      >
        <svg viewBox="0 0 12 8" className="h-2 w-3" aria-hidden>
          <path
            d="M1 1.5 6 6.5l5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>

    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="overflow-hidden"
        >
          <p className="ori-body max-w-[500px] pb-6 text-[#656565] md:pl-9">
            {item.a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

const Faq = () => {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="ori-container py-16 md:py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-3">
        <div className="lg:col-span-5">
          <Rise>
            <Eyebrow>FAQ</Eyebrow>
          </Rise>
          <MaskLines
            as="h2"
            lines={['Questions?', 'We are here to help']}
            className="ori-h2 mt-7 max-w-[520px] text-[#141414]"
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-11">
          {ITEMS.map((item, i) => (
            <Row
              key={item.q}
              item={item}
              index={i}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq
