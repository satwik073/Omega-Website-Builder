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
import { AnimatedTooltipPreview } from '@/Controllers/DynamicTooltip'
import { pricingCards } from '@/lib/constants'
import { ThemeSettings } from '@/lib/functions'
import { stripe } from '@/lib/stripe'
import { OptionsConfig } from '@/lib/structures'
import { IconArrowUpRight } from '@tabler/icons-react'
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
        className=" w-full relative flex items-center justify-center flex-col px-4 lg:px-12 "
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

        <header className=' w-full lg:px-0 md:px-10 lg:w-11/12 max-w-7xl justify-center md:mt-[250px] mt-[180px] h-full flex items-center z-30'>
          <div className='w-full'>
            <div className='lg:flex items-center justify-between'>
              <div className='lg:w-1/2'>

                <div className='md:text-5xl text-4xl w-full lg:w-full md:w-[70%]  xl:text-7xl text-white font-extrabold tracking-tighter'>The site you want without develop time</div>
              </div>
              <div className='lg:w-1/2 lg:justify-end flex items-end lg:ml-8'>
                <p className='md:text-lg text-sm text-white my-4 md:my-5 max-w-md w-full'>Easiest develop design to website using Arobix and start your free website trial today. No credit required
                  <div className='flex gap-4 mt-5'>
                    <Button variant={'default'} className={`text-black hover:bg-white cursor-pointer bg-white`}> Start building now!</Button>
                    <Button variant="outline" className={`bg-transparent border cursor-pointer ${ThemeSettings(OptionsConfig?._BORDER?.ENABLE, OptionsConfig?._TXTPALLETE?.ENABLE === "WHITE_FORMAT")} border-white hover:!text-black`}>Learn to know</Button>
                  </div>
                </p>
              </div>

            </div>
          </div>
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
        <div className="flex justify-center lg:px-0 md:px-10 relative mt-10 md:mt-24  w-full max-w-5xl">
          <Image
            src={'/assets/web1.png'}
            alt="banner image"
            height={5200}
            width={5200}
            className="rounded-tl-lg rounded-tr-lg border-2 border-muted w-full h-auto"
          />
          {/* <div className="bottom-0 top-[50%] md:top-[50%] bg-gradient-to-t from-background left-0 right-0 absolute z-10"></div> */}
        </div>
      </section >

      <section
        className=" w-full relative md:mt-20 mt-12 flex items-center justify-center flex-col px-4 lg:px-12 "

      >
        <header className=' w-full lg:px-0 md:px-10 lg:w-11/12 max-w-7xl justify-center item-center  h-full flex z-30'>
          <div className='w-full'>
            <div className='lg:flex items-center justify-between'>
              <div className='lg:w-1/2'>

                <div className='text-3xl lg:text-5xl tracking-tighter font-bold mb-2'> Grow your business online with Arobix</div>
              </div>
              <div className='lg:w-1/2 lg:justify-end flex items-end lg:ml-8'>
                <p className='md:text-lg text-sm  my-4 md:my-5 max-w-md w-full'> Select from any of our industry-leading website templates, designer fonts,
                  and color palettes that best fit your personal style and professional needs.
                  <div className='flex gap-4 mt-5'>
                    <Button variant={'default'} className={`text-[#2e4acd] text-md px-0 flex justify-start bg-transparent hover:bg-transparent cursor-pointer`}> Get Started <IconArrowUpRight className='text-[#2e4acd]' /></Button>

                  </div>
                </p>
              </div>

            </div>
          </div>
        </header>

      </section>

      <div className="w-full flex mt-4 justify-center items-center max-w-7xl mx-auto lg:px-0 md:px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          <div className="w-full lg:w-1/2 flex justify-center border-none">
            <video
              src="/assets/using.mp4"
              className="rounded-lg  border-none"
              height="100%"
              width="100%"
              autoPlay
              preload='1'
              loop
              muted
              playsInline
              
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="w-full lg:w-1/2 lg:flex lg:flex-col gap-6 grid grid-cols-1 sm:grid-cols-3">
  <div className="p-4 rounded-md sm:text-left">
    <h2 className="text-lg lg:text-2xl font-bold  mb-2 tracking-tighter">
      Create website
    </h2>
    <p className=" text-sm lg:text-lg dark:text-gray-400">
      Select from any of our industry-leading website templates, designer fonts, and color palettes that best fit your personal style and professional needs.
    </p>
  </div>
  <div className="p-4 rounded-md sm:text-left">
    <h2 className="text-lg lg:text-2xl font-bold  mb-2 tracking-tighter">
      Ecommerce made easy
    </h2>
    <p className=" text-sm lg:text-lg dark:text-gray-400">
      Ecommerce made easy, explore which tools you want to add—whether it's setting up an online store, booking services, or adding your favorite third-party extensions.
    </p>
  </div>
  <div className="p-4 rounded-md  sm:text-left">
    <h2 className="text-lg lg:text-2xl font-bold  mb-2 tracking-tighter">
      Market your business
    </h2>
    <p className=" text-sm lg:text-lg dark:text-gray-400">
      Stand out in every inbox and social feed. On-brand email campaigns and social tools make it easy to retain customers and grow your audience.
    </p>
  </div>
