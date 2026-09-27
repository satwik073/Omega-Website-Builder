'use client'

import { cn } from '@/lib/utils'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import React, { useRef } from 'react'

/**
 * Scroll-triggered reveal. Intentionally restrained — used on section
 * headings and large media only, never on every element.
 */
export const Reveal = ({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Line-by-line headline reveal with a mask, so the type wipes up rather
 * than simply fading.
 */
export const RevealLines = ({
  lines,
  className,
  lineClassName,
}: {
  lines: string[]
  className?: string
  lineClassName?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className={cn('block', lineClassName)}
            initial={reduce ? false : { y: '110%' }}
            animate={inView ? { y: '0%' } : undefined}
            transition={{
              duration: 0.9,
              delay: 0.08 * i,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

/**
 * Infinite horizontal marquee. Duplicated track so the loop is seamless;
 * pauses for reduced-motion users.
 */
export const Marquee = ({
  items,
  className,
  separator = '—',
  duration = 38,
}: {
  items: string[]
  className?: string
  separator?: string
  duration?: number
}) => {
  const reduce = useReducedMotion()
  const track = (
    <div className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-8">{item}</span>
          <span className="opacity-30">{separator}</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={cn('flex overflow-hidden whitespace-nowrap', className)}>
      {reduce ? (
        track
      ) : (
        <motion.div
          className="flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration, ease: 'linear', repeat: Infinity }}
        >
          {track}
          {track}
        </motion.div>
      )}
    </div>
  )
}
