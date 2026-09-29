/**
 * Which panel tab each field belongs to.
 *
 * Elementor splits a widget's settings into Content / Style / Advanced. Puck
 * has one flat field list per component, so the grouping lives here, keyed by
 * the field's label — labels come from the shared field definitions in
 * `shared.tsx`, `tokens.ts`, `style.ts` and `advanced.ts`, so they are
 * consistent across the library.
 *
 * Anything not listed falls into Content, which is the right default: a new
 * field shows up somewhere useful rather than disappearing.
 *
 * Only the *top-level* label matters. Puck nests an `object` field's
 * sub-fields inside their parent's wrapper, so grouping the parent takes the
 * whole group with it.
 */

export type FieldGroup = 'content' | 'style' | 'advanced'

const STYLE_FIELDS = [
  // Shared Style tab (style.ts)
  'Typography',
  'Text colour',
  'Text shadow',
  'Text stroke',
  // Block-level appearance
  'Background',
  'Panel background',
  'Page background',
  'Content width',
  'Align',
  'Alignment',
  'Size',
  'Style',
  'Corner radius',
  'Border',
  'Max width',
  'Max width (e.g. 640px)',
  'Max width (e.g. 620px)',
  'Emphasis',
  'Gap',
  'Gap between items',
  'Padding',
  'Padding top/bottom',
  'Padding left/right',
  'Spacing',
  'Height',
  'Aspect ratio',
  'Fit',
  'Layout',
  'Columns',
  'Vertical align',
  'Direction',
  'Wrap',
  'Width',
  'Marker',
  'Accent dot',
  'Height (px)',
]

const ADVANCED_FIELDS = [
  // Shared Advanced tab (advanced.ts)
  'Layout & spacing',
  'Motion effects',
  'Transform',
  'Background & border',
  'Mask',
  'Responsive',
  'Attributes',
  'Custom CSS',
  // Pre-existing per-block advanced controls
  'Anchor id',
  'On mobile',
  'Open in',
  'Heading level',
  'Hide on',
  'CSS classes',
]

const index = new Map<string, FieldGroup>()
STYLE_FIELDS.forEach((label) => index.set(label, 'style'))
ADVANCED_FIELDS.forEach((label) => index.set(label, 'advanced'))

export const groupForField = (label?: string): FieldGroup =>
  (label && index.get(label)) || 'content'

export const GROUP_LABELS: Record<FieldGroup, string> = {
  content: 'Content',
  style: 'Style',
  advanced: 'Advanced',
}
