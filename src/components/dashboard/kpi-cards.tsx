import { IconMapPin, IconPillFilled } from '@tabler/icons-react'
import { ArchiveX, Boxes } from 'lucide-react'

import {
  useFindAllBatches,
  useFindAllExpiredBatches,
} from '@/hooks/api/batches/use-find-batches'
import { useFindProducts } from '@/hooks/api/products/use-find-products'
import { useListStorages } from '@/hooks/api/storages/use-list-storages'

import { Card, CardContent } from '../ui/card'

export default function KpiCards() {
  const { data: products } = useFindProducts()
  const { data: storages } = useListStorages()
  const { data: batches } = useFindAllBatches()
  const { data: expiredBatches } = useFindAllExpiredBatches()

  const kpiData = [
    {
      title: 'Products',
      value: products?.totalElements ?? 0,
      icon: IconPillFilled,
      color: 'text-emerald-500',
      bg: 'bg-emerald-100',
    },
    {
      title: 'Batches',
      value: batches?.length ?? 0,
      icon: Boxes,
      color: 'text-blue-500',
      bg: 'bg-blue-100',
    },
    {
      title: 'Expired',
      value: expiredBatches?.length ?? 0,
      icon: ArchiveX,
      color: 'text-red-500',
      bg: 'bg-red-100',
    },
    {
      title: 'Storages',
      value: storages?.length ?? 0,
      icon: IconMapPin,
      color: 'text-purple-500',
      bg: 'bg-purple-100',
    },
  ]

  return (
    <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-4">
      {kpiData.map(({ title, value, icon: Icon, color, bg }) => (
        <Card key={title} className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex max-xs:flex-col items-center gap-10">
              <div className={`p-4 rounded-xl ${bg}`}>
                <Icon className={`w-8 h-8 ${color}`} />
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-xl text-gray-500 ">{title}</p>
                <p className="jet-brains-mono text-4xl font-semibold leading-tight mt-4 pl-4">
                  {value}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
