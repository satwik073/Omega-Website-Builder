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
      <section className="h-full w-full relative flex items-center justify-center flex-col px-4 lg:px-12">
        {/* Spotlight */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-10"
          fill="white"
        />
        {/* Grid Background */}
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10"></div>

        {/* Heading */}
        {/* <p className="text-center  font-medium">
          Run your agency, in one place
        </p> */}
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative md:mt-[120px] ">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-6xl px-6 lg:leading-[2.1] z-10 bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-200 dark:to-neutral-600 md:text-center font-sans">
            Build your component library
          </h1>
        </div>

        {/* Image */}
        <div className="flex justify-center items-center relative mt-6  w-full max-w-5xl">
          <Image
            src={'/assets/preview.png'}
            alt="banner image"
            height={1200}
            width={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted w-full h-auto"
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
