import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/button'
import ConfirmPopup from './confirm-popup'

type DeleteIconButtonProps = {
  onDelete: () => void
  popupTitle?: string
  popupDescription?: string
}

export default function DeleteIconButton({
  onDelete,
  popupTitle = 'Are you absolutely sure?',
  popupDescription,
}: DeleteIconButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-red-500 hover:text-red-500 hover:bg-accent/10"
        onClick={() => setOpen(true)}
      >
        <Trash2Icon className="h-4 w-4" />
      </Button>

      <ConfirmPopup
        open={open}
        close={() => setOpen(false)}
        onConfirm={onDelete}
        title={popupTitle}
        description={popupDescription}
      />
    </>
  )
}
