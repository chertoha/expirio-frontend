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
    { title: 'Products', value: products?.totalElements ?? 0 },
    { title: 'Batches', value: batches?.length ?? 0 },
    { title: 'Expired', value: expiredBatches?.length ?? 0 },
    { title: 'Storages', value: storages?.length ?? 0 },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {kpiData.map((kpi) => (
        <Card key={kpi.title} className="rounded-2xl shadow-sm">
          <CardContent className="p-4">
            <p className="text-xl text-gray-500">{kpi.title}</p>
            <p className="text-3xl p-4 font-semibold mt-1">{kpi.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
