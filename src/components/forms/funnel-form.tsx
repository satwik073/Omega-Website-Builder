'use client'
import React, { useEffect } from 'react'
import { z } from 'zod'
import {
  Form,
  FormBody,
  FormControl,
  FormDescription,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
  SubmitButton,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Funnel } from '@prisma/client'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { CreateFunnelFormSchema } from '@/lib/types'
import { saveActivityLogsNotification, upsertFunnel } from '@/lib/queries'
import { v4 } from 'uuid'
import { toast } from '../ui/use-toast'
import { useModal } from '@/providers/modal-provider'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import FileUpload from '../global/file-upload'

interface CreateFunnelProps {
  defaultData?: Funnel
  subAccountId: string
}

/** Renders bare — the host supplies the heading (modal or settings card). */
const FunnelForm: React.FC<CreateFunnelProps> = ({
  defaultData,
  subAccountId,
}) => {
  const { setClose } = useModal()
  const router = useRouter()
  const form = useForm<z.infer<typeof CreateFunnelFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(CreateFunnelFormSchema),
    defaultValues: {
      name: defaultData?.name || '',
      description: defaultData?.description || '',
      favicon: defaultData?.favicon || '',
      subDomainName: defaultData?.subDomainName || '',
    },
  })

  useEffect(() => {
    if (defaultData) {
      form.reset({
        description: defaultData.description || '',
        favicon: defaultData.favicon || '',
        name: defaultData.name || '',
        subDomainName: defaultData.subDomainName || '',
      })
    }
  }, [defaultData])

  const onSubmit = async (values: z.infer<typeof CreateFunnelFormSchema>) => {
    if (!subAccountId) return
    try {
      const response = await upsertFunnel(
        subAccountId,
        { ...values, liveProducts: defaultData?.liveProducts || '[]' },
        defaultData?.id || v4()
      )
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Updated funnel | ${response.name}`,
        subaccountId: subAccountId,
      })
      toast({
        title: 'Success',
        description: 'Saved funnel details',
      })
      setClose()
      router.refresh()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: 'Could not save funnel details',
      })
    }
  }

  const busy = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormBody>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Funnel name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Spring campaign"
                    disabled={busy}
                    {...field}
                  />
                </FormControl>
                {/* These three fields previously had no FormMessage, so a
                    validation failure blocked submit with nothing on screen
                    to explain why. */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What is this funnel for?"
                    disabled={busy}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Internal only — visitors never see this.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subDomainName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub domain</FormLabel>
                <FormControl>
                  <Input
                    placeholder="spring"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    disabled={busy}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The funnel will be published at this sub domain.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="favicon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Favicon</FormLabel>
                <FormControl>
                  <FileUpload
                    apiEndpoint="subaccountLogo"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormFooter>
            <SubmitButton pendingText="Saving…">
              {defaultData ? 'Save changes' : 'Create funnel'}
            </SubmitButton>
          </FormFooter>
        </FormBody>
      </form>
    </Form>
  )
}

export default FunnelForm
