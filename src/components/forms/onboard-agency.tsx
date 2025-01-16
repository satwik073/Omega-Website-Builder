'use client'
import { Agency, Role } from '@prisma/client'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { NumberInput } from '@tremor/react'
import { v4 } from 'uuid'
import { useRouter } from 'next/navigation'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from '../ui/alert-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '../ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from '../ui/form'
import { useToast } from '../ui/use-toast'
import * as z from 'zod'
import FileUpload from '../global/file-upload'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import { deleteAgency, initUser, saveActivityLogsNotification, sendInvitation, updateAgencyDetails, upsertAgency, } from '@/lib/queries'
import { Button } from '../ui/button'
import Loading from '../global/loading'
import CustomBox from '@/@types/Comp_BX'
import { BoxTypeIdentifier, OptionsConfig } from '@/lib/structures'
import Image from 'next/image'
import { ThemeSettings } from '@/lib/functions'
import EnhancedInput from '@/Controllers/InputController'
import { Label } from '../ui/label'
import ProductImage from '@/Controllers/ImageContainer'
import { IconLink } from '@tabler/icons-react'
type Props = {
    data?: Partial<Agency>,
    typeConfiguration?:
    'AGENCY_CONFIGURATION'
    | 'AGENCY_SETTINGS'
    | 'SUBACCOUNT_ONBOARD'
    | 'SUBACCOUNT_SETTINGS'
    titleContent?: string
    descriptionContent?: string

}

const FormSchema = z.object({
    name: z.string().min(2, { message: 'Agency name must be atleast 2 chars.' }),
    companyEmail: z.string().min(1),
    companyPhone: z.string().min(1),
    whiteLabel: z.boolean(),
    address: z.string().min(1),
    city: z.string().min(1),
    zipCode: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    agencyLogo: z.string().min(1),
})

