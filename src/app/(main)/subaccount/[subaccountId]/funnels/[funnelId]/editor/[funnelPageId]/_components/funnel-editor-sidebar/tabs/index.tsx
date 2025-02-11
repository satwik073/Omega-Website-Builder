import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Database, Plus, SettingsIcon, SquareStackIcon } from 'lucide-react'

type Props = {}

const TabList = (props: Props) => {
  return (
    <TabsList className=" flex items-center flex-col justify-evenly w-full bg-transparent h-fit gap-4 ">
      <TabsTrigger
        value="Settings"
        className="w-10 h-10 p-0 border bg-white text-black dark:bg-black dark:border-black/40 border-gray-300 data-[state=active]:bg-muted data-[state=active]:text-black"
        >
        <SettingsIcon />
      </TabsTrigger>
      <TabsTrigger
        value="Components"
        className="w-10 h-10 p-0 border bg-white dark:bg-black dark:border-black/40 border-gray-300 data-[state=active]:bg-muted data-[state=active]:text-black"
        >
        <Plus />
      </TabsTrigger>

      <TabsTrigger
        value="Layers"
        className="w-10 h-10 p-0 border bg-white dark:bg-black dark:border-black/40 border-gray-300 data-[state=active]:bg-muted data-[state=active]:text-black"
        >
        <SquareStackIcon />
      </TabsTrigger>
      <TabsTrigger
        value="Media"
        className="w-10 h-10 p-0 border bg-white dark:bg-black dark:border-black/40 border-gray-300 data-[state=active]:bg-muted data-[state=active]:text-black"
        >
        <Database />
      </TabsTrigger>
    </TabsList>
  )
}

export default TabList
