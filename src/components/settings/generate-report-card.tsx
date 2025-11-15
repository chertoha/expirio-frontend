import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

export default function GenerateReportCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-0">
        <div>
          <CardTitle className="text-2xl font-medium">
            Generate report
          </CardTitle>
          <CardDescription className="mt-1 text-base">
            Create and download expired products report
          </CardDescription>
        </div>

        {/* <AddAlertButton /> */}
      </CardHeader>

      <CardContent>{/* <AlertsTable /> */}</CardContent>
    </Card>
  )
}
