import type { Storage } from '@/types/entities'

import { SquarePenIcon } from 'lucide-react'
import { useState } from 'react'

import EditStorageForm from '@/components/forms/edit-storage.form'
import Drawer from '@/components/layouts/drawer'
import { Button } from '@/components/ui/button'

export default function EditStorageButton({ storage }: { storage: Storage }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-slate-500 hover:text-slate-500 hover:bg-accent/10"
        onClick={() => setOpen(true)}
        title="Edit"
      >
        <SquarePenIcon className="h-4 w-4" />
      </Button>

      <Drawer
        open={open}
        close={close}
        title="Update storage"
        description="Update the details for the storage location."
      >
        <EditStorageForm storage={storage} close={close} />
      </Drawer>
    </>
  )
}
