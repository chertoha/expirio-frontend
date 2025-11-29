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
    </div>
  )
}
