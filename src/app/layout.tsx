import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ThemeProvider } from '@/providers/theme-provider'
import ModalProvider from '@/providers/modal-provider'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as SonnarToaster } from '@/components/ui/sonner'
import ClientProvider from '../../ClientProvider'
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <title>Arobix  | All in one Agency Solution</title>
        <meta name="description" content="Explore the portfolio of Satwik Kanhere, showcasing expertise in software development, automation, and SaaS. Learn more about his professional experience." />

        <meta property="og:image" content="https://arobix.vercel.app/assets/one-week.png" />
        <meta property="og:site_name" content="Arobix  | All in one Agency Solution " />
        <meta property="og:title" content="Satwik Kanhere - Software Engineer & Innovator" />
        <meta property="og:description" content="Explore the portfolio of Satwik Kanhere, showcasing expertise in software development, automation, and SaaS." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://arobix.vercel.app/" />

        <meta property="twitter:image" content="https://arobix.vercel.app/assets/one-week.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Arobix  | All in one Agency Solution " />
        <meta property="twitter:description" content="Explore the portfolio of Satwik Kanhere, showcasing expertise in software development, automation, and SaaS." />

        <meta name="google-site-verification" content="N8Hm68Zy6ALf8JajWRVnxlSa-MdqvJPQjwJ0VLL4OjM" />
        <meta name="seobility" content="7f1a1abb031e509f7b80da16cc07d81c" />

        <link rel="icon" type="image/png" href="https://arobix.vercel.app/assets/one-week.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://arobix.vercel.app/assets/one-week.png" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />


        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/grapesjs/0.17.0/css/grapes.min.css" />
      </head>
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ClientProvider>
            <ModalProvider>
              {children}
              <Toaster />
              <SonnarToaster position="bottom-left" />
            </ModalProvider>
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
