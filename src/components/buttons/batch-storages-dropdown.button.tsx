import type { StoragesBatch } from '@/types/entities'

import { IconMapPin } from '@tabler/icons-react'

import { useDeleteStorageBatch } from '@/hooks/api/batches/use-delete-storage-batch'

import DeleteIconButton from '../ui-kit/delete-icon.button'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import RelocateBatchButton from './relocate-batch.button'
import WriteOffBatchButton from './write-off-batch.button'

export function StoragesDropdown({ storages }: { storages: StoragesBatch[] }) {
  const { mutateAsync: deleteStorageBatch } = useDeleteStorageBatch()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-[200px]">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 hover:bg-transparent text-slate-400 hover:text-accent"
        >
          <IconMapPin className="h-4 w-4" />
          Storages
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[400px] max-h-[350px]" align="end">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Storages list
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {storages.length === 0 && (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No storages
          </div>
        )}

        {storages.map((s) => (
          <div
            key={`${s.storageId}${s.batchId}`}
            className="flex items-center justify-between px-4 py-3  border-b"
          >
            <div className="flex flex-col text-sm">
              <span className="font-medium">{s.storage.name}</span>
              <span className="text-xs text-muted-foreground">
                Quantity: {s.qty}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <RelocateBatchButton
                batchId={s.batchId}
                currentStorageId={s.storageId}
                qtyLeft={s.qty}
              />

              <WriteOffBatchButton
                batchId={s.batchId}
                storageId={s.storageId}
                qtyLeft={s.qty}
              />

              <DeleteIconButton
                onDelete={() =>
                  deleteStorageBatch({
                    batchId: s.batchId,
                    storageId: s.storageId,
                  })
                }
                popupTitle="Are you sure you want to delete the part of this batch?"
                popupDescription="This action cannot be undone and will permanently delete part of batch from data base"
              />
            </div>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
