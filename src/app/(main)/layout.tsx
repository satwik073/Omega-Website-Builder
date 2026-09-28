import ClerkThemeProvider from '@/providers/clerk-theme-provider'
import React from 'react'

/**
 * The WizCommerce product theme is the application default (see :root in
 * globals.css), so nothing needs scoping here — that also keeps Radix
 * portals, which mount on <body>, inside the right palette.
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkThemeProvider>
      {children}
    </ClerkThemeProvider>
  )
}

export default Layout
