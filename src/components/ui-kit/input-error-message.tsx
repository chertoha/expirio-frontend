import { FieldDescription } from '../ui/field'

type InputErrorMessagePeops = {
  text?: string
}

export default function InputErrorMessage({ text }: InputErrorMessagePeops) {
  if (!text) return null
  return <FieldDescription className="text-red-500">{text}</FieldDescription>
}
