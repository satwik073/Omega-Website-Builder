import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import React from 'react'

export type SetupStep = {
  id: string
  title: string
  description: string
  done: boolean
  icon?: React.ReactNode
  action?: React.ReactNode
}

/**
 * Setup checklist.
 *
 * Shows progress explicitly — an onboarding list without a sense of how far
 * along you are gives no reason to finish it. Completed steps stay visible
 * but recede, so the remaining work is what stands out.
 */
export const SetupChecklist = ({ steps }: { steps: SetupStep[] }) => {
  const done = steps.filter((s) => s.done).length
  const pct = steps.length ? Math.round((done / steps.length) * 100) : 0

  return (
    <div className="max-w-3xl">
      <div className="mb-5 flex items-center gap-4">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-slow ease-standard"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="shrink-0 text-[12.5px] tabular-nums text-muted-foreground">
          {done} of {steps.length} complete
        </span>
      </div>

      <ol className="flex flex-col gap-2.5">
        {steps.map((step) => (
          <li
            key={step.id}
            className={cn(
              'flex items-center justify-between gap-4 rounded-card border p-4 transition-colors',
              step.done
                ? 'border-border bg-muted/40'
                : 'border-border bg-card hover:border-muted-foreground/25'
            )}
          >
            <div className="flex min-w-0 items-center gap-3.5">
              <span
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-sm border',
                  step.done
                    ? 'border-success/25 bg-success/10 text-success'
                    : 'border-border bg-background text-muted-foreground'
                )}
              >
                {step.done ? <Check className="size-4" /> : step.icon}
              </span>

              <div className="min-w-0">
                <p
                  className={cn(
                    'text-[13px] font-medium',
                    step.done && 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </p>
                <p className="truncate text-[12px] text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              {step.done ? (
                <span className="text-[12px] font-medium text-success">Done</span>
              ) : (
                step.action
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default SetupChecklist
