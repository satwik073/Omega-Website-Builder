'use client'

import { cn } from '@/lib/utils'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { SERVICE_ART } from './images'
import { Photo } from './photo'
import { EASE } from './shared'

/**
 * Services — the reference's most distinctive scroll interaction, and the
 * one earlier attempts flattened into ordinary sticky cards.
 *
 * Measured at 1440px, on a 12-column grid:
 *   cols 1-2    sticky rotary dial. An 800px wheel whose centre sits 194px
 *               *left* of the column, so only its right arc is on screen.
 *               The five numerals ride the arc 30 degrees apart and the
 *               whole wheel counter-rotates as you scroll, bringing the
 *               active numeral to the 3 o'clock position.
 *   cols 5-9    540px copy column. Five 900px panels, 90px padding, each
 *               holding a 64/68 title, a 16/24 body and a tag row.
 *   cols 11-12  sticky artwork. Square forms stacked on a common centre
 *               that sits on the container's right edge, so each one bleeds
 *               off the viewport. The active form is 600px, the rest 480px.
 */

type Service = {
  n: string
  title: string
  body: string
  tags: string[]
}

const SERVICES: Service[] = [
  {
    n: '01',
    title: 'Visual Canvas Building',
    body: 'Compose pages on a real canvas — drag, align and nudge every element. What you arrange is exactly what ships.',
    tags: ['Canvas', 'Drag & Drop', 'Live Preview'],
  },
  {
    n: '02',
    title: 'Design Systems & Components',
    body: 'Reusable blocks inherit your type, spacing and colour, so every page stays consistent without anyone policing it.',
    tags: ['Components', 'Tokens', 'Sections'],
  },
  {
    n: '03',
    title: 'Responsive Control',
    body: 'One design that holds from desktop to phone, with per-breakpoint overrides for the moments you actually want them.',
    tags: ['Breakpoints', 'Fluid Type', 'Auto Layout'],
  },
  {
    n: '04',
    title: 'Commerce & Payments',
    body: 'Products, checkout and payouts wired through Stripe Connect, running on your own domain from the first day.',
    tags: ['Checkout', 'Stripe', 'Payouts'],
  },
  {
    n: '05',
    title: 'Publishing & Performance',
    body: 'Ship to a custom domain with SSL provisioned, assets optimised and every page served fast by default.',
    tags: ['Domains', 'SSL', 'Edge Cache'],
  },
]

const LAST = SERVICES.length - 1
/** Degrees between adjacent numerals on the wheel. */
const STEP = 30
/**
 * Wheel radius as a multiple of the dial column's width. At 1440 the column
 * is 206px and the reference wheel is 400px, so the arc grazes the column's
 * right edge. Deriving it from the live column keeps that relationship at
 * every width instead of baking in a 1440-only radius.
 */
const R_RATIO = 400 / 206

