import { BrandLockup } from '@/components/global/brand-mark'
import { Button } from '@/components/ui/button'
import { ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

/**
 * Shown when a signed-in user reaches a workspace they have no permission for.
 * Deliberately distinct from the 404: the page exists, the access doesn't, so
 * the way forward is to switch account or ask an owner — not to go home.
 */
const Unauthorized = () => (
  <main className="flex min-h-screen flex-col bg-background text-foreground">
    <header className="px-6 py-6 md:px-12">
      <Link href="/site" className="inline-block transition-opacity hover:opacity-70">
        <BrandLockup />
      </Link>
    </header>

    <div className="flex flex-1 items-center px-6 pb-24 md:px-12">
      <div className="w-full max-w-lg">
        <span className="mb-6 flex size-11 items-center justify-center rounded-md border border-warning/25 bg-warning/10 text-warning">
          <ShieldAlert className="size-5" />
        </span>

        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          Error 403
        </p>

        <h1 className="mt-4 font-display text-[clamp(2rem,1.3rem+2.6vw,3rem)] font-light leading-[1.08] tracking-[-0.035em]">
          You don&rsquo;t have access here
        </h1>

        <p className="mt-4 max-w-md text-[14px] leading-relaxed text-muted-foreground">
          Your account is signed in, but it hasn&rsquo;t been given permission
          for this workspace. An agency owner or admin can grant it from the
          Team page.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/agency">Switch workspace</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/site">Back to site</Link>
          </Button>
        </div>
      </div>
    </div>
  </main>
)

export default Unauthorized