</div>

        </div>
      </div>



      {/* <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
    <img
      src="/path-to-your-image.jpg"
      alt="Arobix Screenshot"
      className="w-full rounded-lg shadow-md mb-6"
    />
    <div className="flex flex-col gap-6">
   
      <div className="p-4 bg-gray-100 rounded-md shadow-sm">
        <h2 className="text-lg lg:text-xl font-bold text-black mb-2">Create website</h2>
        <p className="text-gray-600 text-sm lg:text-md">
          Select from any of our industry-leading website templates, designer
          fonts, and color palettes that best fit your personal style and professional needs.
        </p>
      </div>
    
      <div className="p-4 bg-gray-100 rounded-md shadow-sm">
        <h2 className="text-lg lg:text-xl font-bold text-black mb-2">e-Commerce made easy</h2>
        <p className="text-gray-600 text-sm lg:text-md">
          e-Commerce made easy, explore which tools you want to add—whether it's
          setting up an online store, booking services, or adding your favorite
          third-party extensions.
        </p>
      </div>
      
      <div className="p-4 bg-gray-100 rounded-md shadow-sm">
        <h2 className="text-lg lg:text-xl font-bold text-black mb-2">Market your business</h2>
        <p className="text-gray-600 text-sm lg:text-md">
          Stand out in every inbox and social feed. On-brand email campaigns and
          social tools make it easy to retain customers and grow your audience.
        </p>
      </div>
    </div>
  </div> */}
      {/* </div> */}

      <div className="bg-white text-black py-16 px-6 lg:px-20">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4 tracking-tighter">
          Start create your website <br></br>using Arobix
        </h1>
        <p className="text-gray-600 text-md lg:text-lg">
          There are 4 steps to create and build your own website using Arobix
        </p>
      </div>

      {/* Steps Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
  {/* Step 1 */}
  <div className="flex flex-col items-start text-left">
    <img
      src="/assets/1.png"
      alt="Sign up your account"
      className="rounded-lg mb-6 w-full"
    />
    <h2 className="text-lg lg:text-3xl font-bold  mb-2 tracking-tighter w-[80%]">Sign up your account for Arobix</h2>
    <p className="text-gray-600 text-sm lg:text-[1rem] leading-[1.5rem]">      Register for Arobix and fill in the information access to create a website.
    </p>
  </div>

  {/* Step 2 */}
  <div className="flex flex-col items-start text-left">
    <img
      src="/assets/2.png"
      alt="Create your first workspace"
      className="rounded-lg mb-6 w-full"
    />
    <h2 className="text-lg lg:text-3xl font-bold  mb-2 tracking-tighter w-[80%]">Create your first workspace on Arobix</h2>
    <p className="text-gray-600 text-sm lg:text-[1rem] leading-[1.5rem]">      A new workspace going to top-up, you can make a workspace fit with your requirements.
    </p>
  </div>

  {/* Step 3 */}
  <div className="flex flex-col items-start text-left">
    <img
      src="/assets/3.png"
      alt="Customize and publish your website"
      className="rounded-lg mb-6 w-full"
    />
    <h2 className="text-lg lg:text-3xl font-bold  mb-2 tracking-tighter w-[80%]">Customize & publish your website</h2>
    <p className="text-gray-600 text-sm lg:text-[1rem] leading-[1.5rem]">
      You can easily customize your website and also share and publish your website to public.
    </p>
  </div>
</div>


    </div>
      {/* Pricing Cards Section */}
      <section className="flex flex-col items-center justify-center gap-8 md:mt-28 mt-12 px-4 lg:px-16" >
      <div className='text-3xl lg:text-5xl tracking-tighter text-center font-bold '> Choose what fits you right</div>
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
