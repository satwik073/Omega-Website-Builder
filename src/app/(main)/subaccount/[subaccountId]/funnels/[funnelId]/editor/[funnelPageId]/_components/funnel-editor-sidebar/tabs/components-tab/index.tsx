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
import SectionPlaceholder from './section-placeholder'
import DivPlaceholder from './div-placeholder'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import BlockQuotePlaceholder from './blockquote-placeholder'
import RichPlaceholder from './richtext-placeholder'
import CollectionPlaceholder from './collection-placeholder'
import ListItemPlaceholder from './listitem-placeholder'
import ListPlaceholder from './list-placeholder'
import LinkBoxPlaceholder from './linkbox-placeholder'
import ButtonPlaceholder from './button-placeholder'
import InputPlaceholder from './input-placeholder'
import FileUploadPlaceholder from './fileupload-placeholder'
import TextAreaPlaceholder from './textarea-placeholder'
import CheckboxPlaceholder from './checkbox-placeholder'
import RadioPlaceholder from './radio-placeholder'
import SelectPlaceholder from './select-placeholder'
import FormBtnPlaceholder from './formbutton-placeholder'
import CaptchaPlaceholder from './recaptcha-placeholder'
import SearchPlaceholder from './search-placeholder'
import BackVideoPlaceholder from './background-video-placeholder'
import DropdownPlaceholder from './dropdown-placeholder'
import CodePlaceholder from './codeblock-placeholder'
import LightboxPlaceholder from './lightbox-placeholder'
import NavPlaceholder from './navbar-placeholder'
import SlidesPlaceholder from './slider-placeholder'
import TabsPlaceholder from './tabs-placeholder'
import MapPlaceholder from './map-placeholder'
import FacebookPlaceholder from './facebook-placeholder'
import TwitterPlaceholder from './twitter-placeholder'

type Props = {}

