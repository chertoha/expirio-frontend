import type { Batch } from '@/types/entities'
import type { ColumnDef } from '@tanstack/react-table'

import {
  IconCalendarMonth,
  IconChartDots2,
  IconDots,
  IconMapPin,
  IconPackage,
} from '@tabler/icons-react'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useMemo } from 'react'

import { useDeleteBatch } from '@/hooks/api/batches/use-delete-batch'
import { useListStorages } from '@/hooks/api/storages/use-list-storages'
import { cn } from '@/lib/utils'

// import { useFindStorage } from '@/hooks/api/batches/use-find-storage'

// import { notify } from '@/lib/notify'

import EditBatchButton from '../buttons/edit-batch.button'
import DeleteIconButton from '../ui-kit/delete-icon.button'
import { Badge } from '../ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import TableBase from './base.table'
import TableBaseBatches from './base.table.batches'

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
  const { data: storages = [] } = useListStorages()

  const columns = useMemo<ColumnDef<Batch>[]>(
    () => [
      {
        // accessorKey: 'batchNumber',
        id: 'batchNumber',
        header: () => (
          <div className="max-w-[300px]">
            {/* <TableHeaderSortButton
              label="Name"
              sortField="name"
              currentSort={sort}
              setSort={setSort}
            /> */}
            Batch
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex flex-col items-start gap-1.5">
            <div className="text-[18px] font-medium">
              {row.original.product.name}
            </div>

            <div className="text-slate-400 font-normal">
              {row.original.batchNumber}
            </div>
            {/* <div className="text-slate-400 font-normal">
              {row.original.description}
            </div> */}

            <ul className="flex flex-wrap gap-1">
              {row.original.product.categories.map(({ category }) => (
                <Badge key={category.id}>{category.name}</Badge>
              ))}
            </ul>
          </div>
        ),

        // size: 200,
      },
      {
        // accessorKey: 'quantity',
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
              {/* <div className="font-[Inter] text-base text-[#64748B] font-normal truncate"></div> */}
              {/* <IconDots /> */}
            </div>
          )
        },
        size: 100,
      },
      // {
      //   accessorKey: 'categories',
      //   header: 'Categories',
      //   cell: ({ row }) => {
      //     const categories = row.original.product?.categories || []
      //     const categoryNames = categories
      //       .map((c) => c.category.name)
      //       .join(', ')
      //     return (
      //       <div className="flex items-center gap-2 text-[#64748B]">
      //         <IconChartDots2 />
      //         <div className="truncate w-[120px]">{categoryNames || '—'}</div>
      //       </div>
      //     )
      //   },
      // },
      {
        accessorKey: 'storages',
        header: 'Storages',
        cell: ({ row }) => {
          // const storagesBatch = row.original.storages || []
          // const storageNames = storagesBatch
          //   .map((sb) => {
          //     const storage = storages.find((s) => s.id === sb.storageId)
          //     return storage?.name
          //   })
          //   .filter(Boolean)
          //   .join(', ')

          return (
            <div className="flex items-center gap-2 text-[#64748B]">
              <IconMapPin />

              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="truncate max-w-40 overflow-hidden text-ellipsis cursor-pointer">
                      {row.original.storages
                        .map((s) => s.storage.name)
                        .join(', ')}
                    </p>
                  </TooltipTrigger>

                  <TooltipContent side="top" className="">
                    <div className="p-1 text-sm">
                      {row.original.storages.map(({ storage, qty }) => (
                        <p key={storage.id}>
                          {storage.name} : {qty}
                        </p>
                      ))}
                    </div>
                    {/* <p className="max-w-xs wrap-break-word">Test</p> */}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* <div className="truncate w-[120px]">{storageNames}</div> */}
            </div>
          )
        },
      },

      {
        // accessorKey: 'expirationDate',
        id: 'dates',
        header: ' Date (Prod | Exp)',
        cell: ({ row }) => (
          <div className="flex ">
            <div className="flex flex-col gap-y-1">
              <p className="flex items-center gap-x-1 text-slate-400">
                <IconCalendarMonth className="w-3.5 h-3.5 stroke-slate-600" />
                {new Date(row.original.manufactureDate).toLocaleDateString(
                  'en-GB',
                )}
              </p>

              <p className="flex items-center gap-x-1 text-slate-400">
                <IconCalendarMonth className="w-3.5 h-3.5 stroke-slate-600" />
                {new Date(row.original.manufactureDate).toLocaleDateString(
                  'en-GB',
                )}
              </p>
            </div>
          </div>
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

          let status = 'Ok'
          let bgColor = 'bg-success'
          // let borderColor = '#2DD4BF' // бірюзовий
          // let textColor = '#2DD4BF'

          if (diffDays <= 0) {
            status = 'Expired'
            bgColor = 'bg-error'
            // borderColor = '#EF4444' // червоний
            // textColor = '#EF4444'
          } else if (diffDays <= 30) {
            status = 'Expiring Soon'
            bgColor = 'bg-warning'
            // borderColor = '#F59E0B' // жовтий
            // textColor = '#F59E0B'
          }

          return (
            // <div className="flex justify-center">
            //   <button
            //     className="w-[130px] px-3 py-1 rounded-md border text-sm font-medium"
            //     style={{ borderColor, color: textColor }}
            //   >
            //     {status}
            //   </button>

            // </div>
            <div className="text-center">
              <Badge className={cn('w-[120px] h-[30px]', bgColor)}>
                {status}
              </Badge>
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
    [deleteBatch],
  )

  const table = useReactTable({
    data: Array.isArray(batches) ? batches : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  })

  return (
    // <TableBaseBatches table={table} loading={isLoading} columns={columns} />
    <TableBase table={table} loading={isLoading} columns={columns} />
  )
}
