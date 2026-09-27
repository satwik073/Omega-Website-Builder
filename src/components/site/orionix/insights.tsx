'use client'

import React from 'react'
import { POSTS as POST_IMAGES } from './images'
import { Photo } from './photo'
import { Eyebrow, ImageReveal, MaskLines, PillLink, Rise } from './shared'

/**
 * Insights — measured at 1440px: heading 520 wide at the left gutter with a
 * "view all" pill pushed to the right edge, then three 416px cards on a 24px
 * gutter. The card runs text first and the 408x268 image last, inside a 4px
 * white frame — the inverse of the work cards above.
 */

const POSTS = [
  {
    date: 'June 17, 2026',
    title: 'Why Great UI/UX Starts with Strategy',
    blurb:
      'How strategic thinking shapes intuitive product experiences and meaningful user journeys.',
    tag: 'Design',
  },
  {
    date: 'June 2, 2026',
    title: 'Designing Brands for the Digital-First Era',
    blurb:
      'How modern brands adapt identity systems for digital platforms and evolving behaviour.',
    tag: 'Branding',
  },
  {
    date: 'June 2, 2026',
    title: 'Building Websites That Convert and Scale',
    blurb:
      'Key principles behind high-performing sites designed for growth, speed and clarity.',
    tag: 'Development',
  },
]

const Insights = () => (
  <section id="insights" className="ori-container py-16 md:py-20">
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div>
        <Rise>
          <Eyebrow>Insights</Eyebrow>
        </Rise>
        <MaskLines
          as="h2"
          lines={['Ideas, Insights', '& Perspectives']}
          className="ori-h2 mt-7 max-w-[520px] text-[#141414]"
        />
      </div>

      <Rise delay={0.15}>
        <PillLink href="#insights" variant="outline">
          View all articles
        </PillLink>
      </Rise>
    </div>

    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-[126px]">
      {POSTS.map((post, i) => (
        <Rise key={post.title} delay={i * 0.09}>
          <a
            href="#insights"
            className="group flex h-full flex-col rounded-[24px] bg-white p-1"
          >
            <div className="flex flex-1 flex-col px-5 pt-5">
              <p className="ori-meta text-[#a4a4a4]">{post.date}</p>

              <h3 className="ori-h5 mt-2 text-[#141414]">{post.title}</h3>
              <p className="ori-sm mt-4 text-[#656565]">{post.blurb}</p>

              <span className="mt-5 inline-flex w-fit rounded-full bg-[#f9f8f6] px-3 py-1.5 text-sm text-[#141414] transition-colors duration-500 group-hover:bg-[#141414] group-hover:text-white">
                {post.tag}
              </span>
            </div>

            <ImageReveal
              className="mt-6 aspect-[408/268] w-full rounded-[20px]"
              delay={0.08 * i}
            >
              <div className="relative size-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]">
                <Photo
                  file={POST_IMAGES[post.title]}
                  w={816}
                  h={536}
                  alt={post.title}
                  sizes="(max-width: 768px) 100vw, 408px"
                />
              </div>
            </ImageReveal>
          </a>
        </Rise>
      ))}
    </div>
  </section>
)

export default Insights
