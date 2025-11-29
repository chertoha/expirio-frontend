import type { Batch } from '@/types/entities'
import type { ColumnDef } from '@tanstack/react-table'

import { IconCalendarMonth, IconPackage } from '@tabler/icons-react'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useCallback, useMemo } from 'react'

import { useDeleteBatch } from '@/hooks/api/batches/use-delete-batch'
import { cn } from '@/lib/utils'
import { useBatchesStore } from '@/store/use-batches.store'

import { StoragesDropdown } from '../buttons/batch-storages-dropdown.button'
import EditBatchButton from '../buttons/edit-batch.button'
import DeleteIconButton from '../ui-kit/delete-icon.button'
import TableHeaderSortButton from '../ui-kit/table-header-sort.button'
import { Badge } from '../ui/badge'
import TableBase from './base.table'

type BatchesTableProps = {
  batches: Batch[]
  isLoading?: boolean
}
export default function BatchesTable({
  batches,
  isLoading = false,
}: BatchesTableProps) {
  const { mutateAsync: deleteBatch } = useDeleteBatch()
  const { sort, setSort } = useBatchesStore()

  const handleDeleteBatch = useCallback(
    (id: number) => deleteBatch(id),
    [deleteBatch],
  )

  const columns = useMemo<ColumnDef<Batch>[]>(
    () => [
      {
        id: 'batchNumber',
        header: () => (
          <div className="max-w-[300px]">
            <TableHeaderSortButton
              label="Batch"
              sortField="batchNumber"
              currentSort={sort}
              setSort={setSort}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex flex-col items-start gap-1.5 py-4">
            <div className="text-[18px] font-medium">
              {row.original.product.name}
            </div>

            <div className="text-slate-400 font-normal">
              {row.original.batchNumber}
            </div>

            <ul className="flex flex-wrap gap-1">
              {row.original.product.categories.map(({ category }) => (
                <Badge key={category.id}>{category.name}</Badge>
              ))}
            </ul>
          </div>
        ),
      },
      {
        id: 'quantity',
        header: 'Quantity',
        cell: ({ row }) => {
          const quantity = row.original.storages.reduce(
            (acc, { qty }) => (acc += qty),
            0,
          )
          return (
            <div className="flex items-center gap-2 text-[#64748B]">
              <IconPackage />
              {quantity}
            </div>
          )
        },
        size: 100,
      },
      {
        id: 'production_date',
        header: () => (
          <div className="max-w-[300px]">
            <TableHeaderSortButton
              label="Production Date"
              sortField="manufactureDate"
              currentSort={sort}
              setSort={setSort}
            />
          </div>
        ),
        cell: ({ row }) => (
          <p className="flex items-center gap-x-1 text-slate-400">
            <IconCalendarMonth className="w-3.5 h-3.5 stroke-slate-600" />
            {new Date(row.original.manufactureDate).toLocaleDateString('en-GB')}
          </p>
        ),
      },
      {
        id: 'expiration_date',
        header: () => (
          <div className="max-w-[300px]">
            <TableHeaderSortButton
              label="Expiration Date"
              sortField="expirationDate"
              currentSort={sort}
              setSort={setSort}
            />
          </div>
        ),
        cell: ({ row }) => (
          <p className="flex items-center gap-x-1 text-slate-400">
            <IconCalendarMonth className="w-3.5 h-3.5 stroke-slate-600" />
            {new Date(row.original.expirationDate).toLocaleDateString('en-GB')}
          </p>
        ),
      },
      {
        accessorKey: 'status',
        header: () => <p className="text-center"> Status</p>,
        cell: ({ row }) => {
          const { expirationDate } = row.original

          const now = new Date()
          const expDate = new Date(expirationDate)
          const diffDays = Math.ceil(
            (expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
          )

          let status = 'Active'
          let bgColor = 'bg-success'

          if (diffDays <= 0) {
            status = 'Expired'
            bgColor = 'bg-error'
          } else if (diffDays <= 30) {
            status = 'Expiring Soon'
            bgColor = 'bg-warning'
          }

          return (
            <div className="text-center">
              <Badge className={cn('w-[120px] h-[30px]', bgColor)}>
                {status}
              </Badge>
            </div>
          )
        },
      },

      {
        id: 'storages',
        header: () => <p className="text-center pr-5">Locations</p>,
        cell: ({ row }) => (
          <div>
            <StoragesDropdown storages={row.original.storages} />
          </div>
        ),
      },

      {
        id: 'actions',
        header: () => <div className="text-right pr-4"></div>,
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            <EditBatchButton batch={row.original} />

            <DeleteIconButton
              onDelete={() => handleDeleteBatch(row.original.id)}
              popupTitle="Are you sure you want to delete the part of this batch?"
              popupDescription="This action cannot be undone and will permanently delete part of batch from data base"
            />
          </div>
        ),
        size: 50,
      },
    ],
    [handleDeleteBatch, setSort, sort],
  )

  const table = useReactTable({
    data: Array.isArray(batches) ? batches : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  })

  return <TableBase table={table} loading={isLoading} columns={columns} />
}
