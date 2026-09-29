import type { Field } from '@puckeditor/core'
import type React from 'react'

/**
 * Elementor's shared Style-tab controls: the Typography group, text colour,
 * text shadow and text stroke.
 *
 * These are set on the widget wrapper and inherit down, which is why one set
 * covers every block rather than each one re-declaring its own font controls.
 * Block-specific style fields (surface, radius, columns…) stay on the block.
 */

export type StyleProps = {
  _typography?: {
    fontFamily?: 'inherit' | 'sans' | 'display' | 'mono'
    fontSize?: string
    fontWeight?: string
    textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
    fontStyle?: 'normal' | 'italic'
    textDecoration?: 'none' | 'underline' | 'line-through' | 'overline'
    lineHeight?: string
    letterSpacing?: string
    wordSpacing?: string
    textAlign?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  }
  _textColor?: string
  _textShadow?: {
    color?: string
    x?: string
    y?: string
    blur?: string
  }
  _textStroke?: {
    width?: string
    color?: string
  }
}

const opt = <T extends string>(values: readonly T[]) =>
  values.map((v) => ({
    label: v[0].toUpperCase() + v.slice(1).replace(/-/g, ' '),
    value: v,
  }))

export const styleFields: Record<string, Field> = {
  _typography: {
    type: 'object',
    label: 'Typography',
    objectFields: {
      fontFamily: {
        type: 'select',
        label: 'Font family',
        options: [
          { label: 'Inherit', value: 'inherit' },
          { label: 'Sans', value: 'sans' },
          { label: 'Display (serif)', value: 'display' },
          { label: 'Mono', value: 'mono' },
        ],
      },
      fontSize: { type: 'text', label: 'Font size' },
      fontWeight: {
        type: 'select',
        label: 'Font weight',
        options: [
          { label: 'Default', value: '' },
          ...['100', '200', '300', '400', '500', '600', '700', '800', '900'].map(
            (v) => ({ label: v, value: v })
          ),
        ],
      },
      textTransform: {
        type: 'select',
        label: 'Text transform',
        options: opt(['none', 'uppercase', 'lowercase', 'capitalize'] as const),
      },
      fontStyle: {
        type: 'select',
        label: 'Font style',
        options: opt(['normal', 'italic'] as const),
      },
      textDecoration: {
        type: 'select',
        label: 'Text decoration',
        options: opt(['none', 'underline', 'line-through', 'overline'] as const),
      },
      lineHeight: { type: 'text', label: 'Line height' },
      letterSpacing: { type: 'text', label: 'Letter spacing' },
      wordSpacing: { type: 'text', label: 'Word spacing' },
      textAlign: {
        type: 'select',
        label: 'Text align',
        options: opt(['inherit', 'left', 'center', 'right', 'justify'] as const),
      },
    },
  },

  _textColor: { type: 'text', label: 'Text colour' },

  _textShadow: {
    type: 'object',
    label: 'Text shadow',
    objectFields: {
      color: { type: 'text', label: 'Shadow colour' },
      x: { type: 'text', label: 'Horizontal' },
      y: { type: 'text', label: 'Vertical' },
      blur: { type: 'text', label: 'Blur' },
    },
  },

  _textStroke: {
    type: 'object',
    label: 'Text stroke',
    objectFields: {
      width: { type: 'text', label: 'Stroke width' },
      color: { type: 'text', label: 'Stroke colour' },
    },
  },
}

export const styleDefaults: StyleProps = {
  _typography: { fontFamily: 'inherit', textAlign: 'inherit' },
  _textShadow: {},
  _textStroke: {},
}

const val = (v?: string) => (v && v.trim() !== '' ? v.trim() : undefined)

const len = (v?: string) => {
  const s = val(v)
  if (!s) return undefined
  return /^-?\d*\.?\d+$/.test(s) ? `${s}px` : s
}

const FAMILIES: Record<string, string> = {
  sans: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif',
  display: 'var(--font-display), Georgia, serif',
  mono: 'var(--font-mono), ui-monospace, monospace',
}

/** Style values → the CSS the widget wrapper carries. */
export const applyStyle = (p: StyleProps = {}): React.CSSProperties => {
  const t = p._typography ?? {}
  const sh = p._textShadow ?? {}
  const st = p._textStroke ?? {}
  const style: React.CSSProperties = {}

  if (t.fontFamily && t.fontFamily !== 'inherit')
    style.fontFamily = FAMILIES[t.fontFamily]
  if (len(t.fontSize)) style.fontSize = len(t.fontSize)
  if (val(t.fontWeight)) style.fontWeight = Number(t.fontWeight)
  if (t.textTransform && t.textTransform !== 'none')
    style.textTransform = t.textTransform
  if (t.fontStyle && t.fontStyle !== 'normal') style.fontStyle = t.fontStyle
  if (t.textDecoration && t.textDecoration !== 'none')
    style.textDecoration = t.textDecoration
  // Unitless line-height is the useful default, so it is not run through len().
  if (val(t.lineHeight)) style.lineHeight = t.lineHeight
  if (len(t.letterSpacing)) style.letterSpacing = len(t.letterSpacing)
  if (len(t.wordSpacing)) style.wordSpacing = len(t.wordSpacing)
  if (t.textAlign && t.textAlign !== 'inherit') style.textAlign = t.textAlign

  if (val(p._textColor)) style.color = p._textColor

  if (val(sh.color) || val(sh.x) || val(sh.y) || val(sh.blur)) {
    style.textShadow = `${len(sh.x) ?? '0'} ${len(sh.y) ?? '0'} ${
      len(sh.blur) ?? '0'
    } ${val(sh.color) ?? 'currentColor'}`
  }

  if (len(st.width)) {
    style.WebkitTextStrokeWidth = len(st.width)
    style.WebkitTextStrokeColor = val(st.color) ?? 'currentColor'
  }

  return style
}
