'use client'

import SendInvitation from '@/components/forms/send-invitation'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal-provider'
import { Plus } from 'lucide-react'
import React from 'react'

/** Opens the invite form. Lives apart from the list so the list stays generic. */
const InviteButton = ({ agencyId }: { agencyId: string }) => {
  const { setOpen } = useModal()

  return (
    <Button
      onClick={() =>
        setOpen(
          <CustomModal
            title="Invite someone to the team"
            subheading="They'll get an email with a link to join this agency."
          >
            <SendInvitation agencyId={agencyId} />
          </CustomModal>
        )
      }
    >
      <Plus />
      Invite member
    </Button>
  )
}

export default InviteButton
