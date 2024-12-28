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
import { stripe } from '@/lib/stripe'
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
      <section className="h-screen w-full relative flex items-center justify-center flex-col px-4 lg:px-12">
        {/* Spotlight */}
        {/* <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-10"
          fill="white"
        /> */}

        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10"></div>

        {/* Heading */}
        {/* <p className="text-center  font-medium">
          Run your agency, in one place
        </p> */}
        <div className='md:mt-[200px] mt-[-100px]'>
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
          {/* <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative "> */}
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-6xl px-1 lg:leading-[2.1] z-10 bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-200 dark:to-neutral-600 md:text-center font-sans">
            Build your component library
          </h1>
          {/* </div>//</section> */}
        </div>

        {/* Image */}
        <div className="flex justify-center items-center relative mt-6  w-full max-w-5xl">
          <Image
            src={'/assets/preview.png'}
            alt="banner image"
            height={5200}
            width={5200}
            className="rounded-tl-lg rounded-tr-lg border-2 border-muted w-full h-auto"
          />
          <div className="bottom-0 top-[50%] md:top-[50%] bg-gradient-to-t from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="flex flex-col items-center justify-center gap-8 mt-12 px-4 lg:px-16">
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
      </section>
    </>
  );
}
