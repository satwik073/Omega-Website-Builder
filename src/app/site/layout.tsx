import Navigation from '@/components/site/navigation'
import DevelopmentScreen from '@/DevelopmentCall'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={{ theme: dark }}>

      <main className="h-full">
        {
          process.env.NEXT_DEV_PROGRESS === "in-progress" ? (
            <DevelopmentScreen />
          ) : (
            <>
              <Navigation />
              {children}
            </>
          )
        }
      </main>
    </ClerkProvider>
  )
}

export default layout
