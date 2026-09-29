import type { ComponentConfig } from '@puckeditor/core'
import React from 'react'

import {
  RADIUS,
  SPACE,
  TYPE_SCALE,
  alignOptions,
  radiusOptions,
  spaceOptions,
  typeOptions,
  type Align,
  type Radius,
  type Space,
  type TypeScale,
} from '../tokens'

/**
 * Content blocks — the leaves of the page tree. None of them set outer
 * margins: vertical rhythm is owned by the Section or Stack they sit in, so
 * any two blocks can be reordered without spacing collapsing or doubling.
 */

/* ------------------------------ Heading --------------------------- */

export type HeadingBlockProps = {
  text: string
  level: 'h1' | 'h2' | 'h3' | 'h4'
  size: TypeScale
  align: Align
  maxWidth: string
}

export const HeadingBlock: ComponentConfig<HeadingBlockProps> = {
  label: 'Heading',
  fields: {
    text: { type: 'textarea', label: 'Text' },
    level: {
      type: 'select',
      label: 'Heading level',
      options: [
        { label: 'H1', value: 'h1' },
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
        { label: 'H4', value: 'h4' },
      ],
    },
    size: { type: 'select', label: 'Size', options: typeOptions },
    align: { type: 'radio', label: 'Align', options: alignOptions },
    maxWidth: { type: 'text', label: 'Max width (e.g. 640px)' },
  },
  defaultProps: {
    text: 'A headline worth reading',
    level: 'h2',
    size: 'title',
    align: 'left',
    maxWidth: '',
  },
  render: ({ text, level, size, align, maxWidth }) => {
    // The heading level is chosen for document outline; the visual size is a
    // separate control, so an editor can keep semantics correct without
    // being forced into a particular look.
    const Tag = level as keyof JSX.IntrinsicElements
    return (
      <Tag
        style={{
          ...TYPE_SCALE[size],
          margin: 0,
          textAlign: align,
          maxWidth: maxWidth || undefined,
          marginLeft: align === 'center' ? 'auto' : undefined,
          marginRight: align === 'center' ? 'auto' : undefined,
          textWrap: 'balance',
        }}
      >
        {text}
      </Tag>
    )
  },
}

/* -------------------------------- Text ---------------------------- */

export type TextBlockProps = {
  text: string
  size: TypeScale
  align: Align
  muted: boolean
  maxWidth: string
}

export const TextBlock: ComponentConfig<TextBlockProps> = {
  label: 'Text',
  fields: {
    text: { type: 'textarea', label: 'Text' },
    size: { type: 'select', label: 'Size', options: typeOptions },
    align: { type: 'radio', label: 'Align', options: alignOptions },
    muted: {
      type: 'radio',
      label: 'Emphasis',
      options: [
        { label: 'Normal', value: false },
        { label: 'Muted', value: true },
      ],
    },
    maxWidth: { type: 'text', label: 'Max width (e.g. 620px)' },
  },
  defaultProps: {
    text: 'Write the supporting copy here. Keep it to a couple of sentences so the page stays scannable.',
    size: 'body',
    align: 'left',
    muted: true,
    maxWidth: '640px',
  },
  render: ({ text, size, align, muted, maxWidth }) => (
    <p
      style={{
        ...TYPE_SCALE[size],
        margin: 0,
        textAlign: align,
        maxWidth: maxWidth || undefined,
        marginLeft: align === 'center' ? 'auto' : undefined,
        marginRight: align === 'center' ? 'auto' : undefined,
        opacity: muted ? 0.72 : 1,
        whiteSpace: 'pre-line',
        textWrap: 'pretty',
      }}
    >
      {text}
    </p>
  ),
}

/* ------------------------------- Eyebrow -------------------------- */

export const EyebrowBlock: ComponentConfig<{ text: string; dot: boolean }> = {
  label: 'Eyebrow',
  fields: {
    text: { type: 'text', label: 'Text' },
    dot: {
      type: 'radio',
      label: 'Accent dot',
      options: [
        { label: 'Show', value: true },
        { label: 'Hide', value: false },
      ],
    },
  },
  defaultProps: { text: 'Section label', dot: true },
  render: ({ text, dot }) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: 'var(--font-mono), ui-monospace, monospace',
        fontSize: 11,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        opacity: 0.75,
      }}
    >
      {dot && (
        <span
          aria-hidden
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: 'hsl(var(--accent-dot))',
          }}
        />
      )}
      {text}
    </span>
  ),
}

/* ------------------------------- Button --------------------------- */

export type ButtonBlockProps = {
  label: string
  href: string
  variant: 'primary' | 'secondary' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  radius: Radius
  newTab: boolean
  fullWidth: boolean
}

const BUTTON_SIZES = {
  sm: { height: 34, padding: '0 14px', fontSize: 13 },
  md: { height: 42, padding: '0 20px', fontSize: 14 },
  lg: { height: 52, padding: '0 28px', fontSize: 15 },
} as const

