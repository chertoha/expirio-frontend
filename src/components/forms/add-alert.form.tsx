import type { AddAlertFormValues } from '@/schemas/alert.schema'
import type { AlertType } from '@/types/entities'
import type { SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { notifyAxiosError } from '@/helpers/notify-axios-error'
import { useAddAlert } from '@/hooks/api/alerts/use-add-alert'
import { addAlertDefaultValues, alertSchema } from '@/schemas/alert.schema'

import InputErrorMessage from '../ui-kit/input-error-message'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

type AddAlertFormProps = {
  close: () => void
}

export default function AddAlertForm({ close }: AddAlertFormProps) {
  const { mutateAsync: addAlert } = useAddAlert()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddAlertFormValues>({
    defaultValues: addAlertDefaultValues,
    resolver: zodResolver(alertSchema),
  })

  const selectedChannels = watch('channels') || []

  const toggleChannel = (value: AlertType) => {
    if (selectedChannels.includes(value)) {
      setValue(
        'channels',
        selectedChannels.filter((v) => v !== value),
        { shouldValidate: true },
      )
    } else {
      setValue('channels', [...selectedChannels, value], {
        shouldValidate: true,
      })
    }
  }

  const onSubmit: SubmitHandler<AddAlertFormValues> = async (values) => {
    try {
      await addAlert(values)
      close()
    } catch (error) {
      notifyAxiosError(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="alert_form_name">Name</FieldLabel>
          <Input id="alert_form_name" {...register('name')} />
          <InputErrorMessage text={errors.name?.message} />
        </Field>

        <Field>
          <FieldLabel htmlFor="alert_form_days">Days before</FieldLabel>
          <Input
            id="alert_form_days"
            {...register('daysBefore', { valueAsNumber: true })}
            type="number"
          />
          <InputErrorMessage text={errors.daysBefore?.message} />
        </Field>

        <Field>
          <FieldLabel>Notification Channels</FieldLabel>

          <div className="flex flex-col gap-y-5 my-3">
            {(['EMAIL', 'SMS', 'PUSH'] as const).map((type) => (
              <div className="flex items-center gap-3" key={type}>
                <Checkbox
                  id={`checkbox_id_${type}`}
                  checked={selectedChannels.includes(type)}
                  onCheckedChange={() => toggleChannel(type)}
                />

                <Label
                  htmlFor={`checkbox_id_${type}`}
                  className="capitalize cursor-pointer"
                >
                  {type.toLowerCase()}
                </Label>
              </div>
            ))}
          </div>
          <InputErrorMessage text={errors.channels?.message} />
        </Field>

        <Field>
          <div className="flex gap-x-4 justify-end">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>

            <Button type="submit">Add Alert</Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  )
}
