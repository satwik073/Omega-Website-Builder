import type { Field } from '@puckeditor/core'
import React from 'react'

import {
  ALIGN,
  SPACE,
  SURFACE,
  WIDTH,
  alignOptions,
  onSurface,
  radiusOptions,
  spaceOptions,
  surfaceOptions,
  widthOptions,
  type Align,
  type Radius,
  type Space,
  type Surface,
  type Width,
} from './tokens'

/**
 * Field groups shared across every block.
 *
 * Defining these once means an editor learns one spacing control and one
 * background control, not eighteen slightly different ones — and adding a
 * token later updates every block at once.
 */

export type SectionProps = {
  surface: Surface
  width: Width
  paddingY: Space
  paddingX: Space
  align: Align
  anchor?: string
}

export const sectionFields: Record<keyof SectionProps, Field> = {
  surface: { type: 'select', label: 'Background', options: surfaceOptions },
  width: { type: 'select', label: 'Content width', options: widthOptions },
  paddingY: { type: 'select', label: 'Padding top/bottom', options: spaceOptions },
  paddingX: { type: 'select', label: 'Padding left/right', options: spaceOptions },
  align: { type: 'radio', label: 'Align', options: alignOptions },
  anchor: { type: 'text', label: 'Anchor id' },
}

export const sectionDefaults: SectionProps = {
  surface: 'none',
  width: 'default',
  paddingY: 'xl',
  paddingX: 'md',
  align: 'left',
  anchor: '',
}

/**
 * The frame every block renders inside. Owns the page's horizontal rhythm,
 * so blocks never set their own outer margins and always line up with each
 * other regardless of the order they're dropped in.
 */
export const Section = ({
  surface = 'none',
  width = 'default',
  paddingY = 'xl',
  paddingX = 'md',
  align = 'left',
  anchor,
  children,
  style,
}: Partial<SectionProps> & {
  children: React.ReactNode
  style?: React.CSSProperties
}) => (
  <section
    id={anchor || undefined}
    style={{
      background: SURFACE[surface],
      color: onSurface(surface),
      paddingTop: SPACE[paddingY],
      paddingBottom: SPACE[paddingY],
      paddingLeft: SPACE[paddingX],
      paddingRight: SPACE[paddingX],
      // Anchors must clear the fixed product topbar when linked to.
      scrollMarginTop: '80px',
      ...style,
    }}
  >
    <div
      style={{
        maxWidth: WIDTH[width],
        marginLeft: align === 'left' ? 0 : 'auto',
        marginRight: align === 'right' ? 0 : 'auto',
        textAlign: align,
        width: '100%',
      }}
    >
      {children}
    </div>
  </section>
)

/** Radius field, shared by anything with a visible edge. */
export const radiusField: Field = {
  type: 'select',
  label: 'Corner radius',
  options: radiusOptions,
}

/** A link target, used by buttons and cards. */
export type LinkProps = { label: string; href: string; newTab?: boolean }

export const linkFields: Record<string, Field> = {
  label: { type: 'text', label: 'Label' },
  href: { type: 'text', label: 'Link' },
  newTab: {
    type: 'radio',
    label: 'Open in',
    options: [
      { label: 'Same tab', value: false },
      { label: 'New tab', value: true },
    ],
  },
}

/** Flex gap helper so nested stacks share the spacing scale. */
export const gapStyle = (gap: Space): React.CSSProperties => ({
  gap: SPACE[gap],
})

export const alignItems = (align: Align) =>
  align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start'

export { ALIGN, SPACE, SURFACE, WIDTH }
export type { Align, Radius, Space, Surface, Width }
