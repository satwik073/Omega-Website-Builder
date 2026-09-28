import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { type NextRequest, NextResponse } from 'next/server'

// Auth pages live under /agency/(auth)/... so they must stay public,
// otherwise protecting them redirects to themselves forever.
const isPublicRoute = createRouteMatcher([
  '/agency/sign-in(.*)',
  '/agency/sign-up(.*)',
  '/agency/unauthorized',
  '/api/uploadthing(.*)',
  '/api/stripe/webhook',
])

const isProtectedRoute = createRouteMatcher([
  '/agency(.*)',
  '/subaccount(.*)',
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const url = req.nextUrl
  const searchParams = url.searchParams.toString()
  const pathWithSearchParams = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`

  const host = req.headers.get('host') ?? ''
  const domain = process.env.NEXT_PUBLIC_DOMAIN ?? ''
  const customSubDomain =
    domain && host !== domain
      ? host.split(domain).filter(Boolean)[0]?.replace(/\.$/, '')
      : undefined

  // Published funnel sites on custom subdomains stay public
  if (customSubDomain) {
    return NextResponse.rewrite(
      new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
    )
  }

  if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
    return NextResponse.redirect(new URL('/agency/sign-in', req.url))
  }

  if (url.pathname === '/' || url.pathname === '/site') {
    return NextResponse.rewrite(new URL('/site', req.url))
  }

  if (isProtectedRoute(req) && !isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
