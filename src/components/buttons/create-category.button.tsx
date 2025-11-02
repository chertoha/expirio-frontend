import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import CreateCategoryForm from '../forms/create-category.form'
import Drawer from '../layouts/drawer'
import { Button } from '../ui/button'

type CreateCategoryButtonProps = {}

export default function CreateCategoryButton({}: CreateCategoryButtonProps) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon />
        Add category
      </Button>

      <Drawer
        open={open}
        close={close}
        title="Add new category"
        description="Enter the details for the new category."
      >
        <CreateCategoryForm close={close} />
      </Drawer>
    </>
  )
}