/** The rotary dial. `p` is a continuous 0..4 index across the panels. */
const Dial = ({ p, active }: { p: number; active: number }) => {
  const box = useRef<HTMLDivElement>(null)
  const [col, setCol] = useState(206)

  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setCol(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const R = col * R_RATIO
  // Centre the wheel so its 3 o'clock point lands on the column's right edge.
  const cx = -(R - col)

  return (
  <div ref={box} className="pointer-events-none relative h-full w-full">
    {/* The wheel's rim. Its centre sits left of the column, so only the
        right arc crosses the screen. */}
    <div
      className="absolute rounded-full border border-black/[0.09]"
      style={{
        width: R * 2,
        height: R * 2,
        left: cx - R,
        top: '50%',
        marginTop: -R,
      }}
    />

    {SERVICES.map((s, i) => {
      const theta = ((i - p) * STEP * Math.PI) / 180
      const x = cx + R * Math.cos(theta)
      const y = R * Math.sin(theta)
      const isActive = i === active
      // Numerals fade out as they swing away from 3 o'clock.
      const off = Math.abs(i - p)
      return (
        <div
          key={s.n}
          className="absolute left-0 top-1/2 flex items-center gap-2"
          style={{
            transform: `translate(${x}px, ${y}px) translateY(-50%)`,
            opacity: Math.max(0.18, 1 - off * 0.42),
          }}
        >
          <span
            className={cn(
              'size-1.5 rounded-full transition-colors duration-500',
              isActive ? 'bg-[#c2352f]' : 'bg-transparent'
            )}
          />
          <span
            className={cn(
              'ori-h5 tabular-nums transition-colors duration-500',
              isActive ? 'text-[#141414]' : 'text-[#a4a4a4]'
            )}
          >
            {s.n}
          </span>
        </div>
      )
    })}
  </div>
  )
}

/** One stacked artwork, cross-fading and scaling as its panel becomes active. */
const Artwork = ({
  index,
  isActive,
}: {
  index: number
  isActive: boolean
}) => (
  <motion.div
    aria-hidden
    className="absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2"
    animate={{
      opacity: isActive ? 1 : 0,
      scale: isActive ? 1 : 0.8,
      rotate: isActive ? 0 : -14,
    }}
    transition={{ duration: 1, ease: EASE }}
    // 600px at 1440; capped against the viewport so it never dominates a
    // narrower desktop. It is centred on the container's right edge, so it
    // deliberately bleeds off screen exactly as the reference does.
    style={{ width: 'min(600px, 42vw)', height: 'min(600px, 42vw)' }}
  >
    {/* A radial mask feathers the crop into the page, so the render reads as
        a floating object rather than a photo punched into a circle. A very
        slow rotation keeps the form alive while a panel is held. */}
    <motion.div
      className="relative size-full"
      style={{
        maskImage:
          'radial-gradient(circle at 50% 50%, #000 46%, rgba(0,0,0,0.75) 62%, transparent 76%)',
        WebkitMaskImage:
          'radial-gradient(circle at 50% 50%, #000 46%, rgba(0,0,0,0.75) 62%, transparent 76%)',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
    >
      <Photo file={SERVICE_ART[index]} w={1200} h={1200} crop="center" alt="" sizes="600px" />
    </motion.div>
  </motion.div>
)

const Services = () => {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    // The dial should track the panels, not the section's entry and exit,
    // so the range starts when the section pins and ends when it releases.
    offset: ['start start', 'end end'],
  })

  // Continuous 0..LAST index across the panel stack.
  const pIndex = useTransform(scrollYProgress, [0, 1], [0, LAST])
  const [p, setP] = useState(0)
  useMotionValueEvent(pIndex, 'change', (v) => setP(v))
  const active = Math.min(LAST, Math.max(0, Math.round(p)))

  return (
    <section ref={ref} id="services" className="ori-container py-16 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-3">
        {/* Dial — desktop only; the numerals ride a wheel that has no
            sensible small-screen equivalent. */}
        <div className="hidden lg:col-span-2 lg:block">
          <div className="sticky top-0 h-screen overflow-visible">
            <Dial p={reduce ? active : p} active={active} />
          </div>
        </div>

        {/* Copy column */}
        <div className="lg:col-span-5 lg:col-start-5">
          {SERVICES.map((s, i) => (
            <Panel key={s.n} service={s} index={i} />
          ))}
        </div>

        {/* Artwork column */}
        <div className="hidden lg:col-span-2 lg:col-start-11 lg:block">
          <div className="sticky top-0 flex h-screen items-center">
            <div className="relative h-px w-full">
              {SERVICES.map((s, i) => (
                <Artwork key={s.n} index={i} isActive={i === active} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** A single 900px copy panel, vertically centred in its own viewport slice. */
const Panel = ({ service, index }: { service: Service; index: number }) => {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Copy fades at the edges of its slice so only one panel reads at a time.
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.26, 0.74, 1],
    [0, 1, 1, 0]
  )
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40])

  return (
    <div
      ref={ref}
      className="flex min-h-[70vh] flex-col justify-center border-b border-black/[0.07] py-16 lg:min-h-screen lg:border-0 lg:py-[90px]"
    >
      <motion.div style={reduce ? undefined : { opacity, y }}>
        {/* The numeral is repeated inline on small screens, where the dial
            is not rendered. */}
        <span className="ori-meta mb-5 block text-[#a4a4a4] lg:hidden">
          {service.n}
        </span>

        <h3 className="ori-h2-lg max-w-[540px] text-[#141414]">
          {service.title}
        </h3>
        <p className="ori-body mt-4 max-w-[540px] text-[#656565]">
          {service.body}
        </p>

        <ul className="mt-8 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-white px-3 py-1.5 text-sm text-[#141414]"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Small-screen artwork, since the sticky column is hidden there. */}
        <div className="relative mt-10 aspect-square w-40 overflow-hidden rounded-full lg:hidden">
          <Photo file={SERVICE_ART[index]} w={480} h={480} crop="center" alt="" sizes="160px" />
        </div>
      </motion.div>
    </div>
  )
}

export default Services
