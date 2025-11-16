import type { Alert } from '@/types/entities'
import type { ColumnDef } from '@tanstack/react-table'

import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useCallback, useMemo } from 'react'

import { notifyAxiosError } from '@/helpers/notify-axios-error'
import { useDeleteAlert } from '@/hooks/api/alerts/use-delete-alert'
import { useEnableAlert } from '@/hooks/api/alerts/use-enable-alert'
import { useFindAlerts } from '@/hooks/api/alerts/use-find-alerts'

import DeleteIconButton from '../ui-kit/delete-icon.button'
import { Badge } from '../ui/badge'
import { Switch } from '../ui/switch'
import TableBase from './base.table'

export default function AlertsTable() {
  const { data: alerts = [], isLoading } = useFindAlerts()
  const { mutateAsync: setEnabledAlert } = useEnableAlert()
  const { mutateAsync: deleteAlert } = useDeleteAlert()

  const handleEnabled = useCallback(
    async (id: number, isEnabled: boolean) => {
      console.log(isEnabled)

      await setEnabledAlert({ id, data: { isEnabled: !isEnabled } })
    },
    [setEnabledAlert],
  )

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await deleteAlert(id)
      } catch (err) {
        notifyAxiosError(err)
      }
    },
    [deleteAlert],
  )

  const columns = useMemo<ColumnDef<Alert>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        id: 'trigger_condition',
        header: 'Trigger condition',
        cell: ({ row }) => (
          <p className="text-gray-600">{row.original.daysBefore} days before</p>
        ),
      },
      {
        id: 'status',
        header: () => <p className="text-center">Disabled / Enabled</p>,
        cell: ({ row }) => (
          <div className="text-center">
            <Switch
              checked={row.original.isEnabled}
              onCheckedChange={() =>
                handleEnabled(row.original.id, row.original.isEnabled)
              }
            />
          </div>
        ),
      },
      {
        id: 'channels',
        header: () => <p className="text-center">Channels</p>,
        cell: ({ row }) => (
          <div className="flex gap-1 justify-center">
            {row.original.channels.map(({ id, type }) => (
              <Badge key={id} variant="outline" className="capitalize">
                {type.toLowerCase()}
              </Badge>
            ))}
          </div>
        ),
      },
      {
        id: 'actions',
        header: () => <div className="text-right pr-4">Actions</div>,
        cell: ({ row }) => (
          <div className="flex justify-end gap-2 pr-5">
            <DeleteIconButton
              onDelete={() => handleDelete(row.original.id)}
              popupTitle="Are you sure you want to delete category"
              popupDescription="This action cannot be undone and will permanently delete category from data base"
            />
          </div>
        ),
      },
    ],
    [handleDelete, handleEnabled],
  )

  const table = useReactTable({
    data: alerts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  })

  return (
    <>
      <TableBase
        table={table}
        loading={isLoading}
        columns={columns}
        noResultsLabel="No alerts."
      />
    </>
  )
}
