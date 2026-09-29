'use client'

import type { Overrides } from '@puckeditor/core'
import React, { useState } from 'react'

import { cn } from '@/lib/utils'
import { GROUP_LABELS, groupForField, type FieldGroup } from './field-groups'
import { widgetFor } from './widgets'

/**
 * Elementor's Content / Style / Advanced tab strip.
 *
 * Every field stays mounted; the inactive groups are hidden in CSS against
 * the `data-field-group` stamped by the `fieldLabel` override. Unmounting
 * them on tab change would discard focus and any in-progress edit.
 */
const FieldTabs = ({ children }: { children: React.ReactNode }) => {
  const [tab, setTab] = useState<FieldGroup>('content')
  const tabs: FieldGroup[] = ['content', 'style', 'advanced']

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        role="tablist"
        className="grid shrink-0 grid-cols-3 border-b border-border"
      >
        {tabs.map((id) => (
          <button
            key={id}
            role="tab"
            type="button"
            onClick={() => setTab(id)}
            aria-selected={tab === id}
            className={cn(
              'border-b-2 py-2.5 text-[11px] font-medium uppercase tracking-[0.06em] transition-colors',
              tab === id
                ? 'border-brand text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            {GROUP_LABELS[id]}
          </button>
        ))}
      </div>
      <div
        className="no-scrollbar min-h-0 flex-1 overflow-y-auto"
        data-active-group={tab}
      >
        {children}
      </div>
    </div>
  )
}

/**
 * Puck overrides that turn the default chrome into the Elementor layout.
 *
 * Only presentation is replaced — drag sources, field state and selection
 * still come from Puck, so behaviour is unchanged.
 */
export const elementorOverrides: Partial<Overrides> = {
  /** Wraps the settings panel in Elementor's three tabs. */
  fields: ({ children }) => <FieldTabs>{children}</FieldTabs>,

  /**
   * Stamps each field with the tab it belongs to. The settings panel then
   * shows one group at a time in CSS, which keeps every field mounted so
   * focus and in-progress edits survive a tab switch.
   */
  fieldLabel: ({ children, label, icon, el = 'label', readOnly, className }) => {
    const Tag = el as 'label' | 'div'
    return (
      <Tag
        data-field-group={groupForField(label)}
        data-readonly={readOnly || undefined}
        className={className}
        // No `display` here: an inline style would beat the stylesheet rule
        // that hides fields belonging to the inactive tab.
        style={{ padding: '12px 16px' }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 6,
            fontSize: 12,
            fontWeight: 500,
            color: 'hsl(var(--muted-foreground))',
          }}
        >
          {icon}
          {label}
        </span>
        {children}
      </Tag>
    )
  },

  /**
   * Widget tile: icon over a label, two per row.
   *
   * Puck passes its own rendered item as `children` — a bordered box holding
   * the label and a drag handle. Rendering that inside a tile produced a card
   * within a card (the label floating in its own panel over the icon), which
   * is what this replaces. Dropping `children` is safe: the drag ref lives on
   * the wrapper Puck puts *around* this node, not on the node itself.
   */
  drawerItem: ({ name }) => {
    const { label, Icon } = widgetFor(name)
    return (
      <div
        data-widget-name={name}
        title={label}
        className="group flex h-[74px] cursor-grab select-none flex-col items-center justify-center gap-1.5 rounded-sm border border-border bg-background px-1.5 text-center transition-colors duration-fast hover:border-brand hover:bg-accent active:cursor-grabbing"
      >
        <Icon
          aria-hidden
          size={22}
          stroke={1.5}
          className="text-muted-foreground transition-colors group-hover:text-brand"
        />
        <span className="w-full truncate text-[11px] leading-tight text-foreground">
          {label}
        </span>
      </div>
    )
  },
}

export default elementorOverrides
