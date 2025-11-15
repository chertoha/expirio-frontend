import type { AlertRule } from '@/types/entities'

import { createFileRoute } from '@tanstack/react-router'
import { FileText } from 'lucide-react'
import * as React from 'react'

import AlertCardRules from '@/components/settings/alert-card'
import CardNotificationChannels from '@/components/settings/card-notification-channels'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/admin/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  const [channels, setChannels] = React.useState({ sms: true, email: false })
  const [alertsEnabled, setAlertsEnabled] = React.useState(true)
  const [rules, setRules] = React.useState<AlertRule[]>([
    { id: 1, name: 'Alert', daysLeft: 3, enabled: true },
    { id: 2, name: 'Alert', daysLeft: 5, enabled: false },
  ])

  const toggleRule = (id: AlertRule['id'], value: boolean) =>
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: value } : r)),
    )

  const deleteRule = (id: AlertRule['id']) =>
    setRules((prev) => prev.filter((r) => r.id !== id))

  const addRule = () => {
    const raw = window.prompt('Days left for the new alert?', '7')
    const days = Number(raw)
    if (!Number.isFinite(days)) return
    setRules((prev) => [
      ...prev,
      { id: Date.now(), name: `Alert`, daysLeft: days, enabled: false },
    ])
  }

  const generatePdf = () => alert('Generate PDF (pending integration)')

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Settings
          </h1>
          {/* <p className="text-slate-500">
            Control how alerts and notifications behave in your inventory
            system.
          </p> */}
        </div>

        {/* <Button onClick={generatePdf}>
          <FileText className="mr-2 size-4" />
          Generate PDF
        </Button> */}
      </div>

      {/* <CardNotificationChannels channels={channels} onChange={setChannels} /> */}

      <AlertCardRules
        alertsEnabled={alertsEnabled}
        setAlertsEnabled={setAlertsEnabled}
        rules={rules}
        toggleRule={toggleRule}
        deleteRule={deleteRule}
        addRule={addRule}
      />
    </div>
  )
}
