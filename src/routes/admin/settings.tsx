import { createFileRoute } from '@tanstack/react-router'

import AlertCard from '@/components/settings/alert-card'
import GenerateReportCard from '@/components/settings/generate-report-card'

export const Route = createFileRoute('/admin/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-slate-900 text-3xl font-extrabold leading-8">
          Settings
        </h1>
      </div>

      <p className="mt-2 text-base leading-7 text-slate-500">
        This page allows users to configure automatic expiration alerts and
        generate expiry reports for medications.
      </p>

      <div className="mt-10 flex flex-col h-full gap-y-6">
        <AlertCard />
        <GenerateReportCard />
      </div>
    </>
  )
}
