

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
import { AccordionDemo } from '@/Controllers/Accordion'
import { MarqueeDemo } from '@/Controllers/AutoSlide'
import { AnimatedTooltipPreview } from '@/Controllers/DynamicTooltip'
import { TimelineDemo } from '@/Controllers/TimeLinePicker'
import { pricingCards } from '@/lib/constants'
import { ThemeSettings } from '@/lib/functions'
import { stripe } from '@/lib/stripe'
import { OptionsConfig } from '@/lib/structures'
import { Separator } from '../../components/ui/separator'
import { IconArrowUpRight, IconCreditCard, IconDeviceMobile, IconInfoCircle, IconInfoCircleFilled, IconList, IconTableShortcut, IconWaveSawTool, IconWorld } from '@tabler/icons-react'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Toaster } from '@/components/ui/toaster'
import { useTranslation } from 'react-i18next'
import { Config } from '@/lib/translation'

export default async function Home() {
  // const prices = await stripe.prices.list({
  //   product: process.env.NEXT_PLURA_PRODUCT_ID,
  //   active: true,
  // });
  const features = [
    {
      text: "Free custom domain",
      icon: <IconWorld />, // Replace with your icon
    },
    {
      text: "Mobile optimized websites",
      icon: <IconDeviceMobile />, // Replace with your icon
    },
    {
      text: "Templates to fit every need",
      icon: <IconTableShortcut /> // Replace with your icon
    },
    {
      text: "Advanced website analytics",
      icon: <IconWaveSawTool />, // Replace with your icon
    },
    {
      text: "Powerful merchandising",
      icon: <IconList />, // Replace with your icon
    },
    {
      text: "Checkout on your domain",
      icon: <IconCreditCard />, // Replace with your icon
    },
  ];
  // { Config?.i18N?.t["HeaderAlignment"].Value}
  // const {t} = useTranslation()
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
                <div className='md:text-lg text-sm text-white my-4 md:my-5 max-w-md w-full'>Easiest develop design to website using Arobix and start your free website trial today. No credit required
                  <div className='flex gap-4 mt-5'>
                    <Button variant={'default'} className={`text-black hover:bg-white cursor-pointer bg-white`}> Start building now!</Button>
                    <Button variant="outline" className={`bg-transparent border cursor-pointer ${ThemeSettings(OptionsConfig?._BORDER?.ENABLE, OptionsConfig?._TXTPALLETE?.ENABLE === "WHITE_FORMAT")} border-white hover:!text-black`}>Learn to know</Button>
                  </div>
                </div>
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
        <div className="flex justify-center lg:px-0 relative mt-10 md:mt-24  w-full md:max-w-5xl">
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
              <h2 className="text-xl lg:text-2xl font-bold  mb-2 tracking-tighter">
                Create website
              </h2>
              <p className=" text-sm lg:text-lg dark:text-gray-400">
                Select from any of our industry-leading website templates, designer fonts, and color palettes that best fit your personal style and professional needs.
              </p>
            </div>
            <div className="p-4 rounded-md sm:text-left">
              <h2 className="text-xl lg:text-2xl font-bold  mb-2 tracking-tighter">
                Ecommerce made easy
              </h2>
              <p className=" text-sm lg:text-lg dark:text-gray-400">
                Ecommerce made easy, explore which tools you want to add—whether it's setting up an online store, booking services, or adding your favorite third-party extensions.
              </p>
            </div>
            <div className="p-4 rounded-md  sm:text-left">
              <h2 className="text-xl lg:text-2xl font-bold  mb-2 tracking-tighter">
                Market your business
              </h2>
              <p className=" text-sm lg:text-lg dark:text-gray-400">
                Stand out in every inbox and social feed. On-brand email campaigns and social tools make it easy to retain customers and grow your audience.
              </p>
            </div>
          </div>

        </div>
      </div>


      <div className="bg-black text-white py-16 px-2">
        {/* Header Section */}
        <div className="md:text-center w-[100%] px-4 mb-6 flex justify-center ">
          <h1 className="text-3xl lg:text-6xl md:w-1/2 font-bold tracking-tighter  leading-tight">
            <span className="block sm:inline">
              Build your new website & develop your business
            </span>
          </h1>

        </div>
        <div className="lg:w-1/2 flex justify-center items-center mx-auto px-4 mb-12">
          <p className="md:text-lg text-sm w-full md:w-11/12 md:text-center">
            Start with a flexible template, then customize to fit your style and professional needs with our website builder.
            <div className="flex gap-4 mt-5 justify-start md:justify-center lg:justify-center">
              <Button
                variant="default"
                className={`text-[#ffffff] underline text-md px-0 flex justify-start lg:justify-center bg-transparent hover:bg-transparent cursor-pointer`}
              >
                Explore all templates<IconArrowUpRight className="text-[#ffffff]" />
              </Button>
            </div>
          </p>
        </div>


        <div className="flex justify-center mb-12 max-w-7xl px-4 lg:px-1 w-full mx-auto">
          <Image
            src={'/assets/4.png'}
            alt="banner image"
            height={5200}
            width={5200}
            className="rounded-tl-lg rounded-tr-lg w-full h-auto"
          />
        </div>
        <section
          className=" w-full relative md:mt-16 mt-12 flex items-center justify-center flex-col px-4 lg:px-12 "

        >
          <header className=' w-full lg:px-0 md:px-10 lg:w-11/12 max-w-7xl justify-center item-center  h-full flex z-30'>
            <div className='w-full'>
              <div className='lg:flex items-center justify-between'>
                <div className='lg:w-1/2'>

                  <div className='text-3xl lg:text-5xl text-white tracking-tighter font-bold mb-2 lg:w-full w-full md:w-2/3'>      Website templates for every purpose

                  </div>
                </div>
                <div className="lg:w-1/2 flex justify-center lg:justify-end lg:ml-8">
                  <p className="md:text-lg text-sm w-full lg:text-left">
                    Start with a flexible template, then customize to fit your style and professional needs with our website builder.
                    <div className="flex gap-4 mt-5 justify-start">
                      <Button
                        variant="default"
                        className={`text-[#ffffff] underline text-md px-0 flex justify-center lg:justify-start bg-transparent hover:bg-transparent cursor-pointer`}
                      >
                        Explore all templates<IconArrowUpRight className="text-[#ffffff]" />
                      </Button>
                    </div>
                  </p>
                </div>

              </div>
            </div>
          </header>

        </section>

        <div className="bg-black text-white px-4 lg:px-0">
          {/* Hero Section */}


          {/* Website Templates Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-7xl mx-auto">
            {/* Template Categories */}

          </div>

          {/* Footer Logos */}
          {/* <MarqueeDemo/> */}

        </div>
        <TimelineDemo />


      </div>


      <div className="bg-white text-black pt-16 pb-8 px-6 lg:px-20">
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
        <div className="flex justify-center max-w-7xl mx-auto">
          {/* Step 1 */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-16 w-full '>

            <div className="flex flex-col items-start text-left">
              <img
                src="/assets/1.png"
                alt="Sign up your account"
                className="rounded-lg mb-6 w-full"
              />
              <h2 className="text-2xl lg:text-3xl font-bold  mb-2 tracking-tighter w-[80%]">Sign up your account for Arobix</h2>
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
              <h2 className="text-2xl lg:text-3xl font-bold  mb-2 tracking-tighter w-[80%]">Create your first workspace on Arobix</h2>
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
              <h2 className="text-2xl lg:text-3xl font-bold  mb-2 tracking-tighter w-[80%]">Customize & publish your website</h2>
              <p className="text-gray-600 text-sm lg:text-[1rem] leading-[1.5rem]">
                You can easily customize your website and also share and publish your website to public.
              </p>
            </div>
          </div>
        </div>
        <div className='gap-4 my-8 flex justify-center'>
          <Button variant={'default'} className={`border hover:bg-white hover:text-[#2e4acd] text-white hover:border-[#2e4acd] cursor-pointer bg-[#2e4acd]`}> Learn more to know</Button>

        </div>

      </div>


      <section
        className=" w-full relative  flex items-center mt-6 justify-center flex-col px-4 lg:px-12 "

      >
        <header className=' w-full lg:px-0 md:px-10 lg:w-11/12 max-w-7xl justify-center item-center  h-full flex z-30'>
          <div className='w-full'>
            <div className='lg:flex items-center justify-between'>
              <div className='lg:w-1/2'>

                <div className='text-3xl lg:text-5xl tracking-tighter font-bold mb-2 lg:w-full w-full md:w-2/3'>    Find your perfect plan
                  for growing your business online

                </div>
              </div>
              <div className='lg:w-1/2 lg:justify-end flex items-end lg:ml-8'>
                <p className='md:text-lg text-sm text-white my-4 md:my-5 max-w-md w-full'>    <p className="text-gray-600 text-md lg:text-lg">
                  Start building for free. Purchase a paid{" "}
                  <a href="#" className="text-[#2e4acd] font-bold">
                    Site plan
                  </a>{" "}
                  when you're ready to go live, then upgrade your{" "}
                  <a href="#" className="text-[#2e4acd] font-bold">
                    Workspace
                  </a>{" "}
                  to unlock greater collaboration.
                </p>
                  <div className='flex gap-4 mt-5'>
                    <Button variant={'default'} className={`border hover:bg-white hover:text-[#2e4acd] text-white hover:border-[#2e4acd] cursor-pointer bg-[#2e4acd]`}> Start building now!</Button>
                    <Button variant="outline" className={`border bg-white hover:text-white text-[#2e4acd] border-[#2e4acd] cursor-pointer hover:bg-[#2e4acd]`}>Learn to know</Button>
                  </div>
                </p>
              </div>

            </div>
          </div>
        </header>

      </section>

      <div className="w-full  text-black py-12 px-6 lg:px-20">
        {/* Header Section */}




        {/* Plans Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
  {/* Personal Plan */}
  <div className="relative flex flex-col">
    <div className="border border-gray-300 rounded-lg p-6 shadow-md bg-white flex flex-col flex-1">
      <h2 className="font-bold mb-4 text-2xl md:text-3xl tracking-tighter">Personal Plan</h2>
      <p className="text-2xl font-bold mb-4 text-[#2e4acd] px-4 pt-1 rounded-full bg-blue-50 w-fit flex items-center">
        $49<span className="text-sm font-normal text-[#2e4acd]">/month</span>
      </p>
      <p className="text-gray-600 text-md mb-4 ">
        Selling all the tools necessary for the more advanced seller. No transaction fees.
      </p>
      <Separator className="mb-4 border-b border-gray-300" />
      <ul className="space-y-2 text-sm text-gray-600 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center justify-between gap-2 py-1">
            <span className=" gap-3 flex items-center">
              <span className="text-[#2e4acd] font-thin">{feature.icon}</span>
              <span className="font-normal">{feature.text}</span>
            </span>
            <div className="flex justify-end">
              <div className="w-5 h-5 border-[1px] border-gray-400 rounded-full flex items-center justify-center">
                i
              </div>
            </div>
          </li>
        )).slice(0,3)}
      </ul>
      <Button variant={'default'} className={`border hover:bg-white hover:text-[#2e4acd] text-white hover:border-[#2e4acd] cursor-pointer bg-[#2e4acd] mt-6`}>Start free trial — 14 days</Button>
    </div>
  </div>

  {/* Business Plan */}
  <div className="relative flex flex-col">
    <div className="border rounded-2xl p-2 shadow-md bg-[#2e4acd] flex-grow">
      <h1 className="text-white text-sm font-semibold tracking-[0.2rem] uppercase flex-grow px-3 pb-3 pt-1">POPULAR PLAN</h1>
      <div className="border border-gray-300 rounded-lg p-6 shadow-md bg-white flex-grow flex flex-col flex-1">
        <h2 className="font-bold mb-4 text-2xl md:text-3xl tracking-tighter">Business Plan</h2>
        <p className="text-2xl font-bold mb-4 text-[#2e4acd] px-4 pt-1 rounded-full bg-blue-50 w-fit flex items-center">
          $49<span className="text-sm font-normal text-[#2e4acd]">/month</span>
        </p>
        <p className="text-gray-600 text-md mb-4 ">
          Selling all the tools necessary for the more advanced seller. No transaction fees.
        </p>
        <Separator className="mb-4 border-b border-gray-300" />
        <ul className="space-y-2 text-sm text-gray-600 flex-grow mb-7">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center justify-between gap-2 py-1">
              <span className="flex gap-3 items-center">
                <span className="text-[#2e4acd] font-thin">{feature.icon}</span>
                <span className="font-normal">{feature.text}</span>
              </span>
              <div className="flex justify-end">
                <div className="w-5 h-5 border-[1px] border-gray-400 rounded-full flex items-center justify-center">
                  i
                </div>
              </div>
            </li>
          )).slice(0,4)}
        </ul>
        <Button variant={'default'} className={`border hover:bg-white hover:text-[#2e4acd] text-white hover:border-[#2e4acd] cursor-pointer bg-[#2e4acd] mt-6`}>Start free trial — 14 days</Button>
      </div>
    </div>
  </div>

  {/* Commerce Plan */}
  <div className="relative flex flex-col">
    <div className="border border-gray-300 rounded-lg p-6 shadow-md bg-white flex flex-col flex-1">
      <h2 className="font-bold mb-4 text-2xl md:text-3xl tracking-tighter">Commerce Plan</h2>
      <p className="text-2xl font-bold mb-4 text-[#2e4acd] px-4 pt-1 rounded-full bg-blue-50 w-fit flex items-center">
        $49<span className="text-sm font-normal text-[#2e4acd]">/month</span>
      </p>
      <p className="text-gray-600 text-md mb-4 ">
        Selling all the tools necessary for the more advanced seller. No transaction fees.
      </p>
      <Separator className="mb-4 border-b border-gray-300 " />
      <ul className="space-y-2 text-sm text-gray-600 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center justify-between gap-2 py-1">
            <span className="flex gap-3">
              <span className="text-[#2e4acd] font-thin">{feature.icon}</span>
              <span className="font-normal">{feature.text}</span>
            </span>
            <div className="flex justify-end">
              <div className="w-5 h-5 border-[1px] border-gray-400 rounded-full flex items-center justify-center">
                i
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Button variant={'default'} className={`border hover:bg-white hover:text-[#2e4acd] text-white hover:border-[#2e4acd] cursor-pointer bg-[#2e4acd] mt-6`}>Start free trial — 14 days</Button>
    </div>
  </div>
