import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ThemeProvider } from '@/providers/theme-provider'
import ModalProvider from '@/providers/modal-provider'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as SonnarToaster } from '@/components/ui/sonner'

const font = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arobix  | All in one Agency Solution ',
  description: 'All in one Agency Solution',
  icons: {
    icon: '/assets/one-week.png', // Path to your SVG logo
    shortcut: '/assets/one-week.png', // Optional: Browser shortcut icon
    apple: '/assets/one-week.png', // Optional: Apple Touch Icon
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider>
            {children}
            <Toaster />
            <SonnarToaster position="bottom-left" />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
