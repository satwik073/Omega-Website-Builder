import type { Field } from '@puckeditor/core'
import type React from 'react'

/**
 * Elementor's Advanced tab, as a field set every widget inherits.
 *
 * In Elementor every widget gets the same Advanced tab regardless of what it
 * renders — Layout, Motion Effects, Transform, Background, Border, Mask,
 * Responsive, Attributes and Custom CSS. Defining it once here and merging it
 * into each component (see `withElementorTabs`) reproduces that, and means a
 * new block picks the whole tab up for free.
 *
 * Grouped with `object` fields because Puck renders those as a nested,
 * collapsible group — the closest analogue to Elementor's popover sections,
 * and it keeps the panel from becoming one flat 40-control list.
 */

/* ------------------------------------------------------------------ */
/* Value shapes                                                        */
/* ------------------------------------------------------------------ */

export type BoxValue = {
  top?: string
  right?: string
  bottom?: string
  left?: string
}

export type AdvancedProps = {
  _layout?: {
    margin?: BoxValue
    padding?: BoxValue
    width?: 'default' | 'full' | 'inline' | 'custom'
    customWidth?: string
    align?: 'default' | 'start' | 'center' | 'end'
    position?: 'default' | 'relative' | 'absolute' | 'fixed' | 'sticky'
    offsetX?: string
    offsetY?: string
    zIndex?: string
  }
  _motion?: {
    animation?: string
    duration?: 'slow' | 'normal' | 'fast'
    delay?: string
  }
  _transform?: {
    rotate?: string
    offsetX?: string
    offsetY?: string
    scale?: string
    skewX?: string
    skewY?: string
    flipH?: boolean
    flipV?: boolean
  }
  _decoration?: {
    background?: string
    gradient?: string
    borderStyle?: 'none' | 'solid' | 'dashed' | 'dotted' | 'double'
    borderWidth?: string
    borderColor?: string
    borderRadius?: string
    boxShadow?: string
    opacity?: string
    blendMode?: string
    overflow?: 'visible' | 'hidden' | 'auto'
  }
  _mask?: {
    shape?: 'none' | 'circle' | 'flower' | 'sketch' | 'triangle' | 'blob'
    size?: 'contain' | 'cover' | 'auto'
    position?: string
    repeat?: 'no-repeat' | 'repeat'
  }
  _responsive?: {
    hideDesktop?: boolean
    hideTablet?: boolean
    hideMobile?: boolean
  }
  _attributes?: {
    cssId?: string
    cssClasses?: string
    attributes?: string
  }
  _customCss?: string
}

/* ------------------------------------------------------------------ */
/* Option lists                                                        */
/* ------------------------------------------------------------------ */

const opt = <T extends string>(values: readonly T[]) =>
  values.map((v) => ({
    label: v[0].toUpperCase() + v.slice(1).replace(/-/g, ' '),
    value: v,
  }))

/** Elementor's entrance animation list, trimmed to the ones worth shipping. */
export const ANIMATIONS = [
  'none',
  'fade-in',
  'fade-in-up',
  'fade-in-down',
  'fade-in-left',
  'fade-in-right',
  'zoom-in',
  'slide-up',
] as const

const boxField = (label: string): Field => ({
  type: 'object',
  label,
  objectFields: {
    top: { type: 'text', label: 'Top' },
    right: { type: 'text', label: 'Right' },
    bottom: { type: 'text', label: 'Bottom' },
    left: { type: 'text', label: 'Left' },
  },
})

/* ------------------------------------------------------------------ */
/* Fields                                                              */
/* ------------------------------------------------------------------ */

