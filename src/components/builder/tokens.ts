/**
 * Builder design tokens.
 *
 * Every block in the library resolves its spacing, width, colour and type
 * through these maps rather than taking raw CSS. Two reasons:
 *
 *  1. Pages stay on-brand by construction — an editor can't pick an
 *     off-system value, so no page drifts away from the design language.
 *  2. The stored page JSON holds tokens ("lg", "surface"), not pixels, so
 *     re-theming the platform re-themes every page that was ever published
 *     without a data migration.
 */

export const SPACE = {
  none: '0px',
  xs: '8px',
  sm: '16px',
  md: '32px',
  lg: '56px',
  xl: '88px',
  '2xl': '128px',
} as const
export type Space = keyof typeof SPACE

export const spaceOptions = (
  Object.keys(SPACE) as Space[]
).map((value) => ({ label: value.toUpperCase(), value }))

export const WIDTH = {
  narrow: '720px',
  default: '1100px',
  wide: '1320px',
  full: '100%',
} as const
export type Width = keyof typeof WIDTH

export const widthOptions = (Object.keys(WIDTH) as Width[]).map((value) => ({
  label: value[0].toUpperCase() + value.slice(1),
  value,
}))

/** Surface names map to theme tokens, so pages follow light and dark. */
export const SURFACE = {
  none: 'transparent',
  page: 'hsl(var(--background))',
  surface: 'hsl(var(--card))',
  muted: 'hsl(var(--muted))',
  inverted: 'hsl(var(--foreground))',
  brand: 'hsl(var(--brand))',
} as const
export type Surface = keyof typeof SURFACE

export const surfaceOptions = (Object.keys(SURFACE) as Surface[]).map(
  (value) => ({ label: value[0].toUpperCase() + value.slice(1), value })
)

/** Text colour that stays readable on each surface. */
export const onSurface = (surface: Surface) =>
  surface === 'inverted'
    ? 'hsl(var(--background))'
    : surface === 'brand'
      ? 'hsl(var(--brand-foreground))'
      : 'hsl(var(--foreground))'

export const mutedOnSurface = (surface: Surface) =>
  surface === 'inverted' || surface === 'brand'
    ? 'color-mix(in srgb, currentColor 65%, transparent)'
    : 'hsl(var(--muted-foreground))'

export const ALIGN = ['left', 'center', 'right'] as const
export type Align = (typeof ALIGN)[number]

export const alignOptions = ALIGN.map((value) => ({
  label: value[0].toUpperCase() + value.slice(1),
  value,
}))

export const RADIUS = {
  none: '0px',
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  pill: 'var(--radius-pill)',
} as const
export type Radius = keyof typeof RADIUS

export const radiusOptions = (Object.keys(RADIUS) as Radius[]).map((value) => ({
  label: value.toUpperCase(),
  value,
}))

/**
 * Display scale. `display` and `title` use the serif; the rest are UI type.
 * Values are clamps so a page composed at desktop still reads on a phone
 * without the editor having to set per-breakpoint overrides.
 */
export const TYPE_SCALE = {
  display: {
    fontSize: 'clamp(2.5rem, 1.2rem + 4.2vw, 4.5rem)',
    lineHeight: '1.05',
    letterSpacing: '-0.035em',
    fontFamily: 'var(--font-display), Georgia, serif',
    fontWeight: 300,
  },
  title: {
    fontSize: 'clamp(1.9rem, 1.2rem + 2.4vw, 3rem)',
    lineHeight: '1.1',
    letterSpacing: '-0.03em',
    fontFamily: 'var(--font-display), Georgia, serif',
    fontWeight: 300,
  },
  heading: {
    fontSize: 'clamp(1.35rem, 1.1rem + 1vw, 1.75rem)',
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
    fontWeight: 500,
  },
  subheading: {
    fontSize: '1.05rem',
    lineHeight: '1.35',
    letterSpacing: '-0.01em',
    fontWeight: 500,
  },
  body: {
    fontSize: '1rem',
    lineHeight: '1.65',
    letterSpacing: '-0.005em',
    fontWeight: 400,
  },
  small: {
    fontSize: '0.875rem',
    lineHeight: '1.55',
    fontWeight: 400,
  },
} as const
export type TypeScale = keyof typeof TYPE_SCALE

export const typeOptions = (Object.keys(TYPE_SCALE) as TypeScale[]).map(
  (value) => ({ label: value[0].toUpperCase() + value.slice(1), value })
)
