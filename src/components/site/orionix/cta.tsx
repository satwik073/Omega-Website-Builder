'use client'

import { motion, useReducedMotion } from 'framer-motion'
import React from 'react'
import { CTA_ART } from './images'
import { Photo } from './photo'
import { EASE, Eyebrow, MaskLines, Rise } from './shared'

/**
 * Closing CTA — measured at 1440px:
 *   card     1280 wide, 481 tall, #141414, 32px radius,
 *            padding 80 / 64 / 32
 *   heading  Fraunces 64/68 in white across two lines
 *   artwork  691px wide, full card height, flush to the right edge and
 *            clipped by the card radius
 *   social   four mono labels spread across the content width, 32px from
 *            the card bottom
 */

const SOCIALS = [
  { label: 'X (Twitter)', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Dribbble', href: '#' },
]

/** Dark chrome composition filling the card's right side. */
const CtaArt = () => {
  const reduce = useReducedMotion()
  return (
    <div
      aria-hidden
      className="absolute inset-y-0 right-0 w-[691px] max-w-[62%] overflow-hidden"
    >
      <motion.div
        className="relative size-full"
        animate={reduce ? undefined : { scale: [1, 1.07, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Photo file={CTA_ART} w={1382} h={962} alt="" sizes="691px" />
      </motion.div>
      {/* Fade the artwork into the card so it never reads as a pasted image. */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/55 to-transparent" />
    </div>
  )
}

const Cta = () => (
  <section id="cta" className="ori-container pb-12 pt-16 md:pb-12 md:pt-20">
    <div className="relative overflow-hidden rounded-[32px] bg-[#141414] px-6 pb-8 pt-12 md:px-16 md:pb-8 md:pt-20">
      <CtaArt />

      <div className="relative flex min-h-[380px] flex-col md:min-h-[369px]">
        <Rise>
          <Eyebrow dark>Idea &rarr; Reality</Eyebrow>
        </Rise>

        <MaskLines
          as="h2"
          lines={['Got an idea you want', 'to put online today?']}
          className="ori-h2-lg mt-4 max-w-[760px] text-white"
        />

        <Rise delay={0.2} className="mt-8">
          <a
            href="/agency"
            className="ori-pill group relative overflow-hidden bg-white text-[#141414]"
          >
            <span className="relative block overflow-hidden">
              <span className="block transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                Start building
              </span>
              <span
                aria-hidden
                className="absolute inset-0 block translate-y-full transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
              >
                Start building
              </span>
            </span>
          </a>
        </Rise>

        {/* Social row pins to the bottom of the card. */}
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="mt-auto flex flex-wrap gap-x-10 gap-y-3 pt-12 md:justify-between md:gap-0"
        >
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="ori-meta text-white/70 transition-colors hover:text-white"
              >
                {s.label}
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  </section>
)

export default Cta
