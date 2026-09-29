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
import { Pipeline } from '@prisma/client'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { CreatePipelineFormSchema } from '@/lib/types'
import {
  saveActivityLogsNotification,
  upsertPipeline,
} from '@/lib/queries'
import { toast } from '../ui/use-toast'
import { useModal } from '@/providers/modal-provider'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

interface CreatePipelineFormProps {
  defaultData?: Pipeline
  subAccountId: string
}

/** Renders bare — CustomModal supplies the heading. */
const CreatePipelineForm: React.FC<CreatePipelineFormProps> = ({
  defaultData,
  subAccountId,
}) => {
  const { setClose } = useModal()
  const router = useRouter()
  const form = useForm<z.infer<typeof CreatePipelineFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(CreatePipelineFormSchema),
    defaultValues: {
      name: defaultData?.name || '',
    },
  })

  useEffect(() => {
    if (defaultData) {
      form.reset({
        name: defaultData.name || '',
      })
    }
  }, [defaultData])

  const onSubmit = async (values: z.infer<typeof CreatePipelineFormSchema>) => {
    if (!subAccountId) return
    try {
      const response = await upsertPipeline({
        ...values,
        id: defaultData?.id,
        subAccountId: subAccountId,
      })

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Updated a pipeline | ${response?.name}`,
        subaccountId: subAccountId,
      })

      toast({
        title: 'Success',
        description: 'Saved pipeline details',
      })
      router.refresh()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: 'Could not save pipeline details',
      })
    }

    setClose()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormBody>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Pipeline name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Sales pipeline"
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Pipelines group the lanes a deal moves through.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormFooter>
            <Button
              type="button"
              variant="outline"
              onClick={setClose}
              disabled={form.formState.isSubmitting}
            >
              Cancel
            </Button>
            <SubmitButton pendingText="Saving…">
              {defaultData ? 'Save changes' : 'Create pipeline'}
            </SubmitButton>
          </FormFooter>
        </FormBody>
      </form>
    </Form>
  )
}

export default CreatePipelineForm
