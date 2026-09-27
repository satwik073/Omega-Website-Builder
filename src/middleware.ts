import { clerkMiddleware } from '@clerk/nextjs/server'
import { type NextRequest, NextResponse } from 'next/server'

const isProtectedPath = (pathname: string) =>
  pathname.startsWith('/agency') || pathname.startsWith('/subaccount')

export default clerkMiddleware(async (auth : any, req: NextRequest) => {
  const url = req.nextUrl
  const searchParams = url.searchParams.toString()
  const pathWithSearchParams = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`

  const customSubDomain = req.headers
    .get('host')
    ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
    .filter(Boolean)[0]

  // Published funnel sites on custom subdomains stay public
  if (customSubDomain) {
    return NextResponse.rewrite(
      new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
    )
  }

  if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
    return NextResponse.redirect(new URL(`/agency/sign-in`, req.url))
  }

  if (
    url.pathname === '/' ||
    (url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN)
  ) {
    return NextResponse.rewrite(new URL('/site', req.url))
  }

  if (isProtectedPath(url.pathname)) {
    await auth.protect()
    return NextResponse.rewrite(new URL(pathWithSearchParams, req.url))
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
