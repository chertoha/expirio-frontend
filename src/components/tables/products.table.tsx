import type { Product } from '@/types/entities'
import type { ColumnDef } from '@tanstack/react-table'

import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { notifyAxiosError } from '@/helpers/notify-axios-error'
import { useDeleteProduct } from '@/hooks/api/products/use-delete-product'
import { useProductsStore } from '@/store/use-products.store'

import EditProductButton from '../buttons/edit-product.button'
import { CategoryBadge } from '../product/category-badge'
import DeleteIconButton from '../ui-kit/delete-icon.button'
import TableHeaderSortButton from '../ui-kit/table-header-sort.button'
import { Badge } from '../ui/badge'
import { Checkbox } from '../ui/checkbox'
import TableBase from './base.table'

type CProductsTableProps = {
  products: Product[]
  isLoading?: boolean
}

export default function ProductsTable({
  products,
  isLoading = false,
}: CProductsTableProps) {
  const { sort, setSort, setSelected } = useProductsStore()
  const { mutateAsync: deleteProduct } = useDeleteProduct()

  const [rowSelection, setRowSelection] = useState({})

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await deleteProduct(id)
      } catch (error) {
        notifyAxiosError(error)
      }
    },
    [deleteProduct],
  )

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value)
            }}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        size: 40,
      },
      {
        accessorKey: 'name',
        header: () => (
          <div className="max-w-[300px]">
            <TableHeaderSortButton
              label="Name"
              sortField="name"
              currentSort={sort}
              setSort={setSort}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="inline-flex items-center gap-2">
            <span className="font-medium flex items-center gap-x-3">
              {row.original.name}
              <Badge variant="secondary">
                {row.original.dosage} {row.original.dosageUnit.name}
              </Badge>
            </span>
          </div>
        ),
      },

      {
        accessorKey: 'activeIngredient.name',
        header: 'Active ingredient',
        cell: ({ row }) => (
          <Badge variant="default">{row.original.activeIngredient.name}</Badge>
        ),
      },

      {
        id: 'categories',
        header: 'Categories',
        cell: ({ row }) => (
          <div className="inline-flex items-center gap-2 flex-wrap">
            {row.original.categories.map(({ category }) => (
              <CategoryBadge
                key={category.id}
                label={category.name}
                categoryId={category.id}
                productId={row.original.id}
              />
            ))}
          </div>
        ),
      },

      {
        id: 'actions',
        header: () => <div className="text-right pr-4">Actions</div>,
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            <EditProductButton product={row.original} />

            <DeleteIconButton
              onDelete={() => handleDelete(row.original.id)}
              popupTitle="Are you sure you want to delete category"
              popupDescription="This action cannot be undone and will permanently delete category from data base"
            />
          </div>
        ),
      },
    ],
    [handleDelete, setSort, sort],
  )

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),

    enableRowSelection: true,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
  })

  useEffect(() => {
    const selected = table.getSelectedRowModel().rows.map((r) => r.original)
    setSelected(selected)
  }, [rowSelection, setSelected, table])

  return (
    <>
      <TableBase table={table} loading={isLoading} columns={columns} />
    </>
  )
}
