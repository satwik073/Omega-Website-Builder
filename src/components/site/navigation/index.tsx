'use client'

import { BrandLockup } from '@/components/global/brand-mark'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { EASE } from '../orionix/shared'

/**
 * Reference navigation, measured at 1440px:
 *   bar          96px tall, fixed, fully transparent at every scroll offset
 *   logo         left, 100px from the viewport edge
 *   links        centred on 720px, 14px Inter, 20px side padding, 8px gaps
 *   CTA          40px pill, #141414, 80px from the right edge
 * There is no scrolled state — the bar never gains a background or hairline.
 */

const LINKS = [
  { label: 'Templates', href: '#work' },
  { label: 'About', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Features', href: '#services' },
  { label: 'Blog', href: '#insights' },
  { label: 'Pages', href: '#faq' },
]

const Wordmark = () => (
  <Link
    href="/"
    className="text-[#141414] transition-opacity hover:opacity-70"
  >
    <BrandLockup />
  </Link>
)

const Navigation = () => {
  const [open, setOpen] = useState(false)

  // Lock the page behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <nav className="pointer-events-auto mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 md:h-24 md:pl-[100px] md:pr-20">
        <Wordmark />

        {/* Centred link set — absolutely placed so it stays on the optical
            centre regardless of how wide the logo or CTA get. */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group relative flex h-10 items-center overflow-hidden px-5"
            >
              {/* Label swap on hover, matching the pill treatment. */}
              <span className="relative block overflow-hidden">
                <span className="ori-sm block text-[#141414] transition-transform duration-[460ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                  {l.label}
                </span>
                <span
                  aria-hidden
                  className="ori-sm absolute inset-0 block translate-y-full text-[#141414] transition-transform duration-[460ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                >
                  {l.label}
                </span>
              </span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/agency"
            className="ori-pill group relative hidden overflow-hidden bg-[#141414] text-white sm:inline-flex"
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

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex size-10 items-center justify-center rounded-full border border-black/10 lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  'absolute left-0 h-px w-full bg-[#141414] transition-all duration-300',
                  open ? 'top-1.5 rotate-45' : 'top-0'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 h-px w-full bg-[#141414] transition-all duration-300',
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile sheet: the panel wipes down, then the links stagger in. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="pointer-events-auto fixed inset-0 top-0 z-40 bg-[#f9f8f6] lg:hidden"
          >
            <div className="flex h-full flex-col justify-between px-6 pb-10 pt-24">
              <div className="flex flex-col">
                {LINKS.map((l, i) => (
                  <span key={l.label} className="overflow-hidden">
                    <motion.a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      transition={{
                        duration: 0.8,
                        delay: 0.14 + i * 0.06,
                        ease: EASE,
                      }}
                      className="ori-h4 block border-b border-black/[0.08] py-4 text-[#141414]"
                    >
                      {l.label}
                    </motion.a>
                  </span>
                ))}
              </div>
              <a
                href="/agency"
                onClick={() => setOpen(false)}
                className="ori-pill h-12 w-full bg-[#141414] text-white"
              >
                Start building
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navigation
