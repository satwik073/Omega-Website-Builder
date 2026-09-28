import Footer from '@/components/site/footer'
import Navigation from '@/components/site/navigation'
import DevelopmentScreen from '@/DevelopmentCall'
import ClerkThemeProvider from '@/providers/clerk-theme-provider'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkThemeProvider>

      {/* `overflow-x: clip` rather than `hidden`: several sections bleed past
          the container on purpose (the reel marquee, the services artwork),
          and `clip` contains them without creating a scroll container, which
          would break the sticky dial in the services section. */}
      <main className="marketing-theme min-h-screen overflow-x-clip bg-[#f9f8f6] text-[#141414] [color-scheme:light]">
        {
          process.env.NEXT_DEV_PROGRESS === "in-progress" ? (
            <DevelopmentScreen />
          ) : (
            <>
              <Navigation />
              {children}
              <Footer />
            </>
          )
        }
      </main>
    </ClerkThemeProvider>
  )
}

export default layout
