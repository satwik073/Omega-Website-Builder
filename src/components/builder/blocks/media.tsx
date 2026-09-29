import type { ComponentConfig } from '@puckeditor/core'
import React from 'react'

import { RADIUS, radiusOptions, type Radius } from '../tokens'

/** Turns a YouTube or Vimeo page URL into its embed form. */
const toEmbedUrl = (url: string) => {
  if (!url) return ''
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/
  )
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`
  return url
}

export type VideoBlockProps = {
  url: string
  ratio: '16/9' | '4/3' | '1/1'
  radius: Radius
}

export const VideoBlock: ComponentConfig<VideoBlockProps> = {
  label: 'Video',
  fields: {
    url: { type: 'text', label: 'YouTube or Vimeo URL' },
    ratio: {
      type: 'radio',
      label: 'Aspect ratio',
      options: [
        { label: '16:9', value: '16/9' },
        { label: '4:3', value: '4/3' },
        { label: 'Square', value: '1/1' },
      ],
    },
    radius: { type: 'select', label: 'Corner radius', options: radiusOptions },
  },
  defaultProps: { url: '', ratio: '16/9', radius: 'md' },
  render: ({ url, ratio, radius }) => {
    const src = toEmbedUrl(url)
    const frame: React.CSSProperties = {
      width: '100%',
      aspectRatio: ratio,
      borderRadius: RADIUS[radius],
      overflow: 'hidden',
      background: 'hsl(var(--muted))',
    }

    if (!src) {
      return (
        <div
          style={{
            ...frame,
            display: 'grid',
            placeItems: 'center',
            border: '1px dashed hsl(var(--border))',
            fontSize: 12,
            opacity: 0.6,
          }}
        >
          Add a video URL
        </div>
      )
    }

    return (
      <div style={frame}>
        <iframe
          src={src}
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
        />
      </div>
    )
  },
}

export type EmbedBlockProps = {
  url: string
  height: number
  radius: Radius
}

export const EmbedBlock: ComponentConfig<EmbedBlockProps> = {
  label: 'Embed',
  fields: {
    url: { type: 'text', label: 'URL to embed' },
    height: { type: 'number', label: 'Height (px)', min: 120, max: 1600 },
    radius: { type: 'select', label: 'Corner radius', options: radiusOptions },
  },
  defaultProps: { url: '', height: 420, radius: 'md' },
  render: ({ url, height, radius }) => {
    const frame: React.CSSProperties = {
      width: '100%',
      height,
      borderRadius: RADIUS[radius],
      overflow: 'hidden',
      background: 'hsl(var(--muted))',
    }

    if (!url) {
      return (
        <div
          style={{
            ...frame,
            display: 'grid',
            placeItems: 'center',
            border: '1px dashed hsl(var(--border))',
            fontSize: 12,
            opacity: 0.6,
          }}
        >
          Add a URL to embed
        </div>
      )
    }

    return (
      <div style={frame}>
        {/* Sandboxed: embedded pages are third-party and must not be able to
            navigate the parent or reach same-origin storage. */}
        <iframe
          src={url}
          title="Embedded content"
          loading="lazy"
          sandbox="allow-scripts allow-forms allow-popups allow-presentation"
          style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
        />
      </div>
    )
  },
}