const OnboardAgencyDetails = ({ data, typeConfiguration, titleContent, descriptionContent }: Props) => {
    const { toast } = useToast()
    const router = useRouter()
    const [deletingAgency, setDeletingAgency] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: data?.name,
            companyEmail: data?.companyEmail,
            companyPhone: data?.companyPhone,
            whiteLabel: data?.whiteLabel || false,
            address: data?.address,
            city: data?.city,
            zipCode: data?.zipCode,
            state: data?.state,
            country: data?.country,
            agencyLogo: data?.agencyLogo,
        },
    })
    const isLoading = form.formState.isSubmitting

    useEffect(() => {
        if (data) {
            form.reset(data)
        }
    }, [data])

    const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            let newUserData
            let custId
            if (!data?.id) {
                const bodyData = {
                    email: values.companyEmail,
                    name: values.name,
                    shipping: {
                        address: {
                            city: values.city,
                            country: values.country,
                            line1: values.address,
                            postal_code: values.zipCode,
                            state: values.zipCode,
                        },
                        name: values.name,
                    },
                    address: {
                        city: values.city,
                        country: values.country,
                        line1: values.address,
                        postal_code: values.zipCode,
                        state: values.zipCode,
                    },
                }

                const customerResponse = await fetch('/api/stripe/create-customer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bodyData),
                })
                const customerData: { customerId: string } =
                    await customerResponse.json()
                custId = customerData.customerId
            }

            newUserData = await initUser({ role: 'AGENCY_OWNER' })
            if (!data?.customerId && !custId) return

            const response = await upsertAgency({
                id: data?.id ? data.id : v4(),
                customerId: data?.customerId || custId || '',
                address: values.address,
                agencyLogo: values.agencyLogo,
                city: values.city,
                companyPhone: values.companyPhone,
                country: values.country,
                name: values.name,
                state: values.state,
                whiteLabel: values.whiteLabel,
                zipCode: values.zipCode,
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
            <Card className="w-full  lg:px-[32px] px-0 border-none">
                <div className="flex justify-center items-center w-full ">
                    <div className="flex gap-2 mt-12">
                        <div className="border border-gray-300 rounded-2xl left-10 -mr-[16px]">
                            <Image
                                alt="Product Image"
                                width={70}
                                height={70}
                                className="rounded-2xl p-1"
                                src="/assets/default.webp"
                            />
                        </div>
                            <div className=' flex items-center'><IconLink size={30} className=' text-gray-900 border bg-white z-50 items-center border-gray-300 rounded-full p-1'/></div>
                        <div className="border  border-gray-300 rounded-2xl -ml-[16px] ">
                            <Image
                                alt="Product Image"
                                width={70}
                                height={70}
                                className="rounded-2xl p-1"
                                src="/assets/one-week.png"
                            />
                        </div>
                    </div>
                </div>

                <CardHeader>
                    <CardTitle className='tracking-tighter text-3xl text-center font-black mb-2'>{titleContent}</CardTitle>
                <div className='w-full text-center text-gray-500'>Streamline your Business by Arobix and <br/>automate all your workflow</div>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <BoxTypeIdentifier.Form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="space-y-4"
                        >

                            <CustomBox type={BoxTypeIdentifier?.Div} className="flex md:flex-col gap-4">
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <Label className='font-bold text-sm'>Company Name</Label>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ex : Example"
                                                    {...field}
                                                    type="text"
                                                    className="w-full px-4 py-2 border placeholder:text-gray-500 border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"

                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CustomBox>
                            <div className='md:flex gap-5'>

                                <FormField
                                    control={form.control}
                                    name="companyEmail"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                             <Label className='font-bold text-[13px]'>Email Address</Label>
                                            <FormControl>
                                                <Input

                                                    placeholder="Your agency name"
                                                    {...field}
                                                    type="text"
                                                    className="w-full px-4 py-2 border  placeholder:text-gray-500 border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"

                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />



                                <div className="md:w-1/2">
                                    <FormField
                                        disabled={isLoading}
                                        control={form.control}
                                        name="companyPhone"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <Label className='font-bold text-[13px]'>Contact Number</Label>
                                                <FormControl>
                                                    <Input
                                                    className='placeholder:text-gray-500'
                                                        placeholder="Ex : +91 98XXXXXXXX"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="agencyLogo"
                                render={({ field }) => (
                                    <FormItem>
                                         <Label className='font-bold text-[13px]'>Agency Logo</Label>
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
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="whiteLabel"
                                render={({ field }) => {
                                    return (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border gap-4 p-4">
                                            <div>
                                                <FormDescription>
                                                    Turning on whilelabel mode will show your agency logo
                                                    to all sub accounts by default. You can overwrite this
                                                    functionality through sub account settings.
                                                </FormDescription>
                                            </div>

                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )
                                }}
                            />
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                          <Label className='font-bold text-[13px]'>Address</Label>
                                        <FormControl>
                                            <Input
                                              className='placeholder:text-gray-500'
                                                placeholder="Ex : 123 Blueberry Street"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex md:flex-row gap-4">
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                              <Label className='font-bold text-[13px]'>City</Label>
                                            <FormControl>
                                                <Input
                                                  className='placeholder:text-gray-500'
                                                    placeholder="City"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                              <Label className='font-bold text-[13px]'>State</Label>
                                            <FormControl>
                                                <Input
                                                  className='placeholder:text-gray-500'
                                                    placeholder="State"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name="zipCode"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                              <Label className='font-bold text-[13px]'>Zipcpde</Label>
                                            <FormControl>
                                                <Input
                                                  className='placeholder:text-gray-500'
                                                    placeholder="Zipcode"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                          <Label className='font-bold text-[13px]'>Country</Label>
                                        <FormControl>
                                            <Input
                                              className='placeholder:text-gray-500'
                                                placeholder="Country"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {data?.id && (
                                <div className="flex flex-col gap-2">
                                    <FormLabel>Create A Goal</FormLabel>
                                    <FormDescription>
                                        ✨ Create a goal for your agency. As your business grows
                                        your goals grow too so dont forget to set the bar higher!
                                    </FormDescription>
                                    <NumberInput
                                        defaultValue={data?.goal}
                                        onValueChange={async (val) => {
                                            if (!data?.id) return
                                            await updateAgencyDetails(data.id, { goal: val })
                                            await saveActivityLogsNotification({
                                                agencyId: data.id,
                                                description: `Updated the agency goal to | ${val} Sub Account`,
                                                subaccountId: undefined,
                                            })
                                            router.refresh()
                                        }}
                                        min={1}
                                        className="bg-background !border !border-input"
                                        placeholder="Sub Account Goal"
                                    />
                                </div>
                            )}
                            <Button
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? <Loading /> : 'Save Agency Information'}
                            </Button>
                        </BoxTypeIdentifier.Form>
                    </Form>

                    {data?.id && (
                        <div className="flex flex-row items-center justify-between rounded-lg border border-destructive gap-4 p-4 mt-4">
                            <div>
                                <div>Danger Zone</div>
                            </div>
                            <div className="text-muted-foreground">
                                Deleting your agency cannpt be undone. This will also delete all
                                sub accounts and all data related to your sub accounts. Sub
                                accounts will no longer have access to funnels, contacts etc.
                            </div>
                            <AlertDialogTrigger
                                disabled={isLoading || deletingAgency}
                                className="text-red-600 p-2 text-center mt-2 rounded-md hove:bg-red-600 hover:text-white whitespace-nowrap"
                            >
                                {deletingAgency ? 'Deleting...' : 'Delete Agency'}
                            </AlertDialogTrigger>
                        </div>
                    )}
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-left">
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-left">
                                This action cannot be undone. This will permanently delete the
                                Agency account and all related sub accounts.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex items-center">
                            <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                disabled={deletingAgency}
                                className="bg-destructive hover:bg-destructive"
                                onClick={handleDeleteAgency}
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </CardContent>
            </Card>
        </AlertDialog>
    )
}

export default OnboardAgencyDetails
