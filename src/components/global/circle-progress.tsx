'use client'
import { ProgressCircle } from '@tremor/react'
import React from 'react'

type Props = {
  value: number
  description: React.ReactNode
}

const CircleProgress = ({ description, value = 0 }: Props) => {
  // Tremor renders NaN as-is; clamp so a bad upstream value can't leak.
  const safe = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0
  return (
    <div className="flex gap-4 items-center">
      <ProgressCircle
        showAnimation={true}
        value={safe}
        radius={70}
        strokeWidth={20}
      >
        {safe}%
      </ProgressCircle>
      <div>
        <b>Closing Rate</b>
        {/* `description` is rich content, so this cannot be a <p> — a <div>
            inside a <p> is invalid HTML and broke hydration. */}
        <div className="text-muted-foreground">{description}</div>
      </div>
    </div>
  )
}

export default CircleProgress
