import type { AlertRule } from '@/types/entities'

import { Plus } from 'lucide-react'

import DeleteIconButton from '@/components/ui-kit/delete-icon.button'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Props = {
  alertsEnabled: boolean
  setAlertsEnabled: (v: boolean) => void
  rules: AlertRule[]
  toggleRule: (id: AlertRule['id'], value: boolean) => void
  deleteRule: (id: AlertRule['id']) => void
  addRule: () => void
}

export default function AlertCardRules({
  alertsEnabled,
  setAlertsEnabled,
  rules,
  toggleRule,
  deleteRule,
  addRule,
}: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-0">
        <div>
          <CardTitle>Expiration alert</CardTitle>
          <CardDescription>
            Create and manage multiple expiration warnings with different
            trigger times
          </CardDescription>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <Switch
            id="enable-alerts"
            checked={alertsEnabled}
            onCheckedChange={setAlertsEnabled}
          />
          <Label htmlFor="enable-alerts" className="text-sm text-slate-600">
            Enable
          </Label>
        </div>
      </CardHeader>

      <CardContent>
        <Table className="bg-white rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Trigger condition</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No alerts yet.
                </TableCell>
              </TableRow>
            ) : (
              rules.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.daysLeft} days left</TableCell>
                  <TableCell>
                    <Switch
                      checked={alertsEnabled && r.enabled}
                      disabled={!alertsEnabled}
                      onCheckedChange={(v) => toggleRule(r.id, v)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <DeleteIconButton
                      onDelete={() => deleteRule(r.id)}
                      popupTitle="Delete this alert?"
                      popupDescription={`This will permanently remove "${r.name}".`}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="mt-6 flex justify-center">
          <Button onClick={addRule}>
            <Plus className="mr-2 size-4" />
            Add new alert
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
