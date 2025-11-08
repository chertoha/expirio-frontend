import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import CreateStorageForm from '@/components/forms/create-storage.form'
import Drawer from '@/components/layouts/drawer'
import { Button } from '@/components/ui/button'

export default function CreateStorageButton() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon />
        Add storage
      </Button>

      <Drawer
        open={open}
        close={close}
        title="Create storage"
        description="Enter the details for the new storage location."
      >
        <CreateStorageForm close={close} />
      </Drawer>
    </>
  )
}
