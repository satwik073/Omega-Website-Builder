import { BrandLockup } from '@/components/global/brand-mark'
import { ConfigurationSchema } from '@/lib/structures'
import Link from 'next/link'
import React from 'react'

const QUOTES = [
  {
    body: 'Design, publish and manage every client site from one workspace.',
    caption: 'Built for agencies',
  },
]

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const brand = ConfigurationSchema?.PRODUCT_EXTRACTED_FILE || 'Arobix'

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Form column */}
      <div className="flex flex-col px-6 py-8 md:px-12">
        <Link href="/site" className="w-fit transition-opacity hover:opacity-70">
          <BrandLockup />
        </Link>

        <div className="flex flex-1 items-center justify-center py-12">
          {children}
        </div>

        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {brand}
        </p>
      </div>

      {/* Editorial column */}
      <div className="relative hidden flex-col justify-between bg-foreground p-12 text-background lg:flex">
        <span className="eyebrow !text-background/50">{QUOTES[0].caption}</span>

        <blockquote className="max-w-md">
          <p className="display-sm">{QUOTES[0].body}</p>
        </blockquote>

        <div className="flex items-center gap-8 text-sm text-background/50">
          <span>Custom domains</span>
          <span>Analytics</span>
          <span>Checkout</span>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
