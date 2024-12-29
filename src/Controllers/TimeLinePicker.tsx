import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Button } from "@/components/ui/button";
import { ThemeSettings } from "@/lib/functions";
import { OptionsConfig } from "@/lib/structures";

export function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <div className='lg:w-1/2  flex items-end'>
                <div className='md:text-lg text-sm text-white my-4 md:my-5 max-w-md w-full'>Easiest develop design to website using Arobix and start your free website trial today. No credit required
                  <div className='flex gap-4 mt-5'>
                    <Button variant={'default'} className={`text-black hover:bg-white cursor-pointer bg-white`}> Start building now!</Button>
                    {/* <Button variant="outline" className={`bg-transparent border cursor-pointer ${ThemeSettings(OptionsConfig?._BORDER?.ENABLE, OptionsConfig?._TXTPALLETE?.ENABLE === "WHITE_FORMAT")} border-white hover:!text-black`}>Learn to know</Button> */}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-4">
  <Image
    src="/assets/11.png"
    alt="startup template"
    width={5200}
    height={5200}
    className="rounded-lg object-cover md:h-80  h-40 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
  />
  <video
    src="/assets/using2.mp4"
    className="rounded-lg object-cover md:h-80  h-40 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
    autoPlay
    preload="1"
    loop
    muted
    playsInline
  >
    Your browser does not support the video tag.
  </video>
  <Image
    src="/assets/12.png"
    alt="startup template"
    width={500}
    height={500}
    className="rounded-lg object-cover md:h-80  h-40 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
  />
  <Image
    src="/assets/13.png"
    alt="startup template"
    width={500}
    height={500}
    className="rounded-lg object-cover md:h-80  h-40 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
  />
</div>

        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div>
          <div className='lg:w-1/2  flex items-end'>
                <div className='md:text-lg text-sm text-white my-4 md:my-5 max-w-md w-full'>Easiest develop design to website using Arobix and start your free website trial today. No credit required
                  <div className='flex gap-4 mt-5'>
                    <Button variant={'default'} className={`text-black hover:bg-white cursor-pointer bg-white`}> Start building now!</Button>
                    {/* <Button variant="outline" className={`bg-transparent border cursor-pointer ${ThemeSettings(OptionsConfig?._BORDER?.ENABLE, OptionsConfig?._TXTPALLETE?.ENABLE === "WHITE_FORMAT")} border-white hover:!text-black`}>Learn to know</Button> */}
                  </div>
                </div>
              </div>
              <div className='lg:w-1/2  flex items-end '>
                <div className='md:text-lg text-sm text-white my-4 md:my-5 max-w-md w-full'>Easiest develop design to website using Arobix and start your free website trial today. No credit required
                  <div className='flex gap-4 mt-5'>
                    <Button variant={'default'} className={`text-black hover:bg-white cursor-pointer bg-white`}> Start building now!</Button>
                    {/* <Button variant="outline" className={`bg-transparent border cursor-pointer ${ThemeSettings(OptionsConfig?._BORDER?.ENABLE, OptionsConfig?._TXTPALLETE?.ENABLE === "WHITE_FORMAT")} border-white hover:!text-black`}>Learn to know</Button> */}
                  </div>
                </div>
              </div>
          <div className="grid lg:grid-cols-2 gap-4">
          <Image
    src="/assets/17.png"
    alt="startup template"
    width={5200}
    height={5200}
    className="rounded-lg object-cover md:h-80 h-40 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
  />
  <video
    src="/assets/using2.mp4"
    className="rounded-lg object-cover md:h-80 h-40 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
    autoPlay
    preload="1"
    loop
    muted
    playsInline
  >
    Your browser does not support the video tag.
  </video>
  <Image
    src="/assets/18.png"
    alt="startup template"
    width={500}
    height={500}
    className="rounded-lg object-cover md:h-80 h-40 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
  />
  <Image
    src="/assets/16.png"
    alt="startup template"
    width={500}
    height={500}
    className="rounded-lg object-cover md:h-80 h-40 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
  />
          </div>
        </div>
      ),
    },
    {
      title: "Changelog",
      content: (
        <div>
         <div className='lg:w-1/2 flex items-end'>
                <div className='md:text-lg text-sm text-white my-4 md:my-5 max-w-md w-full'>Easiest develop design to website using Arobix and start your free website trial today. No credit required
                  <div className='flex gap-4 mt-5'>
                    <Button variant={'default'} className={`text-black hover:bg-white cursor-pointer bg-white`}> Start building now!</Button>
                    {/* <Button variant="outline" className={`bg-transparent border cursor-pointer ${ThemeSettings(OptionsConfig?._BORDER?.ENABLE, OptionsConfig?._TXTPALLETE?.ENABLE === "WHITE_FORMAT")} border-white hover:!text-black`}>Learn to know</Button> */}
                  </div>
                </div>
              </div>
          <div className="grid lg:grid-cols-2 gap-4">
          <Image
    src="/assets/19.png"
    alt="startup template"
    width={5200}
    height={5200}
    className="rounded-lg object-cover md:h-80 h-40 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
  />
  <video
    src="/assets/using4.mp4"
    className="rounded-lg object-cover md:h-80 h-40 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
    autoPlay
    preload="1"
    loop
    muted
    playsInline
  >
    Your browser does not support the video tag.
  </video>
  <Image
    src="/assets/20.png"
    alt="startup template"
    width={500}
    height={500}
    className="rounded-lg object-cover md:h-80  h-40 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
  />
  <Image
    src="/assets/21.png"
    alt="startup template"
    width={500}
    height={500}
    className="rounded-lg object-cover md:h-80  h-40 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
  />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
