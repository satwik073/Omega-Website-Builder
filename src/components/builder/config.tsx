import type { Config } from '@puckeditor/core'
import React from 'react'

import {
  CardBlock,
  ColumnsBlock,
  DividerBlock,
  SectionBlock,
  SpacerBlock,
  StackBlock,
} from './blocks/layout'
import {
  ButtonBlock,
  EyebrowBlock,
  HeadingBlock,
  ImageBlock,
  ListBlock,
  TextBlock,
} from './blocks/content'
import {
  CtaBlock,
  FaqBlock,
  FeatureGridBlock,
  HeroBlock,
  LogoRowBlock,
  StatsBlock,
  TestimonialBlock,
} from './blocks/marketing'
import { EmbedBlock, VideoBlock } from './blocks/media'
import { withElementorTabsAll } from './elementor/with-tabs'
import { SURFACE, type Surface } from './tokens'

/**
 * The Arobix block library.
 *
 * Every component here is ours — none of Puck's example components are used.
 * They share one token set (see tokens.ts), so pages stay on-brand by
 * construction and a theme change propagates to every page already published.
 *
 * Adding a block is a three-line change: build it, export it, list it in a
 * category below.
 */

export type RootProps = {
  title: string
  description: string
  background: Surface
  maxWidth: string
}

export const puckConfig: Config = {
  root: {
    label: 'Page',
    fields: {
      title: { type: 'text', label: 'Page title' },
      description: { type: 'textarea', label: 'Meta description' },
      background: {
        type: 'select',
        label: 'Page background',
        options: (Object.keys(SURFACE) as Surface[]).map((value) => ({
          label: value[0].toUpperCase() + value.slice(1),
          value,
        })),
      },
    },
    defaultProps: {
      title: 'Untitled page',
      description: '',
      background: 'page',
      maxWidth: '',
    },
    render: ({ children, background }: any) => (
      <div
        style={{
          background: SURFACE[(background as Surface) ?? 'page'],
          color: 'hsl(var(--foreground))',
          minHeight: '100%',
          fontFamily: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif',
        }}
      >
        {children}
      </div>
    ),
  },

  categories: {
    layout: {
      title: 'Layout',
      components: ['Section', 'Columns', 'Stack', 'Card', 'Spacer', 'Divider'],
    },
    content: {
      title: 'Content',
      components: ['Heading', 'Text', 'Eyebrow', 'Button', 'Image', 'List'],
    },
    blocks: {
      title: 'Blocks',
      components: [
        'Hero',
        'FeatureGrid',
        'Stats',
        'Testimonial',
        'LogoRow',
        'FAQ',
        'CTA',
      ],
    },
    media: {
      title: 'Media',
      components: ['Video', 'Embed'],
    },
  },

  /**
   * Every block is passed through `withElementorTabsAll`, which merges in the
   * shared Style (typography, text shadow/stroke) and Advanced (layout,
   * motion, transform, background, mask, responsive, attributes, custom CSS)
   * field sets and applies the resulting CSS. Blocks below declare only their
   * own Content fields — the two shared tabs come for free, the way an
   * Elementor widget inherits them.
   */
  components: withElementorTabsAll({
    // Layout
    Section: SectionBlock,
    Columns: ColumnsBlock,
    Stack: StackBlock,
    Card: CardBlock,
    Spacer: SpacerBlock,
    Divider: DividerBlock,
    // Content
    Heading: HeadingBlock,
    Text: TextBlock,
    Eyebrow: EyebrowBlock,
    Button: ButtonBlock,
    Image: ImageBlock,
    List: ListBlock,
    // Blocks
    Hero: HeroBlock,
    FeatureGrid: FeatureGridBlock,
    Stats: StatsBlock,
    Testimonial: TestimonialBlock,
    LogoRow: LogoRowBlock,
    FAQ: FaqBlock,
    CTA: CtaBlock,
    // Media
    Video: VideoBlock,
    Embed: EmbedBlock,
  }) as Config['components'],
}

export default puckConfig
