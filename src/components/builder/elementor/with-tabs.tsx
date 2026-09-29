'use client'

import React from 'react'

import {
  advancedDefaults,
  advancedFields,
  applyAdvanced,
  scopedCss,
} from './advanced'
import { applyStyle, styleDefaults, styleFields } from './style'

/**
 * Puck's `ComponentConfig` generic is parameterised by a params object rather
 * than a props type, and the exact shape differs per block. Since this only
 * merges fields and wraps `render`, the block config passes through as an
 * opaque value — `puckConfig` casts the finished map to `Config['components']`.
 */
type AnyComponentConfig = {
  fields?: Record<string, unknown>
  defaultProps?: Record<string, unknown>
  render: (props: any) => React.ReactNode
  [key: string]: unknown
}

/**
 * Gives a block Elementor's shared Style and Advanced tabs.
 *
 * In Elementor every widget carries the same Advanced tab and the same
 * typography group, no matter what it renders. Rather than copy those ~40
 * controls into each of our blocks, this merges them in and wraps the block's
 * own `render` in an element that carries the resulting CSS.
 *
 * The block keeps full ownership of its Content fields and its markup; this
 * only adds an outer element, so a block can be written without knowing the
 * tabs exist.
 */
export const withElementorTabs = (
  component: AnyComponentConfig
): AnyComponentConfig => {
  const base = component

  return {
    ...base,

    fields: {
      ...(base.fields ?? {}),
      ...styleFields,
      ...advancedFields,
    },

    defaultProps: {
      ...(base.defaultProps ?? {}),
      ...styleDefaults,
      ...advancedDefaults,
    },

    render: (props: any) => {
      const { id, className, style, ...attrs } = applyAdvanced(props)
      const css = scopedCss(props._customCss, id)

      const merged: React.CSSProperties = {
        ...applyStyle(props),
        ...style,
      }

      // An unstyled block should not gain a wrapper that could break a
      // layout (a grid child, say), so the element is only emitted when it
      // actually carries something.
      const bare =
        !id &&
        !className &&
        !css &&
        Object.keys(merged).length === 0 &&
        Object.keys(attrs).length === 0

      if (bare) return base.render(props)

      return (
        <>
          {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
          <div id={id} className={className} style={merged} {...attrs}>
            {base.render(props)}
          </div>
        </>
      )
    },
  }
}

/** Applies the tabs across a whole component map. */
export const withElementorTabsAll = <T extends Record<string, any>>(
  components: T
): T =>
  Object.fromEntries(
    Object.entries(components).map(([name, config]) => [
      name,
      withElementorTabs(config as unknown as AnyComponentConfig),
    ])
  ) as T
