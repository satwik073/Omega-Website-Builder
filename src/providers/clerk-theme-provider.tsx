'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import React from 'react'

/**
 * Wraps ClerkProvider so the hosted widgets follow the app theme instead of
 * being pinned to Clerk's dark theme, and so they inherit our design tokens
 * (near-black accent, hairline borders, matching radius).
 */
const ClerkThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <ClerkProvider
      // The Clerk application is still named "Omega" in the Clerk dashboard,
      // which leaks into the widget copy as "Sign in to Omega". Overriding
      // the strings here fixes the product name without needing dashboard
      // access; rename it there too and these can go.
      localization={{
        signIn: {
          start: {
            title: 'Sign in to Arobix',
            subtitle: 'Welcome back. Sign in to continue to your workspace.',
          },
        },
        signUp: {
          start: {
            title: 'Create your Arobix account',
            subtitle: 'Start building and publishing sites in minutes.',
          },
        },
      }}
      appearance={{
        theme: isDark ? dark : undefined,
        variables: {
          colorPrimary: isDark ? '#F5F5F5' : '#0F0F0F',
          colorForeground: isDark ? '#F5F5F5' : '#0F0F0F',
          colorMutedForeground: isDark ? '#999999' : '#6B6B6B',
          colorBackground: isDark ? '#171717' : '#FFFFFF',
          colorInput: isDark ? '#1F1F1F' : '#FFFFFF',
          colorInputForeground: isDark ? '#F5F5F5' : '#0F0F0F',
          borderRadius: '0.375rem',
        },
        elements: {
          card: 'shadow-none border border-border',
          headerTitle: 'tracking-[-0.02em]',
          formButtonPrimary:
            'bg-primary text-primary-foreground hover:bg-primary/85 normal-case text-sm font-medium',
          footerActionLink: 'text-foreground hover:text-foreground underline',
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}

export default ClerkThemeProvider
