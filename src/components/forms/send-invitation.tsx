'use client'
import React from 'react'
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
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { saveActivityLogsNotification, sendInvitation } from '@/lib/queries'
import { useToast } from '../ui/use-toast'

interface SendInvitationProps {
  agencyId: string
}

const ROLES = [
  {
    value: 'AGENCY_ADMIN',
    label: 'Agency admin',
    hint: 'Full access to every sub account and to billing.',
  },
  {
    value: 'SUBACCOUNT_USER',
    label: 'Sub account user',
    hint: 'Can edit the sub accounts they are given access to.',
  },
  {
    value: 'SUBACCOUNT_GUEST',
    label: 'Sub account guest',
    hint: 'Read-only access to the sub accounts they are given.',
  },
] as const

/** Renders bare — CustomModal supplies the heading. */
const SendInvitation: React.FC<SendInvitationProps> = ({ agencyId }) => {
  const { toast } = useToast()
  const userDataSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    role: z.enum(['AGENCY_ADMIN', 'SUBACCOUNT_USER', 'SUBACCOUNT_GUEST']),
  })

  const form = useForm<z.infer<typeof userDataSchema>>({
    resolver: zodResolver(userDataSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      role: 'SUBACCOUNT_USER',
    },
  })

  const onSubmit = async (values: z.infer<typeof userDataSchema>) => {
    try {
      const res = await sendInvitation(values.role, values.email, agencyId)
      await saveActivityLogsNotification({
        agencyId: agencyId,
        description: `Invited ${res.email}`,
        subaccountId: undefined,
      })
      toast({
        title: 'Invitation sent',
        description: `${res.email} will get an email shortly.`,
      })
      form.reset()
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Could not send invitation',
        description: 'Check the address and try again.',
      })
    }
  }

  const selectedRole = form.watch('role')
  const roleHint = ROLES.find((r) => r.value === selectedRole)?.hint

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormBody>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="teammate@company.com"
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Someone who already has a pending invitation will not be sent
                  another one.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Role</FormLabel>
                <Select
                  disabled={form.formState.isSubmitting}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role…" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ROLES.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* The hint tracks the selection, so the consequence of the
                    choice is visible before the invitation goes out. */}
                <FormDescription>{roleHint}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormFooter>
            <SubmitButton pendingText="Sending…">Send invitation</SubmitButton>
          </FormFooter>
        </FormBody>
      </form>
    </Form>
  )
}

export default SendInvitation
