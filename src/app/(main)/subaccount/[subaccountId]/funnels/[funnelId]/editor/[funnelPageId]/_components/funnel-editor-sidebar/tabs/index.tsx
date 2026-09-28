import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Database, Plus, SettingsIcon, SquareStackIcon } from 'lucide-react'

type Props = {}

const TabList = (props: Props) => {
  return (
    <TabsList className="flex h-fit w-full flex-col items-center gap-1 bg-transparent p-2">
      <TabsTrigger
        value="Settings"
        className="size-10 rounded-[var(--radius)] p-0 text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-foreground"
        >
        <SettingsIcon />
      </TabsTrigger>
      <TabsTrigger
        value="Components"
        className="size-10 rounded-[var(--radius)] p-0 text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-foreground"
        >
        <Plus />
      </TabsTrigger>

      <TabsTrigger
        value="Layers"
        className="size-10 rounded-[var(--radius)] p-0 text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-foreground"
        >
        <SquareStackIcon />
      </TabsTrigger>
      <TabsTrigger
        value="Media"
        className="size-10 rounded-[var(--radius)] p-0 text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-foreground"
        >
        <Database />
      </TabsTrigger>
    </TabsList>
  )
}

export default TabList