export const ButtonBlock: ComponentConfig<ButtonBlockProps> = {
  label: 'Button',
  fields: {
    label: { type: 'text', label: 'Label' },
    href: { type: 'text', label: 'Link' },
    variant: {
      type: 'select',
      label: 'Style',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Ghost', value: 'ghost' },
      ],
    },
    size: {
      type: 'radio',
      label: 'Size',
      options: [
        { label: 'S', value: 'sm' },
        { label: 'M', value: 'md' },
        { label: 'L', value: 'lg' },
      ],
    },
    radius: { type: 'select', label: 'Corner radius', options: radiusOptions },
    newTab: {
      type: 'radio',
      label: 'Open in',
      options: [
        { label: 'Same tab', value: false },
        { label: 'New tab', value: true },
      ],
    },
    fullWidth: {
      type: 'radio',
      label: 'Width',
      options: [
        { label: 'Auto', value: false },
        { label: 'Full', value: true },
      ],
    },
  },
  defaultProps: {
    label: 'Get started',
    href: '#',
    variant: 'primary',
    size: 'md',
    radius: 'sm',
    newTab: false,
    fullWidth: false,
  },
  render: ({ label, href, variant, size, radius, newTab, fullWidth, puck }) => {
    const dims = BUTTON_SIZES[size]
    const styles: Record<ButtonBlockProps['variant'], React.CSSProperties> = {
      primary: {
        background: 'hsl(var(--primary))',
        color: 'hsl(var(--primary-foreground))',
        border: '1px solid transparent',
      },
      secondary: {
        background: 'transparent',
        color: 'inherit',
        border: '1px solid hsl(var(--border))',
      },
      ghost: {
        background: 'transparent',
        color: 'inherit',
        border: '1px solid transparent',
      },
    }

    return (
      <a
        href={href || '#'}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noreferrer noopener' : undefined}
        // Inside the editor the link must not navigate away from the canvas.
        onClick={puck?.isEditing ? (e) => e.preventDefault() : undefined}
        style={{
          display: fullWidth ? 'flex' : 'inline-flex',
          width: fullWidth ? '100%' : undefined,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          textDecoration: 'none',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          borderRadius: RADIUS[radius],
          transition: 'opacity 150ms ease',
          ...dims,
          ...styles[variant],
        }}
      >
        {label}
      </a>
    )
  },
}

/* -------------------------------- Image --------------------------- */

export type ImageBlockProps = {
  src: string
  alt: string
  ratio: 'auto' | '16/9' | '4/3' | '1/1' | '3/4' | '21/9'
  fit: 'cover' | 'contain'
  radius: Radius
  maxWidth: string
}

export const ImageBlock: ComponentConfig<ImageBlockProps> = {
  label: 'Image',
  fields: {
    src: { type: 'text', label: 'Image URL' },
    alt: { type: 'text', label: 'Alt text' },
    ratio: {
      type: 'select',
      label: 'Aspect ratio',
      options: [
        { label: 'Original', value: 'auto' },
        { label: '21:9', value: '21/9' },
        { label: '16:9', value: '16/9' },
        { label: '4:3', value: '4/3' },
        { label: 'Square', value: '1/1' },
        { label: '3:4', value: '3/4' },
      ],
    },
    fit: {
      type: 'radio',
      label: 'Fit',
      options: [
        { label: 'Cover', value: 'cover' },
        { label: 'Contain', value: 'contain' },
      ],
    },
    radius: { type: 'select', label: 'Corner radius', options: radiusOptions },
    maxWidth: { type: 'text', label: 'Max width' },
  },
  defaultProps: {
    src: '',
    alt: '',
    ratio: '16/9',
    fit: 'cover',
    radius: 'md',
    maxWidth: '',
  },
  render: ({ src, alt, ratio, fit, radius, maxWidth }) => {
    const frame: React.CSSProperties = {
      width: '100%',
      maxWidth: maxWidth || undefined,
      aspectRatio: ratio === 'auto' ? undefined : ratio,
      borderRadius: RADIUS[radius],
      overflow: 'hidden',
      background: 'hsl(var(--muted))',
    }

    // An empty src is a normal editing state, not an error — show a frame
    // rather than a broken image.
    if (!src) {
      return (
        <div
          style={{
            ...frame,
            minHeight: 160,
            display: 'grid',
            placeItems: 'center',
            border: '1px dashed hsl(var(--border))',
            fontSize: 12,
            opacity: 0.6,
          }}
        >
          Add an image URL
        </div>
      )
    }

    return (
      <div style={frame}>
        {/* A plain <img>: sources are arbitrary user URLs, which next/image
            would reject unless every host is allow-listed up front. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: fit, display: 'block' }}
        />
      </div>
    )
  },
}

/* --------------------------------- List --------------------------- */

export type ListBlockProps = {
  items: { text: string }[]
  marker: 'check' | 'dot' | 'number'
  gap: Space
}

export const ListBlock: ComponentConfig<ListBlockProps> = {
  label: 'List',
  fields: {
    items: {
      type: 'array',
      label: 'Items',
      arrayFields: { text: { type: 'text', label: 'Text' } },
      getItemSummary: (item: { text: string }) => item.text || 'Item',
    },
    marker: {
      type: 'radio',
      label: 'Marker',
      options: [
        { label: 'Check', value: 'check' },
        { label: 'Dot', value: 'dot' },
        { label: 'Number', value: 'number' },
      ],
    },
    gap: { type: 'select', label: 'Gap', options: spaceOptions },
  },
  defaultProps: {
    items: [{ text: 'First point' }, { text: 'Second point' }],
    marker: 'check',
    gap: 'xs',
  },
  render: ({ items, marker, gap }) => (
    <ul
      style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: SPACE[gap],
        textAlign: 'left',
      }}
    >
      {items?.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span
            aria-hidden
            style={{
              flex: 'none',
              marginTop: 2,
              fontFamily: marker === 'number' ? 'var(--font-mono), monospace' : undefined,
              fontSize: marker === 'number' ? 12 : 14,
              opacity: 0.7,
              minWidth: 14,
            }}
          >
            {marker === 'check' ? '✓' : marker === 'dot' ? '•' : `${i + 1}.`}
          </span>
          <span style={{ ...TYPE_SCALE.body }}>{item.text}</span>
        </li>
      ))}
    </ul>
  ),
}