export const advancedFields: Record<string, Field> = {
  _layout: {
    type: 'object',
    label: 'Layout & spacing',
    objectFields: {
      margin: boxField('Margin'),
      padding: boxField('Padding'),
      width: {
        type: 'select',
        label: 'Width',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Full width (100%)', value: 'full' },
          { label: 'Inline (auto)', value: 'inline' },
          { label: 'Custom', value: 'custom' },
        ],
      },
      customWidth: { type: 'text', label: 'Custom width' },
      align: {
        type: 'select',
        label: 'Self align',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Start', value: 'start' },
          { label: 'Center', value: 'center' },
          { label: 'End', value: 'end' },
        ],
      },
      position: {
        type: 'select',
        label: 'Position',
        options: opt([
          'default',
          'relative',
          'absolute',
          'fixed',
          'sticky',
        ] as const),
      },
      offsetX: { type: 'text', label: 'Offset X' },
      offsetY: { type: 'text', label: 'Offset Y' },
      zIndex: { type: 'text', label: 'Z-index' },
    },
  },

  _motion: {
    type: 'object',
    label: 'Motion effects',
    objectFields: {
      animation: {
        type: 'select',
        label: 'Entrance animation',
        options: opt(ANIMATIONS),
      },
      duration: {
        type: 'select',
        label: 'Animation duration',
        options: opt(['slow', 'normal', 'fast'] as const),
      },
      delay: { type: 'text', label: 'Animation delay (ms)' },
    },
  },

  _transform: {
    type: 'object',
    label: 'Transform',
    objectFields: {
      rotate: { type: 'text', label: 'Rotate (deg)' },
      offsetX: { type: 'text', label: 'Translate X' },
      offsetY: { type: 'text', label: 'Translate Y' },
      scale: { type: 'text', label: 'Scale' },
      skewX: { type: 'text', label: 'Skew X (deg)' },
      skewY: { type: 'text', label: 'Skew Y (deg)' },
      flipH: {
        type: 'radio',
        label: 'Flip horizontal',
        options: [
          { label: 'No', value: false },
          { label: 'Yes', value: true },
        ],
      },
      flipV: {
        type: 'radio',
        label: 'Flip vertical',
        options: [
          { label: 'No', value: false },
          { label: 'Yes', value: true },
        ],
      },
    },
  },

  _decoration: {
    type: 'object',
    label: 'Background & border',
    objectFields: {
      background: { type: 'text', label: 'Background colour' },
      gradient: { type: 'text', label: 'Background gradient' },
      borderStyle: {
        type: 'select',
        label: 'Border type',
        options: opt(['none', 'solid', 'dashed', 'dotted', 'double'] as const),
      },
      borderWidth: { type: 'text', label: 'Border width' },
      borderColor: { type: 'text', label: 'Border colour' },
      borderRadius: { type: 'text', label: 'Border radius' },
      boxShadow: { type: 'text', label: 'Box shadow' },
      opacity: { type: 'text', label: 'Opacity (0–1)' },
      blendMode: {
        type: 'select',
        label: 'Blend mode',
        options: opt([
          'normal',
          'multiply',
          'screen',
          'overlay',
          'darken',
          'lighten',
          'difference',
          'exclusion',
          'luminosity',
        ] as const),
      },
      overflow: {
        type: 'select',
        label: 'Overflow',
        options: opt(['visible', 'hidden', 'auto'] as const),
      },
    },
  },

  _mask: {
    type: 'object',
    label: 'Mask',
    objectFields: {
      shape: {
        type: 'select',
        label: 'Mask shape',
        options: opt([
          'none',
          'circle',
          'flower',
          'sketch',
          'triangle',
          'blob',
        ] as const),
      },
      size: {
        type: 'select',
        label: 'Mask size',
        options: opt(['contain', 'cover', 'auto'] as const),
      },
      position: { type: 'text', label: 'Mask position' },
      repeat: {
        type: 'select',
        label: 'Mask repeat',
        options: [
          { label: 'No repeat', value: 'no-repeat' },
          { label: 'Repeat', value: 'repeat' },
        ],
      },
    },
  },

  _responsive: {
    type: 'object',
    label: 'Responsive',
    objectFields: {
      hideDesktop: {
        type: 'radio',
        label: 'Hide on desktop',
        options: [
          { label: 'No', value: false },
          { label: 'Yes', value: true },
        ],
      },
      hideTablet: {
        type: 'radio',
        label: 'Hide on tablet',
        options: [
          { label: 'No', value: false },
          { label: 'Yes', value: true },
        ],
      },
      hideMobile: {
        type: 'radio',
        label: 'Hide on mobile',
        options: [
          { label: 'No', value: false },
          { label: 'Yes', value: true },
        ],
      },
    },
  },

  _attributes: {
    type: 'object',
    label: 'Attributes',
    objectFields: {
      cssId: { type: 'text', label: 'CSS ID' },
      cssClasses: { type: 'text', label: 'CSS classes' },
      attributes: {
        type: 'textarea',
        label: 'Custom attributes',
      },
    },
  },

  _customCss: { type: 'textarea', label: 'Custom CSS' },
}

