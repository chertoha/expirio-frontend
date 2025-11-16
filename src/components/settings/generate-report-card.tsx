import { PDFDownloadLink } from '@react-pdf/renderer'

import { useFindAllExpiredBatches } from '@/hooks/api/batches/use-find-batches'

import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { ExpiryReportPDF } from './expiry-report-pdf'

export default function GenerateReportCard() {
  const now = new Date().toLocaleString()
  const { data: batches = [] } = useFindAllExpiredBatches()

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
      </CardHeader>

      <CardContent>
        <PDFDownloadLink
          document={<ExpiryReportPDF batches={batches} generatedAt={now} />}
          fileName={`expiry-report-${Date.now()}.pdf`}
        >
          {({ loading }) => (
            <Button disabled={loading}>
              {loading ? 'Loading...' : 'Download PDF report'}
            </Button>
          )}
        </PDFDownloadLink>
      </CardContent>
    </Card>
  )
}
