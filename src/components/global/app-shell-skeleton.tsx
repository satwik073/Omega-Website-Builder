import { Shimmer } from '@/components/global/states'
import React from 'react'

/**
 * Route-level loading state for the authenticated app.
 *
 * Renders the shape of the workspace — sidebar, topbar, header, content —
 * rather than a spinner on an empty screen, so the layout doesn't jump when
 * the real page arrives.
 */
const AppShellSkeleton = () => (
  <div className="flex min-h-screen" aria-busy aria-live="polite" aria-label="Loading">
    <aside className="hidden w-[272px] shrink-0 flex-col gap-6 border-r border-border p-3 md:flex">
      <Shimmer className="h-[52px] rounded-md" />
      <div className="flex flex-col gap-1.5">
        {Array.from({ length: 6 }, (_, i) => (
          <Shimmer key={i} className="h-9 rounded-md" />
        ))}
      </div>
    </aside>

    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex h-14 items-center justify-between border-b border-border px-6">
        <Shimmer className="h-4 w-28" />
        <Shimmer className="size-8 rounded-full" />
      </div>

      <div className="flex flex-col gap-8 px-4 pb-16 pt-10 md:px-8">
        <div className="flex flex-col gap-3 border-b border-border pb-6">
          <Shimmer className="h-8 w-56" />
          <Shimmer className="h-4 w-80" />
        </div>
        <div className="grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="flex flex-col gap-4 bg-background p-6">
              <Shimmer className="h-3 w-24" />
              <Shimmer className="h-8 w-32" />
              <Shimmer className="h-3 w-40" />
            </div>
          ))}
        </div>
        <Shimmer className="h-72 rounded-card" />
      </div>
    </div>
  </div>
)

export default AppShellSkeleton
