'use client'

import { cn } from '@/lib/utils'
import { motion, useReducedMotion } from 'framer-motion'
import React from 'react'
import { EASE, Eyebrow, MaskLines, Rise } from './shared'

/**
 * Pricing — measured at 1440px:
 *   header  520 wide at the left gutter, 72px above the cards
 *   cards   three 416px columns on a 24px gutter, 40px padding
 *   radius  24px top, 48px bottom — the reference's one asymmetric corner
 *   title   Fraunces 24/28, body Inter 14/20, features Inter 14/20,
 *           price Fraunces 32/36 with a 14px unit, CTA a 48px pill
 * The third card inverts to #141414. Cards rise 24px as they enter.
 */

type Plan = {
  name: string
  blurb: string
  features: string[]
  price: string
  unit: string
  dark?: boolean
}

const PLANS: Plan[] = [
  {
    name: 'Launch',
    blurb:
      'Perfect for founders and new businesses ready to put a real site online without hiring anyone.',
    features: [
      'Visual canvas editor',
      'Starter template library',
      'Responsive breakpoints',
      'Custom domain + SSL',
      'Arobix subdomain staging',
    ],
    price: '$0',
    unit: '/ month',
  },
  {
    name: 'Growth',
    blurb:
      'For growing brands scaling a digital presence with commerce, content and a shared design system.',
    features: [
      'Everything in Launch',
      'Stripe Connect checkout',
      'Reusable component library',
      'CMS collections & blog',
      'Form capture and analytics',
    ],
    price: '$29',
    unit: '/ month',
  },
  {
    name: 'Scale',
    blurb:
      'Built for agencies running many client sites across one workspace, with sub-accounts and roles.',
    features: [
      'Everything in Growth',
      'Unlimited sub-accounts',
      'Team roles & permissions',
      'White-label client domains',
      'Priority support & onboarding',
    ],
    price: '$99',
    unit: '/ month',
    dark: true,
  },
]

/** The plan glyph — a four-dot cluster, filled in for the inverted card. */
const PlanMark = ({ dark }: { dark?: boolean }) => (
  <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
    {[
      [7, 7],
      [17, 7],
      [7, 17],
      [17, 17],
    ].map(([cx, cy]) => (
      <circle
        key={`${cx}-${cy}`}
        cx={cx}
        cy={cy}
        r="4.4"
        fill={dark ? '#ffffff' : '#141414'}
      />
    ))}
  </svg>
)

const Check = ({ dark }: { dark?: boolean }) => (
  <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0" aria-hidden>
    <circle cx="8" cy="8" r="8" fill={dark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.06)'} />
    <path
      d="M4.6 8.2 7 10.5l4.4-4.6"
      fill="none"
      stroke={dark ? '#ffffff' : '#141414'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const PlanCard = ({ plan, index }: { plan: Plan; index: number }) => {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay: index * 0.09, ease: EASE }}
      className={cn(
        'flex flex-col rounded-t-[24px] rounded-b-[48px] p-10',
        plan.dark ? 'bg-[#141414]' : 'bg-white'
      )}
    >
      <PlanMark dark={plan.dark} />

      <h3
        className={cn(
          'ori-h5 mt-4 text-2xl leading-7 [letter-spacing:-0.04em]',
          plan.dark ? 'text-white' : 'text-[#141414]'
        )}
      >
        {plan.name} Plan
      </h3>
      <p
        className={cn(
          'ori-sm mt-4',
          plan.dark ? 'text-white/60' : 'text-[#656565]'
        )}
      >
        {plan.blurb}
      </p>

      <ul className="mt-8 flex flex-col gap-4">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <Check dark={plan.dark} />
            <span
              className={cn('ori-sm', plan.dark ? 'text-white' : 'text-[#141414]')}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* Price and CTA pin to the bottom so the three cards align. */}
      <div className="mt-auto pt-8">
        <div className="flex items-baseline gap-1.5">
          <span
            className={cn(
              'ori-display text-[32px] leading-9',
              plan.dark ? 'text-white' : 'text-[#141414]'
            )}
          >
            {plan.price}
          </span>
          <span
            className={cn(
              'ori-sm',
              plan.dark ? 'text-white/60' : 'text-[#656565]'
            )}
          >
            {plan.unit}
          </span>
        </div>

        <a
          href="/agency"
          className={cn(
            'group relative mt-6 flex h-12 w-full items-center justify-center overflow-hidden rounded-full text-sm font-medium',
            plan.dark ? 'bg-white text-[#141414]' : 'bg-[#141414] text-white'
          )}
        >
          <span className="relative block overflow-hidden">
            <span className="block transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
              Start on {plan.name}
            </span>
            <span
              aria-hidden
              className="absolute inset-0 block translate-y-full transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
            >
              Start on {plan.name}
            </span>
          </span>
        </a>
      </div>
    </motion.div>
  )
}

const Pricing = () => (
  <section id="pricing" className="ori-container py-16 md:py-20">
    <Rise>
      <Eyebrow>Pricing</Eyebrow>
    </Rise>
    <MaskLines
      as="h2"
      lines={['Choose a plan', 'that fits your needs']}
      className="ori-h2 mt-7 max-w-[520px] text-[#141414]"
    />

    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-[72px]">
      {PLANS.map((p, i) => (
        <PlanCard key={p.name} plan={p} index={i} />
      ))}
    </div>
  </section>
)

export default Pricing
export { Pricing }
