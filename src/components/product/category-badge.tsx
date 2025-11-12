import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'

import { notifyAxiosError } from '@/helpers/notify-axios-error'
import { useUnassignCategory } from '@/hooks/api/products/use-unassign-category'
import { cn } from '@/lib/utils'

import ConfirmPopup from '../ui-kit/confirm-popup'
import { Badge } from '../ui/badge'

type CategoryBadgeProps = {
  categoryId: number
  productId: number
  label: string
}

export function CategoryBadge({
  label,
  categoryId,
  productId,
}: CategoryBadgeProps) {
  const { mutateAsync: unassignCategory } = useUnassignCategory()

  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false)

  const handleUnAssignCategory = async () => {
    try {
      await unassignCategory({ categoryId, productIds: [productId] })
    } catch (error) {
      notifyAxiosError(error)
    }
  }

  return (
    <>
      <Badge
        variant="outline"
        className="relative cursor-pointer text-center"
        onMouseOver={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setOpen(true)}
      >
        <span className={cn(show ? 'text-transparent' : 'text-inherit')}>
          {label}
        </span>

        <span
          className={cn(
            'absolute top-1/2 left-1/2  -translate-1/2 flex',
            show ? 'text-inherit' : 'text-transparent',
          )}
        >
          <Trash2Icon className="w-3 h-3" />
        </span>
      </Badge>

      <ConfirmPopup
        open={open}
        close={() => setOpen(false)}
        onConfirm={handleUnAssignCategory}
        title={`Are you sure you want to remove category '${label}' from this product`}
        description="This action will unassign category from product"
      />
    </>
  )
}
