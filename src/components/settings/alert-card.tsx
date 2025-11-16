import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import AddAlertButton from '../buttons/add-alert.button'
import AlertsTable from '../tables/alerts.table'

export default function AlertCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-0">
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
      </CardHeader>

      <CardContent>
        <AlertsTable />
      </CardContent>
    </Card>
  )
}
