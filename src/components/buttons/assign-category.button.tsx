import { useState } from 'react'

import { notifyAxiosError } from '@/helpers/notify-axios-error'
import { useAssignCategory } from '@/hooks/api/products/use-assign-category'
import { useCategoryListStore } from '@/store/use-category-list.store'
import { useProductsStore } from '@/store/use-products.store'

import Drawer from '../layouts/drawer'
import SearchSelect from '../ui-kit/search-select'
import { Button } from '../ui/button'
import { Field } from '../ui/field'

export default function AssignCategoryButton() {
  const { mutateAsync: assignCategory } = useAssignCategory()
  const { categoryList } = useCategoryListStore()
  const { selectedProducts } = useProductsStore()

  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState<number | null>(null)

  const close = () => setOpen(false)

  const handleAssignCategory = async () => {
    if (!category || selectedProducts.length === 0) return

    try {
      await assignCategory({
        productIds: selectedProducts.map(({ id }) => id),
        categoryId: category,
      })
      setCategory(null)
      close()
    } catch (error) {
      notifyAxiosError(error)
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        disabled={selectedProducts.length === 0}
      >
        Assign category
      </Button>

      <Drawer
        open={open}
        close={close}
        title="Assign category to products"
        description="Choose category for assignment."
      >
        <>
          <SearchSelect
            className="w-full"
            value={category}
            onChange={(value) => setCategory(Number(value))}
            options={categoryList.map(({ id, name }) => ({
              label: name,
              value: id,
            }))}
            placeholder="Select category"
            isNumber
          />

          <Field className="mt-10">
            <div className="flex gap-x-4 justify-end">
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleAssignCategory}
                disabled={!category}
              >
                Assign category
              </Button>
            </div>
          </Field>
        </>
      </Drawer>
    </>
  )
}
