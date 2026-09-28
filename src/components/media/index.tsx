'use client'

import { EmptyState } from '@/components/global/states'
import { Input } from '@/components/ui/input'
import { GetMediaFiles } from '@/lib/types'
import { FolderSearch, Search } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import MediaCard from './media-card'
import MediaUploadButton from './upload-buttons'

type Props = {
  data: GetMediaFiles
  subaccountId: string
}

/**
 * Media library.
 *
 * Previously built on `Command`, which rendered two competing empty states —
 * `CommandEmpty` ("No media files") *and* a hand-rolled block below it — and
 * a stray "Files" group heading. It is now a plain filtered grid with a
 * single empty state per situation: nothing uploaded, or nothing matching.
 */
const MediaComponent = ({ data, subaccountId }: Props) => {
  const [query, setQuery] = useState('')

  const files = data?.Media ?? []
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return files
    return files.filter((file) => file.name.toLowerCase().includes(q))
  }, [files, query])

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search file name…"
            aria-label="Search media"
            className="pl-9"
          />
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {files.length > 0 && (
            <p className="text-sm text-muted-foreground tabular-nums">
              {filtered.length} of {files.length}
            </p>
          )}
          <MediaUploadButton subaccountId={subaccountId} />
        </div>
      </div>

      {files.length === 0 ? (
        <EmptyState
          icon={<FolderSearch />}
          title="No files yet"
          description="Upload images and assets here to use them across this sub account's funnels and pages."
          action={<MediaUploadButton subaccountId={subaccountId} />}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Search />}
          title={`No files matching “${query}”`}
          description="Try part of the file name instead."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((file) => (
            <MediaCard key={file.id} file={file} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MediaComponent