</div>


        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          All prices are in USD and charged per site with applicable taxes added
          at checkout. If you are confused, <br /> you can{" "}
          <a href="#" className="text-[#2e4acd] font-bold">
            Compare plan
          </a>{" "}
          to know what is the difference.
        </div>
      </div>

      <div className=' w-full '>

        <section
          className=" w-full relative  flex items-center mt-6 justify-center flex-col px-4 lg:px-12 "

        >
          <header className=' w-full lg:px-0 md:px-10 lg:w-11/12 max-w-7xl justify-center item-center  h-full flex z-30'>
            <div className='w-full'>
              <div className='lg:flex items-center justify-between'>
                <div className='lg:w-1/2'>

                  <div className='text-3xl lg:text-5xl tracking-tighter font-bold mb-2 lg:w-full w-full md:w-2/3'> We’ve got you covered, 24/7 to all questions

                  </div>
                </div>
                <div className='lg:w-1/2 lg:justify-end flex items-end lg:ml-8'>
                  <p className='md:text-lg text-sm my-4 md:my-5 max-w-md w-full'>    <p className="text-md lg:text-lg">
                    When you create a website with Arobix, you get free unlimited hosting, top-of-the-line security, and dependable resources to help you succeed
                  </p>

                  </p>
                </div>

              </div>
            </div>
          </header>

        </section>

        <div className="w-full pb-5 px-4 lg:px-20">

          <AccordionDemo />
        </div>
        <div className='gap-4 my-6 flex justify-center'>
          <Button variant={'default'} className={`border hover:bg-white hover:text-[#2e4acd] text-white hover:border-[#2e4acd] cursor-pointer bg-[#2e4acd]`}> See more questions</Button>
          <Button variant="outline" className={`border bg-white hover:text-white text-[#2e4acd] border-[#2e4acd] cursor-pointer hover:bg-[#2e4acd]`}>Contact support</Button>

        </div>
      </div>


      <div className="bg-[#2e4acd] text-white py-16 relative lg:px-20 px-4 overflow-hidden">
        {/* Call to Action Section */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="lg:w-1/2 lg:text-left">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 tracking-tighter md:w-[80%] w-full">
              Free until you’re ready to launch!
            </h2>
            <p className="mb-8 text-md lg:text-lg w-full md:w-[80%]">
              Build your site for free and take as long as you need. Just add a site
              plan for more pages, and a custom domain when you’re ready for the
              world.
            </p>
            <Button className="bg-white text-[#2e4acd] px-6 py-3  font-semibold">
              Get started — it’s free
            </Button>
          </div>
          <div className="w-full lg:w-1/2 flex md:mt-0 mt-8 justify-center border-none">
            <video
              src="/assets/using2.mp4"
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
        </div>

        {/* Footer Links Section */}
        <div className="relative z-10 mt-16 lg:px-0 px-2">
          <div className="max-w-7xl mx-auto grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
            <div>
              <h3 className="font-bold mb-4 text-2xl md:text-3xl tracking-tighter">Product</h3>
              <ul className="space-y-2 text-lg">
                <li>Website Templates</li>
                <li>Websites</li>
                <li>Domains</li>
                <li>Online Stores</li>
                <li>Marketing Tools</li>
                <li>Extensions</li>
                <li>Social Media Tools</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-2xl md:text-3xl tracking-tighter">Customers</h3>
              <ul className="space-y-2 text-lg">
                <li>Website Examples</li>
                <li>Featured Customers</li>
                <li>Creators</li>
                <li>Businesses</li>
                <li>Online Stores</li>
                <li>Etsy Sellers</li>
                <li>Bloggers</li>
                <li>Weddings</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-2xl md:text-3xl tracking-tighter">Company</h3>
              <ul className="space-y-2 text-lg">
                <li>About</li>
                <li>Careers</li>
                <li>Investor Relations</li>
                <li>Our Brand</li>
                <li>Accessibility</li>
                <li>Affiliates</li>
                <li>Press & Media</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-2xl md:text-3xl tracking-tighter">Community</h3>
              <ul className="space-y-2 text-lg">
                <li>Help Center</li>
                <li>Hire an Expert</li>
                <li>Forum</li>
                <li>Webinars</li>
                <li>Developer Platform</li>
                <li>Professionals</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="mt-16 border-t border-white/20 pt-8 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
              <p>
                © 2025 Arobix. All Rights Reserved. Site by{" "}
                <span className="underline">Satwik Kanhere</span>
              </p>
              <div className="flex items-center gap-4">
                <a href="mailto:hello@Arobix.com" className="underline">
                  satwikkanhere2003@gmail.com
                </a>
                <a href="tel:+916284486063" className="underline">
                  (+91) 6284486063
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Pricing Cards Section */}
      {/* <section className="flex flex-col items-center justify-center gap-8 md:mt-28 mt-12 px-4 lg:px-16" >
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
      </section > */}
    
    </>
  );
}
