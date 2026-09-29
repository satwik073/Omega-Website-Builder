'use client'
import { Agency, Role } from '@prisma/client'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { useRouter } from 'next/navigation'
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from '../ui/alert-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
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
  FormRow,
  SubmitButton,
} from '../ui/form'
import { useToast } from '../ui/use-toast'
import * as z from 'zod'
import FileUpload from '../global/file-upload'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import {deleteAgency,initUser,saveActivityLogsNotification,sendInvitation,updateAgencyDetails,upsertAgency,} from '@/lib/queries'

type Props = {
  data?: Partial<Agency>,
  typeConfiguration?:
  'AGENCY_CONFIGURATION'
  | 'AGENCY_SETTINGS'
  | 'SUBACCOUNT_ONBOARD'
  | 'SUBACCOUNT_SETTINGS'
  titleContent? : string
  descriptionContent? : string

}

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Agency name must be atleast 2 chars.' }),
  companyEmail: z.string().min(1),
  companyPhone: z.string().min(1),
  whiteLabel: z.boolean(),
  address: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  agencyLogo: z.string().optional(),
})


// Only include address keys the user actually filled; Stripe rejects empty
// strings (notably `country`). Returns {} when nothing was entered.
const buildStripeAddress = (values: {
  name: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
}) => {
  const address = {
    ...(values.city ? { city: values.city } : {}),
    ...(values.country ? { country: values.country } : {}),
    ...(values.address ? { line1: values.address } : {}),
    ...(values.zipCode ? { postal_code: values.zipCode } : {}),
    ...(values.state ? { state: values.state } : {}),
  }
  if (Object.keys(address).length === 0) return {}
  return { address, shipping: { address, name: values.name } }
}

