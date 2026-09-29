import type { ComponentConfig, Slot } from '@puckeditor/core'
import React from 'react'

import {
  Section,
  alignItems,
  sectionDefaults,
  sectionFields,
  type SectionProps,
} from '../shared'
import {
  RADIUS,
  SPACE,
  SURFACE,
  onSurface,
  radiusOptions,
  spaceOptions,
  surfaceOptions,
  type Radius,
  type Space,
  type Surface,
} from '../tokens'

/**
 * Structural blocks. These are the only components that accept children, so
 * the page tree stays shallow and predictable: Section → Columns/Stack →
 * content blocks.
 */

/* ------------------------------------------------------------------ */

export type SectionBlockProps = SectionProps & {
  gap: Space
  content: Slot
}

export const SectionBlock: ComponentConfig<SectionBlockProps> = {
  label: 'Section',
  fields: {
    ...sectionFields,
    gap: { type: 'select', label: 'Gap between items', options: spaceOptions },
    content: { type: 'slot' },
  },
  defaultProps: { ...sectionDefaults, gap: 'md', content: [] },
  render: ({ content: Content, gap, align, ...section }) => (
    <Section {...section} align={align}>
      <Content
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: SPACE[gap],
          alignItems: alignItems(align),
        }}
        minEmptyHeight={120}
      />
    </Section>
  ),
}

/* ------------------------------------------------------------------ */

export type ColumnsBlockProps = {
  layout: '1-1' | '1-1-1' | '1-1-1-1' | '2-1' | '1-2'
  gap: Space
  verticalAlign: 'start' | 'center' | 'stretch'
  stackOnMobile: boolean
  a: Slot
  b: Slot
  c: Slot
  d: Slot
}

const TEMPLATES: Record<ColumnsBlockProps['layout'], string[]> = {
  '1-1': ['1fr', '1fr'],
  '1-1-1': ['1fr', '1fr', '1fr'],
  '1-1-1-1': ['1fr', '1fr', '1fr', '1fr'],
  '2-1': ['2fr', '1fr'],
  '1-2': ['1fr', '2fr'],
}

export const ColumnsBlock: ComponentConfig<ColumnsBlockProps> = {
  label: 'Columns',
  fields: {
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Two equal', value: '1-1' },
        { label: 'Three equal', value: '1-1-1' },
        { label: 'Four equal', value: '1-1-1-1' },
        { label: 'Wide + narrow', value: '2-1' },
        { label: 'Narrow + wide', value: '1-2' },
      ],
    },
    gap: { type: 'select', label: 'Gap', options: spaceOptions },
    verticalAlign: {
      type: 'radio',
      label: 'Vertical align',
      options: [
        { label: 'Top', value: 'start' },
        { label: 'Middle', value: 'center' },
        { label: 'Fill', value: 'stretch' },
      ],
    },
    stackOnMobile: {
      type: 'radio',
      label: 'On mobile',
      options: [
        { label: 'Stack', value: true },
        { label: 'Keep columns', value: false },
      ],
    },
    a: { type: 'slot' },
    b: { type: 'slot' },
    c: { type: 'slot' },
    d: { type: 'slot' },
  },
  defaultProps: {
    layout: '1-1',
    gap: 'md',
    verticalAlign: 'start',
    stackOnMobile: true,
    a: [],
    b: [],
    c: [],
    d: [],
  },
  render: ({ layout, gap, verticalAlign, stackOnMobile, a: A, b: B, c: C, d: D }) => {
    const template = TEMPLATES[layout] ?? TEMPLATES['1-1']
    const slots = [A, B, C, D].slice(0, template.length)

    return (
      <div
        // The stacking breakpoint is a container query, so columns collapse
        // based on the space they actually have rather than the viewport —
        // which matters once they're nested inside another column.
        style={{
          containerType: stackOnMobile ? 'inline-size' : undefined,
          display: 'grid',
          gap: SPACE[gap],
          gridTemplateColumns: template.join(' '),
          alignItems: verticalAlign === 'stretch' ? 'stretch' : verticalAlign,
          width: '100%',
        }}
        className={stackOnMobile ? 'puck-columns' : undefined}
      >
        {slots.map((SlotComp, i) => (
          <SlotComp key={i} minEmptyHeight={96} />
        ))}
      </div>
    )
  },
}

