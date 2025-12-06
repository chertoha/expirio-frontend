import { createFileRoute } from '@tanstack/react-router'

import CreateStorageButton from '@/components/buttons/create-storage.button'
import StorageCard from '@/components/storage/storage-card'
import { notifyAxiosError } from '@/helpers/notify-axios-error'
import { useDeleteStorage } from '@/hooks/api/storages/use-delete-storage'
import { useListStorages } from '@/hooks/api/storages/use-list-storages'
import { notify } from '@/lib/notify'

export const Route = createFileRoute('/admin/storages')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: storagesData = [], isLoading } = useListStorages()

  const del = useDeleteStorage()

  const handleDelete = async (id: number) => {
    try {
      await del.mutateAsync(id)
      notify.success('Storage deleted successfully')
    } catch (error) {
      notifyAxiosError(error)
    }
  }
  if (isLoading) {
    return <div className="h-24 text-center">Loading storages...</div>
  }
  if (!storagesData || storagesData.length === 0) {
    return <div className="h-24 text-center">No storage locations found</div>
  }
  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-slate-900 text-3xl font-extrabold leading-8">
            Storage Locations
          </h1>
          <p className="mt-2 text-base leading-7 text-slate-500">
            Manage your medicine storage areas
          </p>
        </div>

        <CreateStorageButton />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {storagesData.map((s) => (
          <StorageCard key={s.id} storage={s} onDelete={handleDelete} />
        ))}
      </div>
    </>
  )
}
