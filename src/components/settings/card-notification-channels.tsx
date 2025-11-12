import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

type Props = {
  channels: { sms: boolean; email: boolean }
  onChange: (channels: { sms: boolean; email: boolean }) => void
}

export default function CardNotificationChannels({
  channels,
  onChange,
}: Props) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Notification channels</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <label className="flex items-center gap-3">
          <Checkbox
            checked={channels.sms}
            onCheckedChange={(v) => onChange({ ...channels, sms: !!v })}
          />
          <span>SMS</span>
        </label>

        <label className="flex items-center gap-3">
          <Checkbox
            checked={channels.email}
            onCheckedChange={(v) => onChange({ ...channels, email: !!v })}
          />
          <span>Email</span>
        </label>
      </CardContent>
    </Card>
  )
}
