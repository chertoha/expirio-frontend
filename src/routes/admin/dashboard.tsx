import { createFileRoute } from '@tanstack/react-router'

import CategoriesPieChart from '@/components/dashboard/categories-pie-chart'
import KpiCards from '@/components/dashboard/kpi-cards'
import StorageBarChart from '@/components/dashboard/storages-bar-chart'

export const Route = createFileRoute('/admin/dashboard')({
  component: DashboardPage,
})

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 gap-6 p-6">
      <div className="grid grid-cols-2 gap-4">
        <CategoriesPieChart />

        <KpiCards />
      </div>

      <div className="grid grid-cols-1">
        <StorageBarChart />
      </div>

      {/* Area Chart */}
      {/* <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-4">
          <h2 className="mb-4 text-lg font-medium">
            Expiring Batches by Month
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={expiringData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#10B981"
                fill="#D1FAE5"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}
    </div>
  )
}
