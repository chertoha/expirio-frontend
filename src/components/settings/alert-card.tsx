import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import AddAlertButton from '../buttons/add-alert.button'
import AlertsTable from '../tables/alerts.table'

// type Props = {
//   alertsEnabled: boolean
//   setAlertsEnabled: (v: boolean) => void
//   rules: AlertRule[]
//   toggleRule: (id: AlertRule['id'], value: boolean) => void
//   deleteRule: (id: AlertRule['id']) => void
//   addRule: () => void
// }

export default function AlertCardRules() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-0">
        {/* <div className="flex justify-between "> */}
        <div>
          <CardTitle className="text-2xl font-medium">
            Expiration alerts
          </CardTitle>
          <CardDescription className="mt-1 text-base">
            Create and manage multiple expiration warnings with different
            trigger times
          </CardDescription>
        </div>

        <AddAlertButton />
        {/* <Button onClick={() => {}}>
          <Plus />
          Add Alert
        </Button> */}
        {/* </div> */}

        {/* <div className="flex items-center gap-2 mt-1">
          <Switch
            id="enable-alerts"
            checked={alertsEnabled}
            onCheckedChange={setAlertsEnabled}
          />
          <Label htmlFor="enable-alerts" className="text-sm text-slate-600">
            Enable
          </Label>
        </div> */}
      </CardHeader>

      <CardContent>
        <AlertsTable />

        {/*  */}
        {/* <Table className="bg-white rounded-lg">
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
        </Table> */}
      </CardContent>
    </Card>
  )
}
