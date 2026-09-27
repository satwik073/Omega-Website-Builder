import Image from 'next/image'
import React from 'react'
import { img } from './images'

/**
 * A photo from the Unsplash CDN, filling its (positioned) parent.
 *
 * These are deliberately `unoptimized`. `img()` already asks the CDN for the
 * exact crop and pixel size the slot needs, with `auto=format` so the CDN
 * negotiates AVIF/WebP itself — so Next's optimizer would only re-encode an
 * already-optimal image. It was also timing out (504) on larger crops in
 * dev, which left slots blank. Going straight to the CDN is both faster and
 * one less thing to fail.
 */
export const Photo = ({
  file,
  w,
  h,
  alt,
  crop = 'entropy',
  sizes,
  priority,
  className = 'object-cover',
}: {
  file: string
  w: number
  h: number
  alt: string
  crop?: 'entropy' | 'faces' | 'edges' | 'center'
  sizes?: string
  priority?: boolean
  className?: string
}) => (
  <Image
    src={img(file, w, h, crop)}
    alt={alt}
    fill
    unoptimized
    priority={priority}
    sizes={sizes}
    className={className}
  />
)

export default Photo
