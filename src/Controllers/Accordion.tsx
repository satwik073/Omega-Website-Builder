import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function AccordionDemo() {
    return (
        <Accordion type="single" collapsible className="w-full py-8">
        <div className="max-w-7xl grid md:grid-cols-2 mx-auto gap-5">
      
          <AccordionItem value="item-1" className="lg:px-0 px-4">
            <AccordionTrigger className="text-xl tracking-tighter text-left">Why should I have a website?</AccordionTrigger>
            <AccordionContent className="md:text-md">
              A website is the first step toward growing an online presence for your business or passion project, whether you’re looking to sell online or create a portfolio.
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="item-2" className="lg:px-0 px-4">
          <AccordionTrigger className="text-xl tracking-tighter text-left">What does a Magicweb subscription include?</AccordionTrigger>
            <AccordionContent className="md:text-md">
              A Magicweb subscription includes access to website templates, hosting, custom domains, and 24/7 support to help you get started easily.
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="item-3" className="lg:px-0 px-4">
          <AccordionTrigger className="text-xl tracking-tighter text-left">Is Magicweb right for me?</AccordionTrigger>
            <AccordionContent className="md:text-md">
              Yes, whether you’re a beginner or a pro, Magicweb offers the tools you need to design, build, and grow your online presence effortlessly.
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="item-4" className="lg:px-0 px-4">
          <AccordionTrigger className="text-xl tracking-tighter text-left">How do I start building my website?</AccordionTrigger>
            <AccordionContent className="md:text-md">
              Start by selecting a template that suits your style. Customize it using our drag-and-drop tools, then publish your site to go live.
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="item-5" className="lg:px-0 px-4">
          <AccordionTrigger className="text-xl tracking-tighter text-left">Can someone build a website for me?</AccordionTrigger>
            <AccordionContent className="md:text-md">
              Yes, our team offers professional website-building services for an additional fee if you prefer expert assistance.
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="item-6" className="lg:px-0 px-4">
            <AccordionTrigger className="text-xl tracking-tighter text-left">How do I get a custom domain for my website?</AccordionTrigger>
            <AccordionContent className="md:text-md">
              You can purchase a custom domain directly through Magicweb or connect an existing one to your website.
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="item-7" className="lg:px-0 px-4">
            <AccordionTrigger className="text-xl tracking-tighter text-left">How do I start selling online?</AccordionTrigger>
            <AccordionContent className="md:text-md">
              Use Magicweb’s e-commerce features to set up an online store, add products, and start accepting payments seamlessly.
            </AccordionContent>
          </AccordionItem>
      
          <AccordionItem value="item-8" className="lg:px-0 px-4">
            <AccordionTrigger className="text-xl tracking-tighter text-left">What are the security features offered?</AccordionTrigger>
            <AccordionContent className="md:text-md">
              Magicweb provides top-of-the-line security, including SSL certificates, encrypted connections, and regular updates to protect your website and data.
            </AccordionContent>
          </AccordionItem>
        </div>
      </Accordion>
      
    )
  }
  