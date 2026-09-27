'use client'

import React from 'react'

/**
 * Footer — measured at 1440px: a 1280-wide wordmark set 293px tall in
 * #a4a4a4, carrying a gradient mask that sweeps across it, then a single
 * copyright line. The wordmark is SVG text with `textLength` so it fills
 * the column exactly at any width.
 */

const Footer = () => (
  <footer className="ori-container pb-10 pt-4">
    <div
      className="relative select-none"
      style={{
        // The sweep is a moving highlight window over the wordmark, which is
        // what gives the reference footer its slow shimmer.
        WebkitMaskImage:
          'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.45) 34%, #000 50%, rgba(0,0,0,0.45) 66%, rgba(0,0,0,0.45) 100%)',
        maskImage:
          'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.45) 34%, #000 50%, rgba(0,0,0,0.45) 66%, rgba(0,0,0,0.45) 100%)',
        WebkitMaskSize: '260% 100%',
        maskSize: '260% 100%',
        animation: 'wordmark-sweep 7s linear infinite',
      }}
    >
      <svg
        viewBox="0 0 1280 300"
        className="block w-full"
        role="img"
        aria-label="Arobix"
      >
        <text
          x="640"
          y="236"
          textAnchor="middle"
          textLength="1280"
          lengthAdjust="spacingAndGlyphs"
          fontSize="300"
          fontFamily="var(--font-display), Georgia, serif"
          fill="#a4a4a4"
        >
          arobix
        </text>
      </svg>
    </div>

    <div className="mt-8 flex flex-col gap-3 border-t border-black/[0.08] pt-6 md:flex-row md:items-center md:justify-between">
      <p className="ori-meta text-[#a4a4a4]">
        &copy; {new Date().getFullYear()} Arobix
      </p>
      <nav className="flex gap-6">
        {['Privacy', 'Terms', 'Status'].map((l) => (
          <a
            key={l}
            href="#"
            className="ori-meta text-[#a4a4a4] transition-colors hover:text-[#141414]"
          >
            {l}
          </a>
        ))}
      </nav>
    </div>
  </footer>
)

export default Footer
