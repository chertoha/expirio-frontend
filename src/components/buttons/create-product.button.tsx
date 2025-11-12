import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import CreateProductForm from '../forms/create-product.form'
import Drawer from '../layouts/drawer'
import { Button } from '../ui/button'

export default function CreateProductButton() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon />
        Add product
      </Button>

      <Drawer
        open={open}
        close={close}
        title="Add new product"
        description="Enter the details for the new product."
      >
        <CreateProductForm close={close} />
      </Drawer>
    </>
  )
}
