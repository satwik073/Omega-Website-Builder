'use client'

import { cn } from '@/lib/utils'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'
import { HERO } from './images'
import { Photo } from './photo'
import { CopyEmail, EASE, LocalClock, usePointerParallax } from './shared'

/**
 * Hero — the reference's first viewport, measured at 1440x900:
 *   panel      inset 8px, 40px radius, height 100vh - 16px (884px)
 *   banner     a single full-bleed image covering the panel, as in the
 *              reference, which sets a 1424x884 render behind everything
 *   headline   two lines of Fraunces 72/76 at -0.0414em, optically centred,
 *              first line 148px below the panel top
 *   line two   carries a text-selection highlight with an editing toolbar
 *              20px below it — a builder affordance, and literally Arobix
 *   footer row 48px from the panel bottom: clock, centred lede, address
 *
 * The banner scales and lifts on scroll and drifts under the pointer, so the
 * image and the copy separate into two planes rather than moving as one.
 */

const Banner = ({
  progress,
}: {
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) => {
  const { ref, x, y } = usePointerParallax(1)
  const reduce = useReducedMotion()

  // Scroll: the banner lifts a little and dims as the hero leaves.
  const bannerY = useTransform(progress, [0, 1], [0, -90])
  const bannerScale = useTransform(progress, [0, 1], [1, 1.12])
  // Pointer: a slow counter-drift, capped so it never exposes an edge.
  const px = useTransform(x, (v) => v * -22)
  const py = useTransform(y, (v) => v * -14)

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -inset-[4%]"
        style={reduce ? undefined : { y: bannerY, scale: bannerScale }}
      >
        <motion.div
          className="relative size-full"
          style={reduce ? undefined : { x: px, y: py }}
        >
          <Photo file={HERO} w={2880} h={1620} alt="" priority sizes="100vw" />
        </motion.div>
      </motion.div>

      {/* Scrim: lifts the centre of the frame so the dark headline holds at
          any crop, without flattening the glass at the edges. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(78% 58% at 50% 26%, rgba(249,248,246,0.92) 0%, rgba(249,248,246,0.62) 42%, rgba(249,248,246,0.10) 72%, rgba(249,248,246,0) 100%)',
        }}
      />
      {/* A second wash along the bottom carries the meta row. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#f9f8f6] via-[#f9f8f6]/85 to-transparent md:h-56 md:via-[#f9f8f6]/70"
      />
    </div>
  )
}

/**
 * The floating editing toolbar under the headline. In the reference this is
 * a decorative nod to a builder UI; for Arobix it is the product, so it
 * keeps the same geometry — 36px tall, centred, 20px below the line.
 */
const EditToolbar = () => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, delay: 1.15, ease: EASE }}
    className="mt-5 inline-flex h-9 items-center gap-1 rounded-lg border border-black/[0.06] bg-white/95 px-1.5 shadow-[0_6px_24px_-8px_rgba(0,0,0,0.25)] backdrop-blur-sm"
  >
    <button
      type="button"
      className="flex h-7 items-center gap-1.5 rounded-[5px] px-2 text-[13px] font-medium text-[#141414] transition-colors hover:bg-black/[0.05]"
    >
      Heading 1
      <svg viewBox="0 0 10 6" className="h-[5px] w-2.5" aria-hidden>
        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </svg>
    </button>
    <span className="mx-0.5 h-4 w-px bg-black/10" />
    {(
      [
        ['B', 'font-bold'],
        ['I', 'italic font-serif'],
        ['U', 'underline'],
      ] as const
    ).map(([g, s]) => (
      <button
        key={g}
        type="button"
        className={cn(
          'flex size-7 items-center justify-center rounded-[5px] text-[13px] text-[#656565] transition-colors hover:bg-black/[0.05] hover:text-[#141414]',
          s
        )}
      >
        {g}
      </button>
    ))}
    <span className="mx-0.5 h-4 w-px bg-black/10" />
    <button
      type="button"
      className="flex h-7 items-center gap-1 rounded-[5px] px-1.5 transition-colors hover:bg-black/[0.05]"
    >
      <span className="text-[13px] font-medium text-[#141414]">A</span>
      <span className="size-[3px] rounded-full bg-[#c2352f]" />
      <svg viewBox="0 0 10 6" className="h-[5px] w-2.5 text-[#656565]" aria-hidden>
        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </svg>
    </button>
  </motion.div>
)

/** One headline line inside a clip, sliding up from below. */
const Line = ({
  children,
  delay,
  className,
}: {
  children: React.ReactNode
  delay: number
  className?: string
}) => {
  const reduce = useReducedMotion()
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className={cn('block', className)}
        initial={reduce ? false : { y: '112%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

const Hero = () => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const reduce = useReducedMotion()
  // Copy drifts up slower than the banner, so the layers separate.
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section ref={ref} id="top" className="px-2 pt-2">
      <div className="relative mx-auto h-[calc(100svh-16px)] min-h-[620px] w-full max-w-[1424px] overflow-hidden rounded-[40px] bg-[#f9f8f6] md:max-h-[884px]">
        <Banner progress={scrollYProgress} />

        <motion.div
          className="relative z-20 mx-auto flex h-full w-full max-w-[1440px] flex-col px-6 md:px-[72px]"
          style={reduce ? undefined : { y: copyY }}
        >
          {/* Headline block — 148px from the panel top at desktop. */}
          <div className="flex flex-1 flex-col items-center pt-[22vh] text-center md:pt-[148px]">
            <h1 className="ori-h1 text-[#141414] [letter-spacing:-0.0414em]">
              <Line delay={0.25}>You make</Line>
              {/* The selection highlight is part of the composition: the
                  second line reads as live, editable text on a canvas. */}
              <Line delay={0.37}>
                <span className="relative inline-block">
                  <motion.span
                    aria-hidden
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.75, delay: 0.95, ease: EASE }}
                    className="absolute -inset-x-2.5 -inset-y-1 origin-left rounded-md bg-[#141414]/[0.09]"
                  />
                  <span className="relative">Bold Websites.</span>
                </span>
              </Line>
            </h1>

            <EditToolbar />
          </div>

          {/* Footer row — clock, centred lede, address. */}
          <div className="grid shrink-0 grid-cols-1 items-end gap-6 pb-8 md:grid-cols-3 md:pb-12">
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.35, ease: EASE }}
              className="hidden md:block"
            >
              <LocalClock />
            </motion.div>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 1.2, ease: EASE }}
              className="ori-body mx-auto max-w-[330px] text-center text-[#656565]"
            >
              Design, build and publish sites
              <br className="hidden md:inline" /> made for a digital-first world.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.35, ease: EASE }}
              className="hidden justify-end md:flex"
            >
              <CopyEmail email="HELLO@AROBIX.COM" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
