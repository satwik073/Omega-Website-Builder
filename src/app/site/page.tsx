import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'
import { pricingCards } from '@/lib/constants'
import { ThemeSettings } from '@/lib/functions'
import { stripe } from '@/lib/stripe'
import { OptionsConfig } from '@/lib/structures'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const prices = await stripe.prices.list({
    product: process.env.NEXT_PLURA_PRODUCT_ID,
    active: true,
  });

  return (
    <>
      <section
        className="h-[70vh] w-full relative flex items-center justify-center flex-col px-4 lg:px-12 "
        style={{ backgroundColor: `#${process.env.NEXT_OVERALL_PALLETE}` }}
      >
        {/* Content */}

      {/* Spotlight */}
      {/* <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-10"
          fill="white"
        /> */}

<div
  className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,rgba(229,229,229,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,229,229,0.2)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] z-10"
></div>

<header className=' w-full lg:w-11/12 h-full flex items-center'>
  <aside>
    <div className='lg:flex items-center justify-between'>
      <p className='md:text-5xl text-4xl sm:w-[80%] lg:w-[60%] lg:text-7xl text-white font-extrabold tracking-tighter'>The site you want - without develop time</p>
      <div className='lg:w-[40%]'>
      <p className='md:text-lg text-sm text-white my-4 md:mt-0'>Easiest develop design to website using Arobix and start your free website trial today. No credit required
      <div className='flex gap-2 mt-4'>
        <Button variant={'default'} className={`text-black cursor-pointer bg-white`}> Start building now!</Button>
          <Button variant="outline" className={`bg-transparent border cursor-pointer ${ThemeSettings(OptionsConfig?._BORDER?.ENABLE,OptionsConfig?._TXTPALLETE?.ENABLE === "WHITE_FORMAT")} border-white hover:!text-black`}>Learn to know</Button>
        </div>
      </p>
      </div>

    </div>
  </aside>
</header>
      {/* Heading */}
      {/* <p className="text-center  font-medium">
          Run your agency, in one place
        </p> */}
      {/* <div className='md:mt-[200px] mt-[-100px]'>
        <button className="bg-slate-800 mb-8 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full mx-6 ">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 tracking-wide items-center z-10 rounded-full bg-white dark:text-white text-black dark:bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
            <span>
              Let&#39;s automate your social platforms
            </span>
            <svg
              fill="none"
              height="16"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 8.75L14.25 12L10.75 15.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </button>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative ">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-6xl px-1 lg:leading-[2.1] z-10 bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-200 dark:to-neutral-600 md:text-center font-sans">
            Build your component library
          </h1>
        </div>
      </div> */}

      {/* Image */}
      {/* <div className="flex justify-center items-center relative mt-6  w-full max-w-5xl">
        <Image
          src={'/assets/preview.png'}
          alt="banner image"
          height={5200}
          width={5200}
          className="rounded-tl-lg rounded-tr-lg border-2 border-muted w-full h-auto"
        />
        <div className="bottom-0 top-[50%] md:top-[50%] bg-gradient-to-t from-background left-0 right-0 absolute z-10"></div>
      </div> */}
    </section >

      {/* Pricing Cards Section */ }
      <section className = "flex flex-col items-center justify-center gap-8 mt-12 px-4 lg:px-16" >
        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Choose what fits you right
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl">
          Our straightforward pricing plans are tailored to meet your needs. If{" "}
          you're not ready to commit, you can get started for free.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center">
          {prices.data.map((card) => (
            <Card
              key={card.nickname}
              className={clsx('w-full max-w-xs flex flex-col justify-between', {
                'border-2 border-primary': card.nickname === 'Unlimited Saas',
              })}
            >
              <CardHeader>
                <CardTitle
                  className={clsx('', {
                    'text-muted-foreground': card.nickname !== 'Unlimited Saas',
                  })}
                >
                  {card.nickname}
                </CardTitle>
                <CardDescription>
                  {
                    pricingCards.find((c) => c.title === card.nickname)
                      ?.description
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-bold">
                  ${card.unit_amount && card.unit_amount / 100}
                </span>
                <span className="text-muted-foreground">
                  <span>/ {card.recurring?.interval}</span>
                </span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div>
                  {pricingCards
                    .find((c) => c.title === card.nickname)
                    ?.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex gap-2"
                      >
                        <Check />
                        <p>{feature}</p>
                      </div>
                    ))}
                </div>
                <Link
                  href={`/agency?plan=${card.id}`}
                  className={clsx(
                    'w-full text-center bg-primary p-2 rounded-md',
                    {
                      '!bg-muted-foreground':
                        card.nickname !== 'Unlimited Saas',
                    }
                  )}
                >
                  Get Started
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section >
    </>
  );
}
