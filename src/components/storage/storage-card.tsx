import type { Storage } from '@/types/entities'

import { MapPin, Thermometer } from 'lucide-react'

import EditStorageButton from '@/components/buttons/edit-storage.button'
import DeleteIconButton from '@/components/ui-kit/delete-icon.button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function StorageCard({
  storage,
  onDelete,
}: {
  storage: Storage
  onDelete?: (id: number) => void
}) {
  return (
    <Card className="rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
      <CardHeader className="flex max-xs:flex-col gap-4 items-start justify-between pb-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-700">
            <MapPin size={16} />
          </span>
          <CardTitle className="text-base font-semibold">
            {storage.name}
          </CardTitle>
        </div>

        <div className="flex items-center gap-1">
          <EditStorageButton storage={storage} />
          <DeleteIconButton
            onDelete={() => onDelete?.(storage.id)}
            popupTitle="Delete storage"
            popupDescription={`Are you sure you want to delete "${storage.name}"? This action cannot be undone.`}
          />
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription>{storage.description}</CardDescription>
        <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
          <Thermometer size={16} />
          <span>{storage.temperature} °C</span>
        </div>
      </CardContent>
    </Card>
  )
}
