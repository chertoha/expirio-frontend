import { createFileRoute } from '@tanstack/react-router'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import CategoriesPieChart from '@/components/dashboard/categories-pie-chart'
import KpiCards from '@/components/dashboard/kpi-cards'
import StorageBarChart from '@/components/dashboard/storages-bar-chart'
import { Card, CardContent } from '@/components/ui/card'

const kpiData = [
  { title: 'Products', value: 128 },
  { title: 'Batches', value: 342 },
  { title: 'Expired', value: 14 },
  { title: 'Storages', value: 5 },
]

const expiringData = [
  { month: 'Jan', count: 3 },
  { month: 'Feb', count: 7 },
  { month: 'Mar', count: 10 },
  { month: 'Apr', count: 5 },
  { month: 'May', count: 2 },
]
export const Route = createFileRoute('/admin/dashboard')({
  component: DashboardPage,
})

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 gap-6 p-6">
      {/* KPI Cards */}

      <div className="grid grid-cols-2 gap-4">
        <CategoriesPieChart />

        <KpiCards />
        {/* <div className="grid grid-cols-2 gap-4">
          {kpiData.map((kpi) => (
            <Card key={kpi.title} className="rounded-2xl shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">{kpi.title}</p>
                <p className="text-2xl font-semibold mt-1">{kpi.value}</p>
              </CardContent>
            </Card>
          ))}
        </div> */}
      </div>

      <div className="grid grid-cols-1">
        <StorageBarChart />
      </div>

      {/* Area Chart */}
      <Card className="rounded-2xl shadow-sm">
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
      </Card>
    </div>
  )
}
