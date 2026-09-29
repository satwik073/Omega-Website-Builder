'use client'
import React, { useEffect } from 'react'
import { z } from 'zod'
import {
  Form,
  FormBody,
  FormControl,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
  SubmitButton,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Lane } from '@prisma/client'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { LaneFormSchema } from '@/lib/types'
import {
  getPipelineDetails,
  saveActivityLogsNotification,
  upsertLane,
} from '@/lib/queries'
import { toast } from '../ui/use-toast'
import { useModal } from '@/providers/modal-provider'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

interface CreateLaneFormProps {
  defaultData?: Lane
  pipelineId: string
}

/** Renders bare — CustomModal supplies the heading. */
const LaneForm: React.FC<CreateLaneFormProps> = ({
  defaultData,
  pipelineId,
}) => {
  const { setClose } = useModal()
  const router = useRouter()
  const form = useForm<z.infer<typeof LaneFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(LaneFormSchema),
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

  const onSubmit = async (values: z.infer<typeof LaneFormSchema>) => {
    if (!pipelineId) return
    try {
      const response = await upsertLane({
        ...values,
        id: defaultData?.id,
        pipelineId: pipelineId,
        order: defaultData?.order,
      })

      const d = await getPipelineDetails(pipelineId)
      if (!d) return

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Updated a lane | ${response?.name}`,
        subaccountId: d.subAccountId,
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
                <FormLabel required>Lane name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Qualified leads"
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
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
              {defaultData ? 'Save changes' : 'Create lane'}
            </SubmitButton>
          </FormFooter>
        </FormBody>
      </form>
    </Form>
  )
}

export default LaneForm
