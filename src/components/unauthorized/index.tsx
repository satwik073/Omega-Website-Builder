import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

type Props = {}

const Unauthorized = (props: Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <p className="eyebrow mb-6">Error 403</p>
        <h1 className="display-sm">
          You don&apos;t have access
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Ask your agency owner to grant you permission, or contact support if
          you believe this is a mistake.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/agency">Switch account</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized
