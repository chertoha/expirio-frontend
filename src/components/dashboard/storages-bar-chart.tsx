import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts'

import { useListStorages } from '@/hooks/api/storages/use-list-storages'

import { Card, CardContent } from '../ui/card'

export default function StorageBarChart() {
  const { data: storages = [] } = useListStorages()

  const chartData = storages.map((storage) => ({
    name: storage.name,
    qty: storage.batches.reduce((sum, batch) => sum + batch.qty, 0),
  }))

  const minBarWidth = 80
  const chartWidth = chartData.length * minBarWidth

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-4">
        <h2 className="mb-4 text-lg font-medium">Stock Volume by Storages</h2>

        <div className="overflow-x-auto">
          <div style={{ width: chartWidth }}>
            <BarChart
              width={chartWidth}
              height={330}
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 50 }}
            >
              <XAxis
                dataKey="name"
                interval={0}
                angle={-35}
                textAnchor="end"
                height={70}
              />

              <YAxis />
              <Tooltip />
              <Bar dataKey="qty" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
