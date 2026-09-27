'use client'

import { cn } from '@/lib/utils'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'
import { WORK } from './images'
import { Photo } from './photo'
import { Eyebrow, ImageReveal, MaskLines, PillLink, Rise } from './shared'

/**
 * Selected work — a 12-column editorial grid (97px columns, 12px gutters at
 * 1440px) with deliberately uneven placement. Measured column spans:
 *
 *   row 1  cols  9-12  span 4      row 4  cols 2-6   span 5, 180px top inset
 *   row 2  cols  1-5   span 5      row 5  cols 9-12  span 4
 *   row 3  cols  7-10  span 4      row 6  cols 1-4   span 4
 *
 * Card anatomy: a white 24px-radius frame with 4px padding around a 20px
 * image at a 0.797 aspect, then 24px to the meta block (title + copy, 8px
 * apart) and 20px to the tag row. Each card also carries its own scroll
 * parallax, which is why the reference's grid rows never line up.
 */

type Project = {
  name: string
  blurb: string
  tags: string[]
  /** Tailwind column placement at lg and up. */
  place: string
  span: 4 | 5
  /** Parallax travel in px across the section, signed. */
  drift: number
  inset?: boolean
}

const PROJECTS: Project[] = [
  {
    name: 'Meridian',
    blurb:
      'Bold editorial storefront designed to hold attention and turn browsers into buyers.',
    tags: ['Ecommerce', 'Template'],
    place: 'lg:col-start-9 lg:row-start-1',
    span: 4,
    drift: -70,
  },
  {
    name: 'Aperture',
    blurb:
      'Dynamic portfolio system built for studios that lead with motion and expressive type.',
    tags: ['Portfolio', 'Motion'],
    place: 'lg:col-start-1 lg:row-start-2',
    span: 5,
    drift: 40,
  },
  {
    name: 'Lumen',
    blurb:
      'Immersive launch site made for large-scale product moments and experiential display.',
    tags: ['Marketing', 'Launch'],
    place: 'lg:col-start-7 lg:row-start-3',
    span: 4,
    drift: -50,
  },
  {
    name: 'Season',
    blurb:
      'Modern commerce experience tuned for clarity, speed, and engaging product storytelling.',
    tags: ['Ecommerce', 'CMS'],
    place: 'lg:col-start-2 lg:row-start-4',
    span: 5,
    drift: 60,
    inset: true,
  },
  {
    name: 'Axis',
    blurb:
      'Minimal streetwear identity built to carry bold attitude and contemporary culture.',
    tags: ['Brand', 'Template'],
    place: 'lg:col-start-9 lg:row-start-5',
    span: 4,
    drift: -40,
  },
  {
    name: 'Nova',
    blurb:
      'Clean product interface that simplifies complex digital stories into a single flow.',
    tags: ['SaaS', 'Docs', 'Blog'],
    place: 'lg:col-start-1 lg:row-start-6',
    span: 4,
    drift: 50,
  },
]

const Card = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [project.drift, -project.drift])

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { y }}
      className={cn(
        'group',
        project.span === 4 ? 'lg:col-span-4' : 'lg:col-span-5',
        project.place,
        // Season sits 180px into its row at 1440; scaled like the rows.
        project.inset && 'lg:pt-[calc(var(--cw)*0.139)]'
      )}
    >
      <a href="/agency" className="block">
        {/* Frame: 4px of white around the image, which is what gives the
            reference's cards their mounted-print look. */}
        <div className="rounded-[24px] bg-white p-1 transition-shadow duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-[0_30px_70px_-40px_rgba(0,0,0,0.45)]">
          <ImageReveal className="relative aspect-[0.797] w-full rounded-[20px]">
            <div className="relative size-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
              <Photo
                file={WORK[project.name]}
                w={1066}
                h={1338}
                alt={`${project.name} template`}
                sizes="(max-width: 1024px) 100vw, 533px"
              />
            </div>
          </ImageReveal>
        </div>

        <div className="px-3">
          <div className="mt-6 flex flex-col gap-2">
            <h3 className="ori-h5 text-[#141414]">{project.name}</h3>
            <p className="ori-body text-[#656565]">{project.blurb}</p>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-white px-3 py-1.5 text-sm text-[#141414] transition-colors duration-500 group-hover:bg-[#141414] group-hover:text-white"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </a>
    </motion.div>
  )
}

const Work = () => (
  <section id="work" className="ori-container py-16 md:py-20">
    {/* Header occupies the left two thirds of the first grid row. */}
    <div className="max-w-[520px]">
      <Rise>
        <Eyebrow>Featured work</Eyebrow>
      </Rise>
      <MaskLines
        as="h2"
        lines={['Templates built with', 'ambitious brands and', 'bold teams']}
        className="ori-h2 mt-7 text-[#141414]"
      />
      <Rise delay={0.18} className="mt-8">
        <PillLink href="/agency">Start building free</PillLink>
      </Rise>
    </div>

    {/* Row heights come from the reference (626/605/578/1015/518/578 against
        a 1296px container) but are expressed as a fraction of the live
        container width, so they scale instead of leaving voids on narrower
        desktops. They stay deliberately shorter than the cards: consecutive
        rows overlap, which is what makes the grid read as editorial rather
        than tabular. No two consecutive rows share a column, so the overlap
        never obscures anything. */}
    <div
      style={{ '--cw': 'calc(min(100vw, 1440px) - 144px)' } as React.CSSProperties}
      className="mt-16 grid grid-cols-1 gap-x-3 gap-y-14 sm:grid-cols-2 lg:mt-[76px] lg:grid-cols-12 lg:gap-y-0 lg:[grid-template-rows:calc(var(--cw)*0.483)_calc(var(--cw)*0.467)_calc(var(--cw)*0.446)_calc(var(--cw)*0.783)_calc(var(--cw)*0.400)_calc(var(--cw)*0.446)]">
      {PROJECTS.map((p, i) => (
        <Card key={p.name} project={p} index={i} />
      ))}
    </div>
  </section>
)

export default Work
