'use client'
import SubAccountDetails from '@/components/forms/subaccount-details'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal-provider'
import { Agency, AgencySidebarOption, SubAccount, User } from '@prisma/client'
import { PlusCircle } from 'lucide-react'
import React from 'react'

type Props = {
  user: User & {
    Agency:
      | (
          | Agency
          | (null & {
              SubAccount: SubAccount[]
              SideBarOption: AgencySidebarOption[]
            })
        )
      | null
  }
  id: string
  className?: string
}

const CreateSubaccountButton = ({ className, user }: Props) => {
  const { setOpen } = useModal()
  const agencyDetails = user.Agency

  if (!agencyDetails) return null

  return (
    <Button
      className={className}
      onClick={() =>
        setOpen(
          <CustomModal
            title="Create a sub account"
            subheading="Sub accounts are the client workspaces you build and publish sites in."
          >
            <SubAccountDetails
              agencyDetails={agencyDetails}
              userId={user.id}
              userName={user.name}
            />
          </CustomModal>
        )
      }
    >
      <PlusCircle />
      Create sub account
    </Button>
  )
}

export default CreateSubaccountButton
