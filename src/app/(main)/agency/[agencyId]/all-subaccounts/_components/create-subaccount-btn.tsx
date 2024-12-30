'use client'
import SubAccountDetails from '@/components/forms/subaccount-details'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import { BoxTypeIdentifier } from '@/lib/structures'
import { useModal } from '@/providers/modal-provider'
import { Agency, AgencySidebarOption, SubAccount, User } from '@prisma/client'
import { IconDots, IconPencilCode, IconPencilCog, IconUserPlus } from '@tabler/icons-react'
import { PlusCircleIcon } from 'lucide-react'
import React from 'react'
import { twMerge } from 'tailwind-merge'

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
  className: string
}

const CreateSubaccountButton = ({ className, id, user }: Props) => {
  const { setOpen } = useModal()
  const agencyDetails = user.Agency

  if (!agencyDetails) return

  return (
    <BoxTypeIdentifier.Div
      className={twMerge(' !bg-transparent', className)}
      onClick={() => {
        setOpen(
          <CustomModal
            title="Create a Subaccount"
            subheading="You can switch bettween"
          >
            <SubAccountDetails
              agencyDetails={agencyDetails}
              userId={user.id}
              userName={user.name}
            />
          </CustomModal>
        )
      }}
    >
      <div className=' w-full flex gap-2'>

        <div className="w-11 h-11 border-[1px]  rounded-md flex items-center justify-center">
          <IconUserPlus  />
        </div>
        <div className="w-11 h-11 border-[1px]  rounded-md flex items-center justify-center">
          <IconPencilCog />
        </div>
        <div className="w-11 h-11 border-[1px] rounded-md flex items-center justify-center">
          <IconDots />
        </div>
        
      </div>
      
    </BoxTypeIdentifier.Div>
  )
}

export default CreateSubaccountButton
