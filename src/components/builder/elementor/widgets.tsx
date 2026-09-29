'use client'

import {
  IconAlignLeft,
  IconArrowsVertical,
  IconArticle,
  IconCards,
  IconChartBar,
  IconCircles,
  IconCode,
  IconColumns2,
  IconHandClick,
  IconHeading,
  IconHelpCircle,
  IconLayoutGrid,
  IconList,
  IconPhoto,
  IconQuote,
  IconSection,
  IconSeparatorHorizontal,
  IconSpeakerphone,
  IconStack2,
  IconSquareRounded,
  IconTag,
  IconVideo,
  type TablerIcon,
} from '@tabler/icons-react'

/**
 * Widget registry for the drawer.
 *
 * Elementor gives every widget a distinct outline mark and a short label.
 * These were previously hand-drawn SVGs that drifted in weight and optical
 * size; Tabler is a single 24px/1.75 stroke family, so the tile grid reads
 * evenly without per-icon tuning.
 *
 * Keyed by the component name in `puckConfig.components` — that is the only
 * identifier the `drawerItem` override receives.
 */

export const WIDGETS: Record<string, { label: string; Icon: TablerIcon }> = {
  // Layout
  Section: { label: 'Section', Icon: IconSection },
  Columns: { label: 'Columns', Icon: IconColumns2 },
  Stack: { label: 'Stack', Icon: IconStack2 },
  Card: { label: 'Card', Icon: IconCards },
  Spacer: { label: 'Spacer', Icon: IconArrowsVertical },
  Divider: { label: 'Divider', Icon: IconSeparatorHorizontal },
  // Content
  Heading: { label: 'Heading', Icon: IconHeading },
  Text: { label: 'Text', Icon: IconAlignLeft },
  Eyebrow: { label: 'Eyebrow', Icon: IconTag },
  Button: { label: 'Button', Icon: IconHandClick },
  Image: { label: 'Image', Icon: IconPhoto },
  List: { label: 'List', Icon: IconList },
  // Blocks
  Hero: { label: 'Hero', Icon: IconArticle },
  FeatureGrid: { label: 'Feature grid', Icon: IconLayoutGrid },
  Stats: { label: 'Stats', Icon: IconChartBar },
  Testimonial: { label: 'Testimonial', Icon: IconQuote },
  LogoRow: { label: 'Logo row', Icon: IconCircles },
  FAQ: { label: 'FAQ', Icon: IconHelpCircle },
  CTA: { label: 'Call to action', Icon: IconSpeakerphone },
  // Media
  Video: { label: 'Video', Icon: IconVideo },
  Embed: { label: 'Embed', Icon: IconCode },
}

/** Falls back to a neutral mark so an unregistered block still renders. */
export const widgetFor = (name: string) =>
  WIDGETS[name] ?? { label: name, Icon: IconSquareRounded }
