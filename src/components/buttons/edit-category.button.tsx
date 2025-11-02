import { SquarePenIcon } from 'lucide-react'
import { useState } from 'react'

import EditCategoryForm from '../forms/edit-category.form'
import Drawer from '../layouts/drawer'
import { Button } from '../ui/button'

type EditCategoryButtonProps = {
  id: number
}

export default function EditCategoryButton({ id }: EditCategoryButtonProps) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-slate-500  hover:text-slate-500 hover:bg-accent/10"
        onClick={() => setOpen(true)}
      >
        <SquarePenIcon className="h-4 w-4" />
      </Button>

      <Drawer
        open={open}
        close={close}
        title="Update category"
        description="Update the details for the category."
      >
        <EditCategoryForm categoryId={id} close={close} />
      </Drawer>
    </>
  )
}
