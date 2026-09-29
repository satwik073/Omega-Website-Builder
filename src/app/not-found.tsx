import { BrandLockup } from '@/components/global/brand-mark'
import Link from 'next/link'
import React from 'react'

/**
 * Global 404.
 *
 * Reached from three very different places — a mistyped app route, a
 * subdomain with no matching funnel, and a published page whose path does not
 * exist — so the copy stays specific about what is missing without guessing
 * which case it is, and always offers a way out.
 */
const NotFound = () => (
  <main className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
    {/* Quiet background: one large numeral, clipped by the viewport. */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <span className="select-none font-display text-[46vw] font-light leading-none tracking-[-0.06em] text-foreground/[0.035]">
        404
      </span>
    </div>

    <header className="relative z-10 px-6 py-6 md:px-12">
      <Link href="/site" className="inline-block transition-opacity hover:opacity-70">
        <BrandLockup />
      </Link>
    </header>

    <div className="relative z-10 flex flex-1 items-center px-6 pb-24 md:px-12">
      <div className="w-full max-w-xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          Error 404
        </p>

        <h1 className="mt-5 font-display text-[clamp(2.25rem,1.4rem+3.4vw,3.75rem)] font-light leading-[1.05] tracking-[-0.035em]">
          We couldn&rsquo;t find that page
        </h1>

        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          The link may be out of date, or the page may have been renamed,
          unpublished, or never existed. Nothing is broken on your end.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/site"
            className="inline-flex h-11 items-center rounded-sm bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Go to homepage
          </Link>
          <Link
            href="/agency"
            className="inline-flex h-11 items-center rounded-sm border border-border px-6 text-sm font-medium transition-colors hover:bg-muted"
          >
            Open dashboard
          </Link>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-[13px] text-muted-foreground">
            If you reached this from a published site, the page may not have
            been published yet — check the funnel&rsquo;s pages in your
            dashboard.
          </p>
        </div>
      </div>
    </div>
  </main>
)

export default NotFound
