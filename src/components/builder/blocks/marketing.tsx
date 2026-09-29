'use client'

import type { ComponentConfig } from '@puckeditor/core'
import React, { useState } from 'react'

import {
  Section,
  sectionDefaults,
  sectionFields,
  type SectionProps,
} from '../shared'
import {
  RADIUS,
  SPACE,
  SURFACE,
  TYPE_SCALE,
  mutedOnSurface,
  onSurface,
  surfaceOptions,
  type Surface,
} from '../tokens'

/**
 * Composed marketing blocks.
 *
 * These are opinionated arrangements an editor can drop in whole, rather than
 * assembling from primitives every time. They still resolve through the same
 * tokens, so a page built from blocks and a page built from primitives look
 * like the same site.
 */

/* --------------------------------- Hero --------------------------- */

export type HeroBlockProps = SectionProps & {
  eyebrow: string
  heading: string
  body: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
  image: string
  layout: 'stacked' | 'split'
}

export const HeroBlock: ComponentConfig<HeroBlockProps> = {
  label: 'Hero',
  fields: {
    layout: {
      type: 'radio',
      label: 'Layout',
      options: [
        { label: 'Stacked', value: 'stacked' },
        { label: 'Split', value: 'split' },
      ],
    },
    eyebrow: { type: 'text', label: 'Eyebrow' },
    heading: { type: 'textarea', label: 'Heading' },
    body: { type: 'textarea', label: 'Body' },
    primaryLabel: { type: 'text', label: 'Primary button' },
    primaryHref: { type: 'text', label: 'Primary link' },
    secondaryLabel: { type: 'text', label: 'Secondary button' },
    secondaryHref: { type: 'text', label: 'Secondary link' },
    image: { type: 'text', label: 'Image URL' },
    ...sectionFields,
  },
  defaultProps: {
    ...sectionDefaults,
    paddingY: '2xl',
    align: 'center',
    layout: 'stacked',
    eyebrow: 'Introducing',
    heading: 'Build something people remember',
    body: 'A short, concrete promise. Say what this page is for and who it is for, in one or two sentences.',
    primaryLabel: 'Get started',
    primaryHref: '#',
    secondaryLabel: '',
    secondaryHref: '#',
    image: '',
  },
  render: ({
    eyebrow,
    heading,
    body,
    primaryLabel,
    primaryHref,
    secondaryLabel,
    secondaryHref,
    image,
    layout,
    ...section
  }) => {
    const copy = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          alignItems:
            layout === 'stacked' && section.align === 'center'
              ? 'center'
              : 'flex-start',
        }}
      >
        {eyebrow && (
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              opacity: 0.7,
            }}
          >
            {eyebrow}
          </span>
        )}
        <h1 style={{ ...TYPE_SCALE.display, margin: 0, textWrap: 'balance' }}>
          {heading}
        </h1>
        {body && (
          <p
            style={{
              ...TYPE_SCALE.body,
              margin: 0,
              maxWidth: 560,
              opacity: 0.72,
              textWrap: 'pretty',
            }}
          >
            {body}
          </p>
        )}
        {(primaryLabel || secondaryLabel) && (
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
            {primaryLabel && (
              <a
                href={primaryHref || '#'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: 46,
                  padding: '0 24px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                {primaryLabel}
              </a>
            )}
            {secondaryLabel && (
              <a
                href={secondaryHref || '#'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: 46,
                  padding: '0 24px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid hsl(var(--border))',
                  color: 'inherit',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                {secondaryLabel}
              </a>
            )}
          </div>
        )}
      </div>
    )

    if (layout === 'split') {
      return (
        <Section {...section}>
          <div
            className="puck-columns"
            style={{
              containerType: 'inline-size',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: SPACE.lg,
              alignItems: 'center',
              textAlign: 'left',
            }}
          >
            {copy}
            <div
              style={{
                aspectRatio: '4/3',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                background: 'hsl(var(--muted))',
              }}
            >
              {image && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={image}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
          </div>
        </Section>
      )
    }

    return (
      <Section {...section}>
        {copy}
        {image && (
          <div
            style={{
              marginTop: SPACE.lg,
              aspectRatio: '16/9',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: 'hsl(var(--muted))',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
      </Section>
    )
  },
}

/* ------------------------------ Feature grid ---------------------- */

export type FeatureGridProps = SectionProps & {
  heading: string
  columns: '2' | '3' | '4'
  items: { title: string; body: string; icon: string }[]
}

export const FeatureGridBlock: ComponentConfig<FeatureGridProps> = {
  label: 'Feature grid',
  fields: {
    heading: { type: 'text', label: 'Heading' },
    columns: {
      type: 'radio',
      label: 'Columns',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
    },
    items: {
      type: 'array',
      label: 'Features',
      arrayFields: {
        icon: { type: 'text', label: 'Icon (emoji or character)' },
        title: { type: 'text', label: 'Title' },
        body: { type: 'textarea', label: 'Body' },
      },
      getItemSummary: (item: { title: string }) => item.title || 'Feature',
    },
    ...sectionFields,
  },
  defaultProps: {
    ...sectionDefaults,
    heading: 'Everything you need',
    columns: '3',
    items: [
      { icon: '◆', title: 'Fast by default', body: 'Explain the benefit in a sentence.' },
      { icon: '◇', title: 'Built to scale', body: 'Explain the benefit in a sentence.' },
      { icon: '○', title: 'Simple to run', body: 'Explain the benefit in a sentence.' },
    ],
  },
  render: ({ heading, columns, items, ...section }) => (
    <Section {...section}>
      {heading && (
        <h2 style={{ ...TYPE_SCALE.title, margin: `0 0 ${SPACE.lg} 0` }}>
          {heading}
        </h2>
      )}
      <div
        className="puck-columns"
        style={{
          containerType: 'inline-size',
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: SPACE.md,
          textAlign: 'left',
        }}
      >
        {items?.map((item, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {item.icon && (
              <span
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 38,
                  height: 38,
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid hsl(var(--border))',
                  fontSize: 16,
                }}
              >
                {item.icon}
              </span>
            )}
            <h3 style={{ ...TYPE_SCALE.subheading, margin: 0 }}>{item.title}</h3>
            <p style={{ ...TYPE_SCALE.small, margin: 0, opacity: 0.72 }}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  ),
}

/* --------------------------------- Stats -------------------------- */

export type StatsBlockProps = SectionProps & {
  items: { value: string; label: string }[]
}

export const StatsBlock: ComponentConfig<StatsBlockProps> = {
  label: 'Stats',
  fields: {
    items: {
      type: 'array',
      label: 'Stats',
      arrayFields: {
        value: { type: 'text', label: 'Value' },
        label: { type: 'text', label: 'Label' },
      },
      getItemSummary: (item: { label: string }) => item.label || 'Stat',
    },
    ...sectionFields,
  },
  defaultProps: {
    ...sectionDefaults,
    paddingY: 'lg',
    items: [
      { value: '98%', label: 'Uptime' },
      { value: '120+', label: 'Templates' },
      { value: '24h', label: 'Support response' },
    ],
  },
  render: ({ items, ...section }) => (
    <Section {...section}>
      <div
        className="puck-columns"
        style={{
          containerType: 'inline-size',
          display: 'grid',
          gridTemplateColumns: `repeat(${items?.length || 1}, minmax(0, 1fr))`,
          gap: SPACE.md,
        }}
      >
        {items?.map((item, i) => (
          <div key={i}>
            <p
              style={{
                ...TYPE_SCALE.title,
                margin: 0,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {item.value}
            </p>
            <p style={{ ...TYPE_SCALE.small, margin: '6px 0 0', opacity: 0.7 }}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </Section>
  ),
}

/* ------------------------------ Testimonial ----------------------- */

export type TestimonialBlockProps = SectionProps & {
  quote: string
  name: string
  role: string
  avatar: string
}

export const TestimonialBlock: ComponentConfig<TestimonialBlockProps> = {
  label: 'Testimonial',
  fields: {
    quote: { type: 'textarea', label: 'Quote' },
    name: { type: 'text', label: 'Name' },
    role: { type: 'text', label: 'Role' },
    avatar: { type: 'text', label: 'Avatar URL' },
    ...sectionFields,
  },
  defaultProps: {
    ...sectionDefaults,
    align: 'center',
    quote: 'One clear sentence about the outcome this delivered.',
    name: 'Full name',
    role: 'Role, Company',
    avatar: '',
  },
  render: ({ quote, name, role, avatar, ...section }) => (
    <Section {...section}>
      <figure style={{ margin: 0, maxWidth: 720, marginInline: 'auto' }}>
        <blockquote style={{ ...TYPE_SCALE.heading, margin: 0, textWrap: 'balance' }}>
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption
          style={{
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            justifyContent: section.align === 'center' ? 'center' : 'flex-start',
          }}
        >
          {avatar && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={avatar}
              alt=""
              style={{ width: 36, height: 36, borderRadius: 999, objectFit: 'cover' }}
            />
          )}
          <span style={{ ...TYPE_SCALE.small, textAlign: 'left' }}>
            <strong style={{ display: 'block', fontWeight: 500 }}>{name}</strong>
            <span style={{ opacity: 0.7 }}>{role}</span>
          </span>
        </figcaption>
      </figure>
    </Section>
  ),
}

/* ---------------------------------- FAQ --------------------------- */

export type FaqBlockProps = SectionProps & {
  heading: string
  items: { question: string; answer: string }[]
}

const FaqRow = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid hsl(var(--border))' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          all: 'unset',
          cursor: 'pointer',
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '18px 0',
          fontWeight: 500,
        }}
      >
        <span>{question}</span>
        <span
          aria-hidden
          style={{
            flex: 'none',
            transition: 'transform 200ms ease',
            transform: open ? 'rotate(45deg)' : 'none',
            opacity: 0.6,
          }}
        >
          +
        </span>
      </button>
      {open && (
        <p style={{ ...TYPE_SCALE.small, margin: '0 0 18px', opacity: 0.72, maxWidth: 640 }}>
          {answer}
        </p>
      )}
    </div>
  )
}

export const FaqBlock: ComponentConfig<FaqBlockProps> = {
  label: 'FAQ',
  fields: {
    heading: { type: 'text', label: 'Heading' },
    items: {
      type: 'array',
      label: 'Questions',
      arrayFields: {
        question: { type: 'text', label: 'Question' },
        answer: { type: 'textarea', label: 'Answer' },
      },
      getItemSummary: (item: { question: string }) => item.question || 'Question',
    },
    ...sectionFields,
  },
  defaultProps: {
    ...sectionDefaults,
    heading: 'Questions',
    items: [
      { question: 'What is included?', answer: 'Answer the question directly in a sentence or two.' },
      { question: 'How does billing work?', answer: 'Answer the question directly in a sentence or two.' },
    ],
  },
  render: ({ heading, items, ...section }) => (
    <Section {...section}>
      {heading && (
        <h2 style={{ ...TYPE_SCALE.title, margin: `0 0 ${SPACE.md} 0` }}>
          {heading}
        </h2>
      )}
      <div style={{ textAlign: 'left', maxWidth: 760 }}>
        {items?.map((item, i) => (
          <FaqRow key={i} question={item.question} answer={item.answer} />
        ))}
      </div>
    </Section>
  ),
}

/* ---------------------------------- CTA --------------------------- */

export type CtaBlockProps = SectionProps & {
  heading: string
  body: string
  buttonLabel: string
  buttonHref: string
  panel: Surface
}

export const CtaBlock: ComponentConfig<CtaBlockProps> = {
  label: 'Call to action',
  fields: {
    heading: { type: 'textarea', label: 'Heading' },
    body: { type: 'textarea', label: 'Body' },
    buttonLabel: { type: 'text', label: 'Button label' },
    buttonHref: { type: 'text', label: 'Button link' },
    panel: { type: 'select', label: 'Panel background', options: surfaceOptions },
    ...sectionFields,
  },
  defaultProps: {
    ...sectionDefaults,
    align: 'center',
    panel: 'inverted',
    heading: 'Ready when you are',
    body: 'One line that removes the last objection.',
    buttonLabel: 'Start now',
    buttonHref: '#',
  },
  render: ({ heading, body, buttonLabel, buttonHref, panel, ...section }) => (
    <Section {...section}>
      <div
        style={{
          background: SURFACE[panel],
          color: onSurface(panel),
          borderRadius: RADIUS.xl,
          padding: `${SPACE.xl} ${SPACE.md}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          textAlign: 'center',
        }}
      >
        <h2 style={{ ...TYPE_SCALE.title, margin: 0, textWrap: 'balance' }}>
          {heading}
        </h2>
        {body && (
          <p
            style={{
              ...TYPE_SCALE.body,
              margin: 0,
              maxWidth: 520,
              color: mutedOnSurface(panel),
            }}
          >
            {body}
          </p>
        )}
        {buttonLabel && (
          <a
            href={buttonHref || '#'}
            style={{
              marginTop: 8,
              display: 'inline-flex',
              alignItems: 'center',
              height: 46,
              padding: '0 26px',
              borderRadius: 'var(--radius-sm)',
              background: panel === 'inverted' ? 'hsl(var(--background))' : 'hsl(var(--primary))',
              color: panel === 'inverted' ? 'hsl(var(--foreground))' : 'hsl(var(--primary-foreground))',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            {buttonLabel}
          </a>
        )}
      </div>
    </Section>
  ),
}

/* -------------------------------- Logos --------------------------- */

export type LogoRowProps = SectionProps & {
  caption: string
  items: { label: string; src: string }[]
}

export const LogoRowBlock: ComponentConfig<LogoRowProps> = {
  label: 'Logo row',
  fields: {
    caption: { type: 'text', label: 'Caption' },
    items: {
      type: 'array',
      label: 'Logos',
      arrayFields: {
        label: { type: 'text', label: 'Name' },
        src: { type: 'text', label: 'Logo URL (optional)' },
      },
      getItemSummary: (item: { label: string }) => item.label || 'Logo',
    },
    ...sectionFields,
  },
  defaultProps: {
    ...sectionDefaults,
    paddingY: 'lg',
    align: 'center',
    caption: 'Trusted by teams everywhere',
    items: [{ label: 'Northwind', src: '' }, { label: 'Meridian', src: '' }, { label: 'Halcyon', src: '' }],
  },
  render: ({ caption, items, ...section }) => (
    <Section {...section}>
      {caption && (
        <p
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.6,
            margin: `0 0 ${SPACE.md} 0`,
          }}
        >
          {caption}
        </p>
      )}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: SPACE.lg,
          alignItems: 'center',
          justifyContent: section.align === 'center' ? 'center' : 'flex-start',
          opacity: 0.65,
        }}
      >
        {items?.map((item, i) =>
          item.src ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img key={i} src={item.src} alt={item.label} style={{ height: 26 }} />
          ) : (
            <span key={i} style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>
              {item.label}
            </span>
          )
        )}
      </div>
    </Section>
  ),
}