const ComponentsTab = (props: Props) => {
  const elements: {
    Component: React.ReactNode
    label: string
    id: EditorBtns
    group: 'layout' | 'elements' | 'structure' | 'media' | 'cms' | 'typography' | 'forms'
  }[] = [
      {
        Component: <TextPlaceholder />,
        label: 'Text',
        id: 'text',
        group: 'typography',
      },
      {
        Component: <HeadingPlaceholder />,
        label: 'Heading',
        id: 'heading',
        group: 'typography',
      },
      {
        Component: <ParaPlaceholder />,
        label: 'Paragraph',
        id: 'paragraph',
        group: 'typography',
      },
      {
        Component: <BlockQuotePlaceholder />,
        label: 'Quote',
        id: 'BlockQuote',
        group: 'typography',
      },
      {
        Component: <RichPlaceholder />,
        label: 'Rich Text',
        id: 'RichText',
        group: 'typography',
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
        Component: <GridContainerPlaceholder />,
        label: 'Grid',
        id: 'Grid',
        group: 'structure',
      },
      {
        Component: <VFlexContainerPlaceholder />,
        label: 'V Flex',
        id: 'VFlex',
        group: 'structure',
      },
      {
        Component: <HFlexContainerPlaceholder />,
        label: 'H Flex',
        id: 'HFlex',
        group: 'structure',
      },
      {
        Component: <PageColumnsPlaceholder />,
        label: 'Page Slot',
        id: 'pageSlot',
        group: 'structure',
      },
      {
        Component: <SectionPlaceholder />,
        label: 'Section',
        id: 'section',
        group: 'structure',
      },
      {
        Component: <DivPlaceholder />,
        label: 'Div Block',
        id: 'div',
        group: 'structure',
      },


      {
        Component: <ContactFormComponentPlaceholder />,
        label: 'Contact',
        id: 'contactForm',
        group: 'elements',
      },
      {
        Component: <ContactFormComponentPlaceholder />,
        label: 'Form Block',
        id: 'contactForm',
        group: 'elements',
      },
      {
        Component: <InputPlaceholder/>,
        label: 'Input',
        id: 'input',
        group: 'elements',
      },
      {
        Component: <FileUploadPlaceholder/>,
        label: 'File Upload',
        id: 'input',
        group: 'elements',
      },
      {
        Component: <TextAreaPlaceholder/>,
        label: 'Text Area',
        id: 'input',
        group: 'elements',
      },
      {
        Component: <CheckboxPlaceholder/>,
        label: 'Checkbox',
        id: 'input',
        group: 'elements',
      },
      {
        Component: <RadioPlaceholder/>,
        label: 'Radio',
        id: 'input',
        group: 'elements',
      },
      {
        Component: <SelectPlaceholder/>,
        label: 'Select',
        id: 'input',
        group: 'elements',
      },
      {
        Component: <FormBtnPlaceholder/>,
        label: 'Form Button',
        id: 'input',
        group: 'elements',
      },
      {
        Component: <CaptchaPlaceholder/>,
        label: 'reCAPTCHA',
        id: 'input',
        group: 'elements',
      },

      {
        Component: <LinkPlaceholder />,
        label: 'Link',
        id: 'link',
        group: 'typography',
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
        Component: <YoutubeVideoPlaceholder />,
        label: 'Youtube',
        id: 'video',
        group: 'media',
      },
      {
        Component: <AnimationPlaceholder />,
        label: 'Animation',
        id: 'animation',
        group: 'media',
      },
      {
        Component: <SplinePlaceholder />,
        label: 'Spline',
        id: 'spline',
        group: 'media',
      },
      {
        Component: <RivePlaceholder />,
        label: 'Rive',
        id: 'rive',
        group: 'media',
      },
    
      {
        Component: <CollectionPlaceholder />,
        label: 'Collection',
        id: 'CMS',
        group: 'cms',
      },
      {
        Component: <ListItemPlaceholder />,
        label: 'List Item',
        id: 'CMS',
        group: 'cms',
      },
      {
        Component: <ListPlaceholder />,
        label: 'List',
        id: 'CMS',
        group: 'cms',
      },
      {
        Component: <LinkBoxPlaceholder/>,
        label: 'Link Box',
        id: 'linkBox',
        group: 'typography',
      },
      {
        Component: <ButtonPlaceholder/>,
        label: 'Button',
        id: 'button',
        group: 'typography',
      },
      {
        Component: <SearchPlaceholder/>,
        label: 'Search',
        id: 'button',
        group: 'typography',
      },
      {
        Component: <BackVideoPlaceholder/>,
        label: 'Background Video',
        id: 'button',
        group: 'typography',
      },
      {
        Component: <DropdownPlaceholder/>,
        label: 'Dropdown',
        id: 'button',
        group: 'typography',
      },
      {
        Component: <CodePlaceholder/>,
        label: 'Code Block',
        id: 'button',
        group: 'typography',
      },
      {
        Component: <LightboxPlaceholder/>,
        label: 'Lightbox',
        id: 'button',
        group: 'typography',
      },
      {
        Component:<NavPlaceholder/>,
        label: 'Navbar',
        id: 'button',
        group: 'typography',
      },
      {
        Component:<SlidesPlaceholder/>,
        label: 'Slider',
        id: 'button',
        group: 'typography',
      },
      {
        Component:<TabsPlaceholder/>,
        label: 'Tabs',
        id: 'button',
        group: 'typography',
      },
      {
        Component:<MapPlaceholder/>,
        label: 'Map',
        id: 'button',
        group: 'typography',
      },
      {
        Component:<FacebookPlaceholder/>,
        label: 'Facebook',
        id: 'button',
        group: 'typography',
      },
      {
        Component:<TwitterPlaceholder/>,
        label: 'X (Twitter)',
        id: 'button',
        group: 'typography',
      },



    ]

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={['Layout', 'Elements', 'Structure', 'Basic', 'Typography', 'CMS', 'Media', 'Forms', 'Advanced', 'Forms']}
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
                {(element?.label === 'Section' || element?.label === 'Div Block') && (
                  <div className='mt-[-10px]'>
                    <Button className=' h-4  w-10 rounded-full bg-red-200 border-red-600 border text-red-600 hover:bg-red-200 text-[10px]' variant={'destructive'}>Soon</Button>
                  </div>
                )}
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
                {(element?.label === 'Animation' || element?.label === 'Spline' || element?.label === 'Rive' || element?.label === 'Image') && (
                  <div className='mt-[-10px] z-50 relative'>
                    <Button className=' h-4  z-50 rounded-full relative w-10 bg-red-200 border-red-600 border text-red-600 hover:bg-red-200 text-[10px]' variant={'destructive'}>Soon</Button>
                  </div>
                )}
                {element.Component}
                <span className="text-[13px] dark:text-[#ffffffab]">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Typography" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Typography</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-2">
          {elements
            .filter((element) => element.group === 'typography')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center border border-gray-300  dark:border-neutral-700 pb-4 rounded-md flex"
              >
                {(element?.label === 'Rich Text' || element?.label === 'Quote' || element?.label === 'Link Box' || element?.label === 'Button') && (
                  <div className='mt-[-10px] z-50 relative'>
                    <Button className=' h-4  z-50 relative w-10 rounded-full bg-red-200 border-red-600 border text-red-600 hover:bg-red-200 text-[10px]' variant={'destructive'}>Soon</Button>
                  </div>
                )}
                {element.Component}
                <span className="text-[13px] text-center dark:text-[#ffffffab]">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="CMS" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">CMS</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-2">
          {elements
            .filter((element) => element.group === 'cms')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center border border-gray-300 dark:border-neutral-700 pb-4 rounded-md flex"
              >
                {(element?.label === 'Collection' || element?.label === 'List Item' || element?.label === 'List') && (
                  <div className='mt-[-10px] relative'>
                    <Button
                      className='h-4 rounded-full w-10 bg-red-200 border-red-600 border text-red-600 hover:bg-red-200 text-[10px] relative z-[9999]'
                      variant={'destructive'}
                    >
                      Soon
                    </Button>
                  </div>
                )}
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
                  {(element?.label === 'Input' || element?.label === 'File Upload' || element?.label === 'Text Area' || element?.label === 'Checkbox' || element?.label === 'Radio' || element?.label === 'Select' || element?.label === 'Form Button' || element?.label === 'reCAPTCHA') && (
                  <div className='mt-[-10px] relative'>
                    <Button
                      className='h-4 rounded-full w-10 bg-red-200 border-red-600 border text-red-600 hover:bg-red-200 text-[10px] relative z-[9999]'
                      variant={'destructive'}
                    >
                      Soon
                    </Button>
                  </div>
                )}
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
