'use client'

import { cn } from '@/lib/utils'
import { motion, useReducedMotion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { FACES } from './images'
import { Photo } from './photo'
import { CountUp, EASE, Eyebrow, MaskLines, Rise } from './shared'

/**
 * Client voices — measured at 1440px:
 *   header  580 wide, centred on the page
 *   cards   three 360x557 cards on a 1100px row, fanned at -9 / 0 / +5
 *           degrees so they read as a hand of photographs
 *   card    white 4px frame, 24px radius, over a #000 inner at 20px with
 *           40px padding: a circular portrait, then a Fraunces 24/28 quote,
 *           then name (Inter 16/500) and role (Inter 14 at 64% white)
 *   hover   the circular portrait unmasks to fill the card
 *   stats   three centred counters, Fraunces 48/52 with a 32px unit
 */

const QUOTES = [
  {
    quote: 'Arobix turned our brand and website into one system we can actually ship from.',
    name: 'Daniel Carter',
    role: 'Founder & CEO, NovaTech',
    rotate: -9,
    lift: 32,
  },
  {
    quote: 'The editor and the component library lifted our whole product experience.',
    name: 'Maya Lindqvist',
    role: 'Product Director, Lumina Labs',
    rotate: 0,
    lift: 0,
  },
  {
    quote: 'Arobix helped us clarify the brand and launch with real confidence.',
    name: 'Marcus Rivera',
    role: 'Head of Marketing, Horizon Collective',
    rotate: 5,
    lift: 30,
  },
]

/** True once the viewport is wide enough for the cards to sit in a row. */
const useIsDesktop = () => {
  const [is, setIs] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const on = () => setIs(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return is
}

const STATS = [
  { to: 86, unit: '+', label: 'Templates Shipped' },
  { to: 99, unit: '%', label: 'Uptime Delivered' },
  { to: 24, unit: '+', label: 'Integrations Live' },
]

const Card = ({
  q,
  index,
  fan,
}: {
  q: (typeof QUOTES)[number]
  index: number
  /** The cards only fan out once they sit side by side. */
  fan: boolean
}) => {
  const reduce = useReducedMotion()
  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: fan ? q.rotate : 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 1, delay: index * 0.1, ease: EASE }}
      whileHover={reduce ? undefined : { rotate: 0, y: -10 }}
      style={{ marginTop: fan ? q.lift : 0 }}
      className="group w-full max-w-[360px] shrink-0 rounded-[24px] bg-white p-1 lg:w-auto lg:flex-1 lg:shrink"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[20px] bg-black p-10">
        {/* Portrait: circular at rest, unmasking to fill the card on hover. */}
        <div className="relative">
          <div className="aspect-square w-full overflow-hidden rounded-full transition-[border-radius] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rounded-[12px]">
            <div className="relative size-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
              <Photo
                file={FACES[q.name]}
                w={560}
                h={560}
                crop="faces"
                alt={q.name}
                sizes="280px"
              />
            </div>
          </div>
        </div>

        <figcaption className="pt-6">
          <blockquote className="ori-display text-2xl leading-7 text-white [letter-spacing:-0.04em]">
            &ldquo;{q.quote}&rdquo;
          </blockquote>
          <div className="mt-5">
            <p className="text-base font-medium leading-6 tracking-[-0.02em] text-white">
              {q.name}
            </p>
            <p className="ori-sm mt-0.5 text-white/60">{q.role}</p>
          </div>
        </figcaption>
      </div>
    </motion.figure>
  )
}

const Testimonials = () => {
  const fan = useIsDesktop()

  return (
  <section id="testimonials" className="ori-container py-16 md:py-20">
    <div className="mx-auto max-w-[580px] text-center">
      <Rise className="flex justify-center">
        <Eyebrow>Client voices</Eyebrow>
      </Rise>
      <MaskLines
        as="h2"
        lines={['Where ambitious brands', 'build their digital future']}
        className="ori-h2 mt-7 text-[#141414]"
      />
    </div>

    {/* The fan. Rotations are dropped below md, where the cards stack. */}
    <div className="mt-12 flex flex-col items-center gap-6 md:mt-[112px] lg:flex-row lg:items-start lg:justify-center lg:gap-2.5">
      {QUOTES.map((q, i) => (
        <Card key={q.name} q={q} index={i} fan={fan} />
      ))}
    </div>

    <div className="mt-16 grid grid-cols-1 gap-10 text-center sm:grid-cols-3 md:mt-[100px]">
      {STATS.map((s, i) => (
        <Rise key={s.label} delay={i * 0.08}>
          <p className="flex items-start justify-center">
            <span className="ori-display text-[48px] leading-[52px] text-[#141414]">
              <CountUp to={s.to} />
            </span>
            <span className="ori-display mt-1.5 text-[32px] leading-9 text-[#141414]">
              {s.unit}
            </span>
          </p>
          <p className="ori-body mt-2 text-[#656565]">{s.label}</p>
        </Rise>
      ))}
    </div>
  </section>
  )
}

export default Testimonials