export const advancedDefaults: AdvancedProps = {
  _layout: { width: 'default', align: 'default', position: 'default' },
  _motion: { animation: 'none', duration: 'normal' },
  _transform: {},
  _decoration: { borderStyle: 'none', blendMode: 'normal', overflow: 'visible' },
  _mask: { shape: 'none', size: 'contain', repeat: 'no-repeat' },
  _responsive: {},
  _attributes: {},
  _customCss: '',
}

/* ------------------------------------------------------------------ */
/* Value → CSS                                                         */
/* ------------------------------------------------------------------ */

/** Treats '' / undefined as unset so a blank control doesn't emit `0`. */
const val = (v?: string) => (v && v.trim() !== '' ? v.trim() : undefined)

/** Accepts a bare number as px, anything else verbatim (`2rem`, `5%`, `auto`). */
const len = (v?: string) => {
  const s = val(v)
  if (!s) return undefined
  return /^-?\d*\.?\d+$/.test(s) ? `${s}px` : s
}

const box = (b?: BoxValue) => {
  if (!b) return undefined
  const parts = [b.top, b.right, b.bottom, b.left].map(len)
  if (parts.every((p) => p === undefined)) return undefined
  return parts.map((p) => p ?? '0').join(' ')
}

const MASKS: Record<string, string> = {
  circle: 'radial-gradient(circle, #000 60%, transparent 62%)',
  flower:
    'radial-gradient(circle at 30% 30%, #000 40%, transparent 42%), radial-gradient(circle at 70% 70%, #000 40%, transparent 42%)',
  sketch: 'linear-gradient(135deg, #000 60%, transparent 62%)',
  triangle: 'conic-gradient(from 180deg at 50% 50%, #000 0deg 120deg, transparent 120deg)',
  blob: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 62%)',
}

const DURATIONS = { slow: '1200ms', normal: '800ms', fast: '450ms' }

/**
 * Turns the Advanced values into what the wrapper element needs.
 *
 * Returns style plus the class list and the id, so the caller spreads one
 * object rather than reaching into the shape in every block.
 */
