import React from 'react'

type Props = {
  children: React.ReactNode
}

/**
 * Scroll container for every authenticated page. Sits below the fixed topbar
 * (h-14) and to the right of the sidebar, which the parent layout offsets.
 */
const BlurPage = ({ children }: Props) => {
  return (
    <div
      className="min-h-screen overflow-x-clip bg-background px-4 pb-16 pt-[calc(3.5rem+1.5rem)] md:px-8 2xl:px-12"
      id="blur-page"
    >
      {/* Full width by design. A workspace should use the screen it is given;
          individual pages cap their own measure where text needs it, rather
          than every page inheriting one narrow column. */}
      <div className="w-full">{children}</div>
    </div>
  )
}

export default BlurPage
