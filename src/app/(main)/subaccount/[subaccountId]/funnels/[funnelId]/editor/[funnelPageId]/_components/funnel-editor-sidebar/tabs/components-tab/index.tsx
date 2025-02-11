import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { EditorBtns } from '@/lib/constants'
import React from 'react'
import TextPlaceholder from './text-placeholder'
import ContainerPlaceholder from './container-placeholder'
import VideoPlaceholder from './video-placeholder'
import TwoColumnsPlaceholder from './two-columns-placeholder'
import LinkPlaceholder from './link-placeholder'
import ContactFormComponentPlaceholder from './contact-form-placeholder'
import CheckoutPlaceholder from './checkout-placeholder'
import ThreeColumnsPlaceholder from './three-columns-placeholder'
import HeadingPlaceholder from './heading-placeholder'
import ImagePlaceholder from './image-placeholder'
import VFlexContainerPlaceholder from './vflex-placeholder'
import HFlexContainerPlaceholder from './hflex-placeholder'
import GridContainerPlaceholder from './grid-placeholder'
import PageColumnsPlaceholder from './pageslot-placeholder'
import ParaPlaceholder from './para-placeholder'
import YoutubeVideoPlaceholder from './youtube-placeholder'
import AnimationPlaceholder from './animation-placeholder'
import SplinePlaceholder from './spline-placeholder'
import RivePlaceholder from './rive-placeholder'

type Props = {}

const ComponentsTab = (props: Props) => {
  const elements: {
    Component: React.ReactNode
    label: string
    id: EditorBtns
    group: 'layout' | 'elements' | 'structure' | 'media'
  }[] = [
      {
        Component: <TextPlaceholder />,
        label: 'Text',
        id: 'text',
        group: 'elements',
      },
      {
        Component: <HeadingPlaceholder />,
        label: 'Heading',
        id: 'heading',
        group: 'elements',
      },
      {
        Component: <ContainerPlaceholder />,
        label: 'Container',
        id: 'container',
        group: 'structure',
      },
      {
        Component: <TwoColumnsPlaceholder />,
        label: '2 Columns',
        id: '2Col',
        group: 'structure',
      },
      
      {
        Component: <ThreeColumnsPlaceholder />,
        label: '3 Columns',
        id: '3Col',
        group: 'structure',
      },
      {
        Component: <GridContainerPlaceholder/>,
        label: 'Grid',
        id: 'Grid',
        group: 'structure',
      },
      {
        Component: <VFlexContainerPlaceholder/>,
        label: 'V Flex',
        id: 'VFlex',
        group: 'structure',
      },
      {
        Component: <HFlexContainerPlaceholder/>,
        label: 'H Flex',
        id: 'HFlex',
        group: 'structure',
      },
      {
        Component: <PageColumnsPlaceholder/>,
        label: 'Page Slot',
        id: 'pageSlot',
        group: 'structure',
      },
      {
        Component: <ParaPlaceholder/>,
        label: 'Paragraph',
        id: 'paragraph',
        group: 'elements',
      },
    
      {
        Component: <ContactFormComponentPlaceholder />,
        label: 'Contact',
        id: 'contactForm',
        group: 'elements',
      },
      
      {
        Component: <LinkPlaceholder />,
        label: 'Link',
        id: 'link',
        group: 'elements',
      },
      {
        Component: <ImagePlaceholder />,
        label: 'Image',
        id: 'image',
        group: 'media',
      },
      {
        Component: <VideoPlaceholder />,
        label: 'Video',
        id: 'video',
        group: 'media',
      },
      {
        Component: <YoutubeVideoPlaceholder/>,
        label: 'Youtube',
        id: 'video',
        group: 'media',
      },
      {
        Component: <AnimationPlaceholder/>,
        label: 'Animation',
        id: 'animation',
        group: 'media',
      },
      {
        Component: <SplinePlaceholder/>,
        label: 'Spline',
        id: 'spline',
        group: 'media',
      },
      {
        Component: <RivePlaceholder/>,
        label: 'Rive',
        id: 'rive',
        group: 'media',
      },
      {
        Component: <CheckoutPlaceholder />,
        label: 'Checkout',
        id: 'paymentForm',
        group: 'elements',
      },
     
     
      
    ]

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={['Layout', 'Elements', 'Structure' , 'Basic', 'Typography','CMS','Media','Forms','Advanced']}
    >
      <AccordionItem value="Structure" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Structure</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-2">
          {elements
            .filter((element) => element.group === 'structure')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center border text-sm  border-gray-300 dark:border-neutral-700 pb-4 rounded-md flex"
              >
                {element.Component}
                <span className="text-[13px] dark:text-[#ffffffab]">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Media" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Media</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-2">
          {elements
            .filter((element) => element.group === 'media')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center border border-gray-300  dark:border-neutral-700 pb-4 rounded-md flex"
              >
                {element.Component}
                <span className="text-[13px] dark:text-[#ffffffab]">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Elements" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-2">
          {elements
            .filter((element) => element.group === 'elements')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center border border-gray-300  dark:border-neutral-700 pb-4 rounded-md flex"
              >
                {element.Component}
                <span className="text-[13px] dark:text-[#ffffffab]">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Elements" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-2">
          {elements
            .filter((element) => element.group === 'elements')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center border border-gray-300  dark:border-neutral-700 pb-4 rounded-md flex"
              >
                {element.Component}
                <span className="text-[13px] dark:text-[#ffffffab]">{element.label}</span>              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Elements" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-2">
          {elements
            .filter((element) => element.group === 'elements')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center border border-gray-300  dark:border-neutral-700 pb-4 rounded-md flex"
              >
                {element.Component}
                <span className="text-[13px] dark:text-[#ffffffab]">{element.label}</span>              </div>
            ))}
        </AccordionContent>
      </AccordionItem>

    </Accordion>
  )
}

export default ComponentsTab