export const applyAdvanced = (p: AdvancedProps = {}) => {
  const l = p._layout ?? {}
  const t = p._transform ?? {}
  const d = p._decoration ?? {}
  const m = p._mask ?? {}
  const r = p._responsive ?? {}
  const a = p._attributes ?? {}
  const mo = p._motion ?? {}

  const style: React.CSSProperties = {}

  // Layout
  const margin = box(l.margin)
  if (margin) style.margin = margin
  const padding = box(l.padding)
  if (padding) style.padding = padding

  if (l.width === 'full') style.width = '100%'
  else if (l.width === 'inline') style.width = 'auto'
  else if (l.width === 'custom' && len(l.customWidth))
    style.width = len(l.customWidth)

  if (l.align && l.align !== 'default') {
    style.alignSelf =
      l.align === 'start'
        ? 'flex-start'
        : l.align === 'end'
          ? 'flex-end'
          : 'center'
    // A block with a width narrower than its parent also needs a margin to
    // move; alignSelf alone only works inside a flex parent.
    if (l.align === 'center') style.marginInline = 'auto'
    else if (l.align === 'end') style.marginInlineStart = 'auto'
  }

  if (l.position && l.position !== 'default') {
    style.position = l.position
    if (len(l.offsetX)) style.left = len(l.offsetX)
    if (len(l.offsetY)) style.top = len(l.offsetY)
  }
  if (val(l.zIndex)) style.zIndex = Number(l.zIndex)

  // Transform
  const transforms: string[] = []
  if (val(t.offsetX) || val(t.offsetY))
    transforms.push(`translate(${len(t.offsetX) ?? '0'}, ${len(t.offsetY) ?? '0'})`)
  if (val(t.rotate)) transforms.push(`rotate(${t.rotate}deg)`)
  if (val(t.scale)) transforms.push(`scale(${t.scale})`)
  if (val(t.skewX) || val(t.skewY))
    transforms.push(`skew(${t.skewX ?? 0}deg, ${t.skewY ?? 0}deg)`)
  if (t.flipH) transforms.push('scaleX(-1)')
  if (t.flipV) transforms.push('scaleY(-1)')
  if (transforms.length) style.transform = transforms.join(' ')

  // Background & border
  if (val(d.gradient)) style.backgroundImage = d.gradient
  else if (val(d.background)) style.background = d.background
  if (d.borderStyle && d.borderStyle !== 'none') {
    style.borderStyle = d.borderStyle
    style.borderWidth = len(d.borderWidth) ?? '1px'
    style.borderColor = val(d.borderColor) ?? 'currentColor'
  }
  if (len(d.borderRadius)) style.borderRadius = len(d.borderRadius)
  if (val(d.boxShadow)) style.boxShadow = d.boxShadow
  if (val(d.opacity)) style.opacity = Number(d.opacity)
  if (d.blendMode && d.blendMode !== 'normal') style.mixBlendMode = d.blendMode as any
  if (d.overflow && d.overflow !== 'visible') style.overflow = d.overflow

  // Mask
  if (m.shape && m.shape !== 'none' && MASKS[m.shape]) {
    const image = MASKS[m.shape]
    style.maskImage = image
    style.WebkitMaskImage = image
    style.maskSize = m.size ?? 'contain'
    style.WebkitMaskSize = m.size ?? 'contain'
    style.maskPosition = val(m.position) ?? 'center'
    style.WebkitMaskPosition = val(m.position) ?? 'center'
    style.maskRepeat = m.repeat ?? 'no-repeat'
    style.WebkitMaskRepeat = m.repeat ?? 'no-repeat'
  }

  // Entrance animation. Driven by CSS in puck-theme.css against the data
  // attribute, so it also runs on the published page, not only in the editor.
  const animation = mo.animation && mo.animation !== 'none' ? mo.animation : undefined
  if (animation) {
    style.animationDuration = DURATIONS[mo.duration ?? 'normal']
    if (val(mo.delay)) style.animationDelay = `${mo.delay}ms`
  }

  const className = [
    val(a.cssClasses),
    r.hideDesktop && 'ax-hide-desktop',
    r.hideTablet && 'ax-hide-tablet',
    r.hideMobile && 'ax-hide-mobile',
  ]
    .filter(Boolean)
    .join(' ')

  return {
    id: val(a.cssId),
    className: className || undefined,
    style,
    // Spread conditionally: a key that is always present (even holding
    // undefined) would make the caller's "does this block need a wrapper at
    // all?" check always true, so every block would gain a wrapper div.
    ...(animation ? { 'data-anim': animation } : {}),
    ...parseAttributes(a.attributes),
  }
}

/**
 * `key|value` per line, matching Elementor's custom-attributes syntax.
 * Anything that isn't a plain data/aria attribute is dropped — a page
 * document should not be able to inject an event handler.
 */
const parseAttributes = (raw?: string): Record<string, string> => {
  if (!raw) return {}
  const out: Record<string, string> = {}
  for (const line of raw.split('\n')) {
    const [key, ...rest] = line.split('|')
    const name = key?.trim()
    if (!name || !rest.length) continue
    if (!/^(data-|aria-)[a-z0-9-]+$/i.test(name)) continue
    out[name] = rest.join('|').trim()
  }
  return out
}

/** Scopes the Custom CSS box to the widget, the way Elementor's `selector` does. */
export const scopedCss = (css?: string, id?: string) => {
  const body = val(css)
  if (!body || !id) return null
  return body.includes('selector')
    ? body.replace(/selector/g, `#${id}`)
    : `#${id}{${body}}`
}
