import type { Product } from '@/types/entities'

import { SquarePenIcon } from 'lucide-react'
import { useState } from 'react'

import EditProductForm from '../forms/edit-product.form'
import Drawer from '../layouts/drawer'
import { Button } from '../ui/button'

type EditProductButtonProps = {
  product: Product
}

export default function EditProductButton({ product }: EditProductButtonProps) {
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
        title="Update product"
        description="Update the details for the product."
      >
        <EditProductForm product={product} close={close} />
      </Drawer>
    </>
  )
}