const AgencyDetails = ({ data, typeConfiguration  , titleContent, descriptionContent }: Props) => {
  const { toast } = useToast()
  const router = useRouter()
  const [deletingAgency, setDeletingAgency] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data?.name || "",
      companyEmail: data?.companyEmail || "",
      companyPhone: data?.companyPhone || "",
      whiteLabel: data?.whiteLabel || false,
      address: data?.address || "",
      city: data?.city || "",
      zipCode: data?.zipCode || "",
      state: data?.state || "",
      country: data?.country || "",
      agencyLogo: data?.agencyLogo || '',
    },
  })
  const isLoading = form.formState.isSubmitting

  useEffect(() => {
    if (!data) return
    // reset() replaces the entire form state, so a partial `data`
    // (e.g. only companyEmail) would blank every other field.
    form.reset({ ...form.getValues(), ...data }, { keepDirtyValues: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data ?? null)])

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      let newUserData
      let custId
      if (!data?.id) {
        const bodyData = {
          email: values.companyEmail,
          name: values.name,
          // Address is optional now, so only send the fields that were filled.
          // Stripe rejects empty strings for `country`, and an address object
          // with nothing in it, so omit both entirely when nothing was entered.
          ...buildStripeAddress(values),
        }

        const customerResponse = await fetch('/api/stripe/create-customer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
        })
        if (!customerResponse.ok) {
          throw new Error(
            `Could not create Stripe customer: ${await customerResponse.text()}`
          )
        }
        const customerData: { customerId: string } =
          await customerResponse.json()
        custId = customerData.customerId
      }

      newUserData = await initUser({ role: 'AGENCY_OWNER' })
      if (!data?.customerId && !custId) return

      const response = await upsertAgency({
        id: data?.id ? data.id : v4(),
        customerId: data?.customerId || custId || '',
        address: values.address || "",
        agencyLogo: values.agencyLogo || '',
        city: values.city || "",
        companyPhone: values.companyPhone,
        country: values.country || "",
        name: values.name,
        state: values.state || "",
        whiteLabel: values.whiteLabel,
        zipCode: values.zipCode || "",
        createdAt: new Date(),
        updatedAt: new Date(),
        companyEmail: values.companyEmail,
        connectAccountId: '',
        goal: 5,
      })
      toast({
        title: 'Created Agency',
      })
      if (data?.id) return router.refresh()
      if (response) {
        return router.refresh()
      }
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Oppse!',
        description: 'could not create your agency',
      })
    }
  }
  const handleDeleteAgency = async () => {
    if (!data?.id) return
    setDeletingAgency(true)
    //WIP: discontinue the subscription
    try {
      const response = await deleteAgency(data.id)
      toast({
        title: 'Deleted Agency',
        description: 'Deleted your agency and all subaccounts',
      })
      router.refresh()
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Oppse!',
        description: 'could not delete your agency ',
      })
    }
    setDeletingAgency(false)
  }

  return (
    <AlertDialog>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormBody>
            <FormField
              control={form.control}
              name="agencyLogo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agency logo</FormLabel>
                  <FormControl>
                    <FileUpload
                      apiEndpoint="agencyLogo"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* These rows were `flex md:flex-row` with no `flex-col`, so they
                never collapsed — two inputs stayed side by side down to
                320px. FormRow is mobile-first. */}
            <FormRow>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Agency name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your agency name"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agency email</FormLabel>
                    <FormControl>
                      <Input readOnly placeholder="Email" {...field} />
                    </FormControl>
                    <FormDescription>
                      Managed by your login and cannot be changed here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormRow>

            <FormRow>
              <FormField
                control={form.control}
                name="companyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        autoComplete="tel"
                        placeholder="+1 555 000 0000"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormRow>

            <FormField
              control={form.control}
              name="whiteLabel"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start justify-between gap-6 rounded-card border border-border p-4">
                  <div className="space-y-1">
                    <FormLabel>White-label mode</FormLabel>
                    <FormDescription>
                      Shows your agency logo to all sub accounts by default.
                      Individual sub accounts can override this.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      disabled={isLoading}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="street-address"
                      placeholder="123 Market Street"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormRow cols={3}>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="address-level2"
                        placeholder="San Francisco"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="address-level1"
                        placeholder="California"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip code</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="postal-code"
                        placeholder="94103"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormRow>

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="country-name"
                      placeholder="United States"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {data?.id && (
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="agency-goal"
                  className="text-[13px] font-medium leading-none"
                >
                  Sub account goal
                </label>
                {/* Was Tremor's NumberInput, which ships its own blue focus
                    ring and border and ignored the product tokens. */}
                <Input
                  id="agency-goal"
                  type="number"
                  min={1}
                  defaultValue={data?.goal ?? undefined}
                  placeholder="10"
                  className="max-w-[200px]"
                  onBlur={async (e) => {
                    const val = Number(e.target.value)
                    if (!data?.id || !Number.isFinite(val) || val < 1) return
                    if (val === data.goal) return
                    await updateAgencyDetails(data.id, { goal: val })
                    await saveActivityLogsNotification({
                      agencyId: data.id,
                      description: `Updated the agency goal to | ${val} Sub Account`,
                      subaccountId: undefined,
                    })
                    router.refresh()
                  }}
                />
                <p className="text-[12.5px] leading-snug text-muted-foreground">
                  How many sub accounts you are aiming for. Saved when you
                  click away.
                </p>
              </div>
            )}

            <FormFooter>
              <SubmitButton pendingText="Saving…">Save changes</SubmitButton>
            </FormFooter>
          </FormBody>
        </form>
      </Form>

      {data?.id && (
        <div className="mt-8 rounded-card border border-destructive/40 bg-destructive/[0.03] p-5">
          <h3 className="text-[13px] font-medium text-destructive">
            Danger zone
          </h3>
          <p className="mt-1.5 max-w-prose text-[12.5px] leading-relaxed text-muted-foreground">
            Deleting your agency cannot be undone. It also deletes every sub
            account and all of their funnels, contacts and media.
          </p>
          <AlertDialogTrigger
            disabled={isLoading || deletingAgency}
            className="mt-4 inline-flex h-control-md items-center justify-center rounded-sm border border-destructive px-4 text-[13px] font-medium text-destructive transition-colors duration-fast hover:bg-destructive hover:text-destructive-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deletingAgency ? 'Deleting…' : 'Delete agency'}
          </AlertDialogTrigger>
        </div>
      )}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Delete this agency?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            This cannot be undone. It permanently deletes the agency and every
            related sub account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deletingAgency}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={handleDeleteAgency}
          >
            Delete agency
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AgencyDetails
