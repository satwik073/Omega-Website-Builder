'use client'
import {
  AuthUserWithAgencySigebarOptionsSubAccounts,
  UserWithPermissionsAndSubAccounts,
} from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { SubAccount, User } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import {
  changeUserPermissions,
  getAuthUserDetails,
  getUserPermissions,
  saveActivityLogsNotification,
  updateUser,
} from '@/lib/queries'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
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
} from '@/components/ui/form'
import FileUpload from '../global/file-upload'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Switch } from '../ui/switch'
import { v4 } from 'uuid'

type Props = {
  id: string | null
  type: 'AGENCY_OWNER' | 'SUBACCOUNT_USER'
  userData?: Partial<User>
  subAccounts?: SubAccount[]
}

const UserDetails = ({ id, type, subAccounts, userData }: Props) => {
  const [subAccountPermissions, setSubAccountsPermissions] =
    useState<UserWithPermissionsAndSubAccounts | null>(null)

  const { data, setClose } = useModal()
  const [roleState, setRoleState] = useState('')
  const [loadingPermissions, setLoadingPermissions] = useState(false)
  const [authUserData, setAuthUserData] =
    useState<AuthUserWithAgencySigebarOptionsSubAccounts | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  //Get authUSerDtails

  useEffect(() => {
    if (data.user) {
      const fetchDetails = async () => {
        const response = await getAuthUserDetails()
        if (response) setAuthUserData(response)
      }
      fetchDetails()
    }
  }, [data])

  const userDataSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    avatarUrl: z.string(),
    role: z.enum([
      'AGENCY_OWNER',
      'AGENCY_ADMIN',
      'SUBACCOUNT_USER',
      'SUBACCOUNT_GUEST',
    ]),
  })

  const form = useForm<z.infer<typeof userDataSchema>>({
    resolver: zodResolver(userDataSchema),
    mode: 'onChange',
    defaultValues: {
      name: userData ? userData.name : data?.user?.name,
      email: userData ? userData.email : data?.user?.email,
      avatarUrl: userData ? userData.avatarUrl : data?.user?.avatarUrl,
      role: userData ? userData.role : data?.user?.role,
    },
  })

  useEffect(() => {
    if (!data.user) return
    const getPermissions = async () => {
      if (!data.user) return
      const permission = await getUserPermissions(data.user.id)
      setSubAccountsPermissions(permission)
    }
    getPermissions()
  }, [data, form])

  useEffect(() => {
    if (data.user) {
      form.reset(data.user)
    }
    if (userData) {
      form.reset(userData)
    }
  }, [userData, data])

  const onChangePermission = async (
    subAccountId: string,
    val: boolean,
    permissionsId: string | undefined
  ) => {
    if (!data.user?.email) return
    setLoadingPermissions(true)
    const response = await changeUserPermissions(
      permissionsId ? permissionsId : v4(),
      data.user.email,
      subAccountId,
      val
    )
    if (type === 'AGENCY_OWNER') {
      await saveActivityLogsNotification({
        agencyId: authUserData?.Agency?.id,
        description: `Gave ${userData?.name} access to | ${
          subAccountPermissions?.Permissions.find(
            (p) => p.subAccountId === subAccountId
          )?.SubAccount.name
        } `,
        subaccountId: subAccountPermissions?.Permissions.find(
          (p) => p.subAccountId === subAccountId
        )?.SubAccount.id,
      })
    }

    if (response) {
      toast({
        title: 'Success',
        description: 'The request was successfull',
      })
      if (subAccountPermissions) {
        subAccountPermissions.Permissions.find((perm) => {
          if (perm.subAccountId === subAccountId) {
            return { ...perm, access: !perm.access }
          }
          return perm
        })
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Failed',
        description: 'Could not update permissions',
      })
    }
    router.refresh()
    setLoadingPermissions(false)
  }

  const onSubmit = async (values: z.infer<typeof userDataSchema>) => {
    if (!id) return
    if (userData || data?.user) {
      const updatedUser = await updateUser(values)
      authUserData?.Agency?.SubAccount.filter((subacc) =>
        authUserData.Permissions.find(
          (p) => p.subAccountId === subacc.id && p.access
        )
      ).forEach(async (subaccount) => {
        await saveActivityLogsNotification({
          agencyId: undefined,
          description: `Updated ${userData?.name} information`,
          subaccountId: subaccount.id,
        })
      })

      if (updatedUser) {
        toast({
          title: 'Success',
          description: 'Update User Information',
        })
        setClose()
        router.refresh()
      } else {
        toast({
          variant: 'destructive',
          title: 'Oppse!',
          description: 'Could not update user information',
        })
      }
    } else {
      console.log('Error could not submit')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormBody>
          <FormField
            control={form.control}
            name="avatarUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile picture</FormLabel>
                <FormControl>
                  <FileUpload
                    apiEndpoint="avatar"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormRow>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Full name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="name"
                      placeholder="Jordan Reyes"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                const locked = userData?.role === 'AGENCY_OWNER'
                return (
                  <FormItem>
                    <FormLabel required>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        readOnly={locked || form.formState.isSubmitting}
                        placeholder="jordan@company.com"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    {locked && (
                      <FormDescription>
                        The agency owner&rsquo;s email is tied to the login and
                        cannot be changed here.
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </FormRow>

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  disabled={
                    field.value === 'AGENCY_OWNER' ||
                    form.formState.isSubmitting
                  }
                  onValueChange={(value) => {
                    if (
                      value === 'SUBACCOUNT_USER' ||
                      value === 'SUBACCOUNT_GUEST'
                    ) {
                      setRoleState(
                        'Sub account roles need at least one sub account to be granted access below.'
                      )
                    } else {
                      setRoleState('')
                    }
                    field.onChange(value)
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role…" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* Was "AGENCY_ADMING" — not a value in the Role enum, so
                        choosing Agency Admin failed to save. */}
                    <SelectItem value="AGENCY_ADMIN">Agency admin</SelectItem>
                    {(data?.user?.role === 'AGENCY_OWNER' ||
                      userData?.role === 'AGENCY_OWNER') && (
                      <SelectItem value="AGENCY_OWNER">Agency owner</SelectItem>
                    )}
                    <SelectItem value="SUBACCOUNT_USER">
                      Sub account user
                    </SelectItem>
                    <SelectItem value="SUBACCOUNT_GUEST">
                      Sub account guest
                    </SelectItem>
                  </SelectContent>
                </Select>
                {roleState && <FormDescription>{roleState}</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />

          {authUserData?.role === 'AGENCY_OWNER' && (
            <section className="border-t border-border pt-5">
              {/* Plain label/description: FormLabel and FormDescription read
                  field state from context and there is no field here. */}
              <h3 className="text-[13px] font-medium">Sub account access</h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
                Grant this person access to individual sub accounts. Only
                agency owners can see this.
              </p>

              {subAccounts?.length ? (
                <div className="mt-4 divide-y divide-border rounded-card border border-border">
                  {subAccounts.map((subAccount) => {
                    const subAccountPermissionsDetails =
                      subAccountPermissions?.Permissions.find(
                        (p) => p.subAccountId === subAccount.id
                      )
                    return (
                      <div
                        key={subAccount.id}
                        className="flex items-center justify-between gap-4 p-4"
                      >
                        <p className="min-w-0 truncate text-[13px]">
                          {subAccount.name}
                        </p>
                        <Switch
                          aria-label={`Access to ${subAccount.name}`}
                          disabled={loadingPermissions}
                          checked={!!subAccountPermissionsDetails?.access}
                          onCheckedChange={(permission) => {
                            onChangePermission(
                              subAccount.id,
                              permission,
                              subAccountPermissionsDetails?.id
                            )
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="mt-4 rounded-card border border-dashed border-border p-4 text-[12.5px] text-muted-foreground">
                  No sub accounts yet. Create one to grant access.
                </p>
              )}
            </section>
          )}

          <FormFooter>
            <SubmitButton pendingText="Saving…">Save details</SubmitButton>
          </FormFooter>
        </FormBody>
      </form>
    </Form>
  )
}

export default UserDetails
