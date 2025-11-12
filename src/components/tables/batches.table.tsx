import type { Batch } from '@/types/entities';
import type { ColumnDef } from '@tanstack/react-table';



import { IconCalendarMonth, IconChartDots2, IconDots, IconMapPin, IconPackage } from '@tabler/icons-react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';



import { useDeleteBatch } from '@/hooks/api/use-delete-batch';
import { useFindStorage } from '@/hooks/api/use-find-storage';



// import { notify } from '@/lib/notify'

import EditBatchButton from '../buttons/edit-batch.button';
import DeleteIconButton from '../ui-kit/delete-icon.button';
import TableBaseBatches from './base.table.batches';


type BatchesTableProps = {
  batches: Batch[]
  isLoading?: boolean
}
export default function BatchesTable({
  batches,
  isLoading = false,
}: BatchesTableProps) {
  // const { sort, setSort } = useBatchesStore()
  const { mutateAsync: deleteBatch } = useDeleteBatch()
  const { data: storages = [] } = useFindStorage()


  const columns = useMemo<ColumnDef<Batch>[]>(
    () => [
      {
        accessorKey: 'batchNumber',
        header: () => (
          <div className="max-w-[300px]">
            {/* <TableHeaderSortButton
              label="Name"
              sortField="name"
              currentSort={sort}
              setSort={setSort}
            /> */}
            info
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex flex-col items-start gap-1.5">
            <div className="font-[Inter] text-xl text-[#0F172A] font-semibold">
              {row.original.product.name}
            </div>

            <div className="font-[Inter] text-base text-[#64748B] font-normal">
              Batch:{row.original.batchNumber}
            </div>
            <div className="font-[Inter] text-base text-[#64748B] font-normal">
              {row.original.description}
            </div>
          </div>
        ),

        size: 200,
      },
      {
        accessorKey: 'quantity',
        header: 'quantity',
        cell: ({ row }) => {
          const quantitys = row.original.storages || []
          const quantity = quantitys.map((s) => s.qty).join(', ')
          return (
            <div className="w-[106px] flex items-center gap-2 justify-between text-[#64748B]">
              <IconPackage />
              <div className="font-[Inter] text-base text-[#64748B] font-normal truncate">
                {quantity || '—'}
              </div>
              <IconDots />
            </div>
          )
        },
      },
      {
        accessorKey: 'categories',
        header: 'Categories',
        cell: ({ row }) => {
          const categories = row.original.product?.categories || []
          const categoryNames = categories.map((c) => c.name).join(', ')
          return (
            <div className="flex items-center gap-2 text-[#64748B]">
              <IconChartDots2 />
              <div className="truncate w-[120px]">{categoryNames || '—'}</div>
            </div>
          )
        },
      },
      {
        accessorKey: 'storages',
        header: 'Storages',
        cell: ({ row }) => {
          const storagesBatch = row.original.storages || []
          const storageNames = storagesBatch
            .map((sb) => {
              const storage = storages.find((s) => s.id === sb.storageId)
              return storage?.name
            })
            .filter(Boolean) // відкидає undefined
            .join(', ')

          return (
            <div className="flex items-center gap-2 text-[#64748B]">
              <IconMapPin />
              <div className="truncate w-[120px]">{storageNames || '—'}</div>
            </div>
          )
        },
      },

      {
        accessorKey: 'expirationDate',
        header: 'Expiration Date',
        cell: ({ row }) => (
          <div className="w-[110px] flex items-center gap-3 text-[#64748B]">
            <IconCalendarMonth />
            <p>
              {new Date(row.original.expirationDate).toLocaleDateString(
                'uk-UA',
              )}
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const { expirationDate } = row.original

          const now = new Date()
          const expDate = new Date(expirationDate)
          const diffDays = Math.ceil(
            (expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
          )

          let status = 'Active'
          let borderColor = '#2DD4BF' // бірюзовий
          let textColor = '#2DD4BF'

          if (diffDays <= 0) {
            status = 'Expired'
            borderColor = '#EF4444' // червоний
            textColor = '#EF4444'
          } else if (diffDays <= 30) {
            status = 'Expiring Soon'
            borderColor = '#F59E0B' // жовтий
            textColor = '#F59E0B'
          }

          return (
            <div className="flex justify-center">
              <button
                className="w-[130px] px-3 py-1 rounded-md border text-sm font-medium"
                style={{ borderColor, color: textColor }}
              >
                {status}
              </button>
            </div>
          )
        },
      },

      {
        id: 'actions',
        header: () => <div className="text-right pr-4">Actions</div>,
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            <EditBatchButton batch={row.original} />

            <DeleteIconButton
              onDelete={() => deleteBatch(row.original.id)}
              popupTitle="Are you sure you want to delete category"
              popupDescription="This action cannot be undone and will permanently delete category from data base"
            />
          </div>
        ),
      },
    ],
    [deleteBatch, storages],
  )

  const table = useReactTable({
    data: Array.isArray(batches) ? batches : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  })

  return (
    <TableBaseBatches table={table} loading={isLoading} columns={columns} />
  )
}