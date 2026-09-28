'use client'

import { cn } from '@/lib/utils'
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

/**
 * Motion primitives shared by every section.
 *
 * Timings were taken off the reference rather than guessed: a ~1s expo-out
 * for masked text, 0.9s for supporting copy, 1.4s for image settles, and a
 * 90ms stagger between lines. Everything honours prefers-reduced-motion.
 */

/** expo-out — the reference's single easing curve. */
export const EASE = [0.16, 1, 0.3, 1] as const

/** Masked line reveal: each line slides up from 110% inside a clip. */
export const MaskLines = ({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  immediate = false,
  as: Tag = 'div',
}: {
  lines: React.ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
  immediate?: boolean
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4'
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const reduce = useReducedMotion()
  const play = immediate || inView

  return (
    <Tag ref={ref as never} className={className}>
      {lines.map((line, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={cn('block', lineClassName)}
            initial={reduce ? false : { y: '110%' }}
            animate={play ? { y: '0%' } : undefined}
            transition={{ duration: 1, delay: delay + stagger * i, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Fade + rise, for supporting copy, controls and media. */
export const Rise = ({
  children,
  className,
  delay = 0,
  y = 24,
  immediate = false,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  immediate?: boolean
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const reduce = useReducedMotion()
  const play = immediate || inView

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={play ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Image settle: the frame is already in place while the picture inside
 * counter-scales 1.18 → 1, so the crop tightens rather than the box popping.
 */
export const ImageReveal = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-6% 0px' })
  const reduce = useReducedMotion()

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div
        initial={reduce ? false : { scale: 1.18 }}
        animate={inView ? { scale: 1 } : undefined}
        transition={{ duration: 1.4, delay, ease: EASE }}
        className="size-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

/** Section eyebrow — mono, uppercase, dot prefix. 12px/+0.03em. */
export const Eyebrow = ({
  children,
  dark = false,
  className,
}: {
  children: React.ReactNode
  dark?: boolean
  className?: string
}) => (
  <span
    className={cn(
      'ori-meta inline-flex items-center gap-2.5',
      dark ? 'text-white' : 'text-[#141414]',
      className
    )}
  >
    <span
      className={cn(
        'size-[7px] rounded-full',
        dark ? 'bg-white/60' : 'bg-[#c2352f]'
      )}
    />
    {children}
  </span>
)

/**
 * The reference's pill button: the label sits in a clip and swaps for a
 * duplicate sliding up from below on hover, which is why the DOM carries
 * the label twice.
 */
export const PillLink = ({
  href,
  children,
  variant = 'solid',
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: 'solid' | 'outline' | 'invert'
  className?: string
}) => (
  <a
    href={href}
    className={cn(
      'ori-pill group relative overflow-hidden',
      variant === 'solid' && 'bg-[#141414] text-white',
      variant === 'outline' &&
        'border border-black/[0.12] text-[#141414] transition-colors hover:border-black/30',
      variant === 'invert' && 'bg-white text-[#141414]',
      className
    )}
  >
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  </a>
)

/** Live clock — GMT offset plus a 24h readout, as in the reference hero. */
export const LocalClock = ({ tz = 'GMT-7' }: { tz?: string }) => {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      )
    tick()
    const id = setInterval(tick, 20_000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="ori-meta text-[#656565]">
      {tz}
      {/* Rendered client-side only — the server has no user clock. */}
      <span className="ml-2 tabular-nums">{time ?? '--:--'}</span>
    </span>
  )
}

/** Click-to-copy email. The label swaps to "Copied!" for 1.6s. */
export const CopyEmail = ({ email }: { email: string }) => {
  const [copied, setCopied] = useState(false)
  const [user, domain] = email.split('@')

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email)
          setCopied(true)
          setTimeout(() => setCopied(false), 1600)
        } catch {
          /* clipboard blocked — leave the label unchanged */
        }
      }}
      className="ori-meta group text-[#656565] transition-colors hover:text-[#141414]"
    >
      {copied ? (
        <span className="text-[#141414]">Copied!</span>
      ) : (
        <>
          {user}
          <span className="px-0.5 text-[#a4a4a4]">@</span>
          <span className="text-[#141414]">{domain}</span>
        </>
      )}
    </button>
  )
}

/**
 * Count-up numeral. The reference rolls each stat from 0 to its value once
 * the block enters the viewport, then holds.
 */
export const CountUp = ({
  to,
  duration = 1.8,
  className,
}: {
  to: number
  duration?: number
  className?: string
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setValue(to)
      return
    }
    let raf = 0
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      // expo-out, matched to the rest of the page
      const eased = t === 1 ? 1 : 1 - 2 ** (-10 * t)
      setValue(Math.round(eased * to))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduce])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {value}
    </span>
  )
}

/**
 * Pointer-follow wrapper. Returns spring-tracked x/y in the -1..1 range,
 * used for the hero's parallax field and the work cards' tilt.
 */
export const usePointerParallax = (strength = 1) => {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 })
  const y = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      mx.set(((e.clientX - r.left) / r.width - 0.5) * 2 * strength)
      my.set(((e.clientY - r.top) / r.height - 0.5) * 2 * strength)
    }
    const onLeave = () => {
      mx.set(0)
      my.set(0)
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [mx, my, strength])

  return { ref, x: x as MotionValue<number>, y: y as MotionValue<number> }
}

export { useTransform }
