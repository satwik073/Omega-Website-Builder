"use client"
import { ModeToggle } from '@/components/global/mode-toggle'
import { Button } from '@/components/ui/button'
import { ThemeSettings } from '@/lib/functions'
import { ConfigurationSchema, OptionsConfig, ThemeProviderOptions } from '@/lib/structures'
import { UserButton, useUser } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Box, useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material'
import { DropdownMenuDemo } from '@/Controllers/DropdownConvertor'

type Props = {
  user?: null | User
}

const Navigation = ({ user }: Props) => {
  const theme = useTheme()
  const { isSignedIn, user: tenantConfigDetails } = useUser();
  const isCompactDetected = useMediaQuery(theme.breakpoints.down("sm"))
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="fixed top-0 right-0 left-0 px-4 flex md:p-4  items-center justify-between md:px-12  backdrop-blur-lg z-[1000]"
      style={{
        backgroundColor: `${process.env.NEXT_OVERALL_PALLETE}50`,
      }}
    >
      <aside className="flex items-center gap-2">
        <Image
          src={'/assets/one-week-new.png'}
          width={60}
          height={60}
          alt="plur logo"
        />
        <span className={`text-xl tracking-tighter font-bold ${ThemeSettings(OptionsConfig?._BORDER?.DISABLE, OptionsConfig?._TXTPALLETE?.ENABLE === "WHITE_FORMAT")}`}>{!isCompactDetected && (ConfigurationSchema?.PRODUCT_EXTRACTED_FILE || 'Arobix')}</span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className={`flex items-center  justify-center ${ThemeSettings(OptionsConfig?._BORDER?.DISABLE, OptionsConfig?._TXTPALLETE?.ENABLE === "WHITE_FORMAT")} gap-8 `}>
          <Link href={'#'}>Pricing</Link>
          <Link href={'#'}>About</Link>
          <Link href={'#'}>Documentation</Link>
          <Link href={'#'}>Features</Link>
        </ul>
      </nav>
      {isCompactDetected ? (
        <DropdownMenuDemo />
      ) : (
        <aside className="flex gap-2 items-center">
          <Link href={"/agency"}>
            <Button
              variant="outline"
              className={`bg-transparent border ${ThemeSettings(
                OptionsConfig?._BORDER?.ENABLE,
                OptionsConfig?._TXTPALLETE?.ENABLE === "WHITE_FORMAT"
              )} border-white hover:!text-black`}
              style={{
                color: isHovered
                  ? process.env.NEXT_OVERALL_PALLETE || "#000000"
                  : "#FFFFFF",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isSignedIn ? "Dashboard" : "Login"}
            </Button>
          </Link>

          <UserButton />
          <ModeToggle />
        </aside>
      )}
    </div>
  )
}

export default Navigation
