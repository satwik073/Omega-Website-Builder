'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { REEL_ART } from './images'
import { Photo } from './photo'
import { EASE } from './shared'

/**
 * Reel — measured at 1440x900:
 *   container  1200 wide (120px gutters), 730 tall
 *   video      860x484, 32px radius, centred
 *   marquee    Fraunces 128/128 in #a4a4a4, running *behind* the video and
 *              vertically centred on it, so the words emerge on either side
 *   reflection a vertically-flipped copy of the video below, clipped to 246px
 *              and faded out
 * The video also scales up slightly as the section crosses the viewport.
 */

const PHRASE = 'Watch the reel'

const MarqueeTrack = ({ reverse = false }: { reverse?: boolean }) => (
  <div className="flex w-max shrink-0">
    {[0, 1].map((copy) => (
      <div
        key={copy}
        aria-hidden={copy === 1}
        className={
          reverse
            ? 'flex shrink-0 animate-[marquee-rev_linear_infinite]'
            : 'flex shrink-0 animate-[marquee-fwd_linear_infinite]'
        }
        style={{ animationDuration: '32s' }}
      >
        {Array.from({ length: 4 }, (_, i) => (
          <span
            key={i}
            className="ori-marquee whitespace-nowrap pr-[0.35em] text-[#a4a4a4]"
          >
            {PHRASE}
            <span className="px-[0.3em] align-middle text-[0.5em]">·</span>
          </span>
        ))}
      </div>
    ))}
  </div>
)

/**
 * The reel surface. There is no licensed footage to ship, so this is a still
 * frame with a slow drift and a light sweep over it — same dark, high
 * contrast frame the reference uses, without pretending to be video.
 */
const ReelSurface = ({ playing }: { playing: boolean }) => (
  <div className="absolute inset-0 overflow-hidden bg-[#141414]">
    <motion.div
      className="relative size-full"
      animate={{ scale: playing ? [1, 1.12, 1] : 1 }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Photo
        file={REEL_ART}
        w={1720}
        h={968}
        alt=""
        sizes="(max-width: 768px) 100vw, 860px"
      />
    </motion.div>

    {/* Specular sweep — only while playing, so the control reads as live. */}
    {playing && (
      <motion.div
        className="absolute inset-y-0 w-1/3"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)',
        }}
        animate={{ left: ['-35%', '105%'] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    )}

    <div className="absolute inset-0 bg-black/20" />
  </div>
)

const Reel = () => {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // The frame settles from 0.92 to 1 as it enters, then holds.
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.92, 1, 1])

  return (
    <section ref={ref} className="relative overflow-hidden py-16 md:py-[80px]">
      <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-[120px]">
        <div className="relative">
          <motion.div
            style={reduce ? undefined : { scale }}
            className="relative z-10 mx-auto aspect-[860/484] w-full max-w-[860px]"
          >
            {/* Marquee is centred on the video, not on the wrapper — the
                wrapper also carries the reflection, which would drag the
                type below the frame. It runs behind, so the words emerge
                either side of the video. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[-50vw] top-1/2 -z-10 flex -translate-y-1/2 overflow-hidden"
            >
              <MarqueeTrack />
            </div>

            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause the reel' : 'Play the reel'}
              className="group absolute inset-0 overflow-hidden rounded-[32px]"
            >
              <ReelSurface playing={playing} />

              {/* Play affordance — scales up under the pointer. */}
              <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                <span className="flex size-14 items-center justify-center rounded-full bg-white">
                  {playing ? (
                    <span className="flex gap-[3px]">
                      <span className="block h-4 w-[3px] rounded-sm bg-[#141414]" />
                      <span className="block h-4 w-[3px] rounded-sm bg-[#141414]" />
                    </span>
                  ) : (
                    <svg viewBox="0 0 12 14" className="ml-[3px] h-4 w-4" aria-hidden>
                      <path d="M0 0v14l12-7L0 0Z" fill="#141414" />
                    </svg>
                  )}
                </span>
              </span>
            </button>
          </motion.div>

          {/* Mirrored reflection, clipped and faded. */}
          <motion.div
            aria-hidden
            style={reduce ? undefined : { scale }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.2, ease: EASE }}
            className="relative z-10 mx-auto -mt-px hidden h-[246px] w-full max-w-[860px] overflow-hidden rounded-t-[32px] md:block"
          >
            <div
              className="h-[484px] w-full -scale-y-100"
              style={{
                maskImage: 'linear-gradient(0deg, #000 0%, transparent 62%)',
                WebkitMaskImage: 'linear-gradient(0deg, #000 0%, transparent 62%)',
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[32px] opacity-45">
                <ReelSurface playing={playing} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Reel
