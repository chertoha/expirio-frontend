import { MapPin, Pencil, Thermometer } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export type Storage = {
  id: string
  name: string
  description: string
  temperatureLabel: string
}

type Props = {
  storage: Storage
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export default function StorageCard({ storage, onEdit, onDelete }: Props) {
  return (
    <Card className="shadow-sm hover:shadow-md transition">
      <CardHeader className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-700">
            <MapPin size={16} />
          </span>
          <CardTitle className="text-base font-semibold">
            {storage.name}
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onEdit?.(storage.id)}
          >
            <Pencil className="size-4" />
          </Button>
          {/* <DeleteButton onConfirm={() => onDelete?.(storage.id)} /> */}
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription>{storage.description}</CardDescription>
        <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
          <Thermometer size={16} />
          <span>{storage.temperatureLabel}</span>
        </div>
      </CardContent>
    </Card>
  )
}
