'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useState } from 'react'

/**
 * Logo for an agency or sub-account, with an initials fallback.
 *
 * These logos are user-uploaded and routinely missing (the column defaults to
 * an empty string) or dead. Passing `""` to next/image throws and makes the
 * browser refetch the page, so every consumer has to guard the src — this
 * puts that guard in one place, along with a fallback that keeps grids and
 * rows visually even instead of collapsing to broken-image alt text.
 */
export const EntityLogo = ({
  src,
  name,
  className,
  imageClassName,
  /** Set when the parent is `relative` and sized; the image will fill it. */
  fill = false,
  size = 40,
  rounded = 'md',
}: {
  src?: string | null
  name: string
  className?: string
  imageClassName?: string
  fill?: boolean
  size?: number
  rounded?: 'md' | 'full' | 'none'
}) => {
  const [failed, setFailed] = useState(false)
  const valid = typeof src === 'string' && src.trim().length > 0 && !failed

  const radius =
    rounded === 'full' ? 'rounded-full' : rounded === 'md' ? 'rounded-md' : ''

  if (!valid) {
    return (
      <span
        className={cn(
          'flex shrink-0 items-center justify-center bg-muted text-muted-foreground',
          radius,
          className
        )}
        style={fill ? undefined : { width: size, height: size }}
        aria-hidden
      >
        <span
          className="font-medium leading-none"
          style={{ fontSize: Math.max(10, Math.round((fill ? 48 : size) * 0.4)) }}
        >
          {name.slice(0, 2).toUpperCase()}
        </span>
      </span>
    )
  }

  if (fill) {
    return (
      <Image
        src={src as string}
        alt=""
        fill
        className={cn('object-contain', imageClassName)}
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <Image
      src={src as string}
      alt=""
      width={size}
      height={size}
      className={cn('object-contain', radius, className, imageClassName)}
      onError={() => setFailed(true)}
    />
  )
}

export default EntityLogo
