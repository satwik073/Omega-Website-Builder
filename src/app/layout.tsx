import type { Metadata } from 'next'
import { Fraunces, Geist_Mono, Inter, Newsreader } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ThemeProvider } from '@/providers/theme-provider'
import ModalProvider from '@/providers/modal-provider'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as SonnarToaster } from '@/components/ui/sonner'
import ClientProvider from '../../ClientProvider'
// Reference type system: Inter for UI/body, Fraunces for display, Geist Mono
// for the small uppercase metadata labels.
const font = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
})

// Display serif. The reference runs the variable face at wght 400 with a low
// optical size, which keeps the terminals sharp at 56-128px.
const displayFont = Fraunces({
  subsets: ['latin'],
  weight: 'variable',
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-fraunces',
})

// Product display serif. WizCommerce sets its headings in Recife Text, a
// licensed face we can't redistribute; Newsreader is the closest free
// equivalent — a low-contrast transitional serif with real light weights.
const appDisplayFont = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
})

const monoFont = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

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
  // Font variables live on <html>, not <body>: :root resolves --font-sans and
  // --font-display against them, and a custom property referenced from :root
  // cannot see a declaration made on a descendant.
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${font.variable} ${displayFont.variable} ${appDisplayFont.variable} ${monoFont.variable}`}
    >
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

        {/* General Sans — WizCommerce's UI face, free under the Fontshare
            licence and served from their CDN. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap"
        />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/grapesjs/0.17.0/css/grapes.min.css" />
      </head>
      <body>
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
