import Clients from '@/components/site/orionix/clients'
import Cta from '@/components/site/orionix/cta'
import Faq from '@/components/site/orionix/faq'
import Hero from '@/components/site/orionix/hero'
import Insights from '@/components/site/orionix/insights'
import Pricing from '@/components/site/orionix/pricing'
import Process from '@/components/site/orionix/process'
import Reel from '@/components/site/orionix/reel'
import Services from '@/components/site/orionix/services'
import Testimonials from '@/components/site/orionix/testimonials'
import Work from '@/components/site/orionix/work'
import React from 'react'

/**
 * Section order mirrors the reference one for one:
 *   hero -> clients -> reel -> selected work -> services (rotary dial)
 *   -> process -> pricing -> testimonials + stats -> insights -> FAQ -> CTA
 * The footer is rendered by src/app/site/layout.tsx.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Reel />
      <Work />
      <Services />
      <Process />
      <Pricing />
      <Testimonials />
      <Insights />
      <Faq />
      <Cta />
    </>
  )
}
