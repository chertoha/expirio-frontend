import { createFileRoute } from '@tanstack/react-router'

import AlertCard from '@/components/settings/alert-card'
import GenerateReportCard from '@/components/settings/generate-report-card'

export const Route = createFileRoute('/admin/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Settings
          </h1>
        </div>
      </div>

      <AlertCard />

      <GenerateReportCard />
    </div>
  )
}
