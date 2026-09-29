import { cn } from '@/lib/utils'
import React from 'react'

/**
 * Settings section: a description column beside the controls.
 *
 * Settings pages become unreadable as one long stack of inputs. Pairing each
 * group with a short explanation on the left gives the page structure and
 * gives every field somewhere for its "why" to live.
 */
export const SettingsSection = ({
  title,
  description,
  children,
  className,
}: {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}) => (
  <section
    className={cn(
      'grid gap-6 border-b border-border py-8 first:pt-6 last:border-0 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-12',
      className
    )}
  >
    <div className="lg:sticky lg:top-20 lg:self-start">
      <h2 className="text-[14px] font-medium">{title}</h2>
      {description && (
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>

    <div className="min-w-0">{children}</div>
  </section>
)

export default SettingsSection