/* ------------------------------------------------------------------ */

export type StackBlockProps = {
  direction: 'vertical' | 'horizontal'
  gap: Space
  align: 'start' | 'center' | 'end'
  wrap: boolean
  content: Slot
}

export const StackBlock: ComponentConfig<StackBlockProps> = {
  label: 'Stack',
  fields: {
    direction: {
      type: 'radio',
      label: 'Direction',
      options: [
        { label: 'Vertical', value: 'vertical' },
        { label: 'Horizontal', value: 'horizontal' },
      ],
    },
    gap: { type: 'select', label: 'Gap', options: spaceOptions },
    align: {
      type: 'radio',
      label: 'Align',
      options: [
        { label: 'Start', value: 'start' },
        { label: 'Center', value: 'center' },
        { label: 'End', value: 'end' },
      ],
    },
    wrap: {
      type: 'radio',
      label: 'Wrap',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    content: { type: 'slot' },
  },
  defaultProps: {
    direction: 'horizontal',
    gap: 'sm',
    align: 'center',
    wrap: true,
    content: [],
  },
  render: ({ direction, gap, align, wrap, content: Content }) => (
    <Content
      style={{
        display: 'flex',
        flexDirection: direction === 'vertical' ? 'column' : 'row',
        gap: SPACE[gap],
        alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center',
        flexWrap: wrap ? 'wrap' : 'nowrap',
      }}
      collisionAxis={direction === 'horizontal' ? 'x' : 'y'}
      minEmptyHeight={72}
    />
  ),
}

/* ------------------------------------------------------------------ */

export type CardBlockProps = {
  surface: Surface
  radius: Radius
  padding: Space
  bordered: boolean
  content: Slot
}

export const CardBlock: ComponentConfig<CardBlockProps> = {
  label: 'Card',
  fields: {
    surface: { type: 'select', label: 'Background', options: surfaceOptions },
    radius: { type: 'select', label: 'Corner radius', options: radiusOptions },
    padding: { type: 'select', label: 'Padding', options: spaceOptions },
    bordered: {
      type: 'radio',
      label: 'Border',
      options: [
        { label: 'On', value: true },
        { label: 'Off', value: false },
      ],
    },
    content: { type: 'slot' },
  },
  defaultProps: {
    surface: 'surface',
    radius: 'lg',
    padding: 'md',
    bordered: true,
    content: [],
  },
  render: ({ surface, radius, padding, bordered, content: Content }) => (
    <div
      style={{
        background: SURFACE[surface],
        color: onSurface(surface),
        borderRadius: RADIUS[radius],
        padding: SPACE[padding],
        border: bordered ? '1px solid hsl(var(--border))' : undefined,
        height: '100%',
      }}
    >
      <Content minEmptyHeight={80} />
    </div>
  ),
}

/* ------------------------------------------------------------------ */

export const SpacerBlock: ComponentConfig<{ size: Space }> = {
  label: 'Spacer',
  fields: { size: { type: 'select', label: 'Height', options: spaceOptions } },
  defaultProps: { size: 'md' },
  render: ({ size }) => <div aria-hidden style={{ height: SPACE[size] }} />,
}

export const DividerBlock: ComponentConfig<{ spacing: Space }> = {
  label: 'Divider',
  fields: {
    spacing: { type: 'select', label: 'Spacing', options: spaceOptions },
  },
  defaultProps: { spacing: 'md' },
  render: ({ spacing }) => (
    <hr
      style={{
        border: 0,
        borderTop: '1px solid hsl(var(--border))',
        marginTop: SPACE[spacing],
        marginBottom: SPACE[spacing],
        width: '100%',
      }}
    />
  ),
}
