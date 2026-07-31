import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface BilingualFieldProps {
  label: string
  nameEs: string
  nameEn: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: FieldErrors<any>
  textarea?: boolean
  rows?: number
  placeholder?: string
}

/** Par de campos ES / EN lado a lado para un mismo texto bilingüe. */
export function BilingualField({
  label,
  nameEs,
  nameEn,
  register,
  errors,
  textarea = false,
  rows = 4,
  placeholder,
}: BilingualFieldProps) {
  const esError = errors?.[nameEs]?.message as string | undefined
  const enError = errors?.[nameEn]?.message as string | undefined

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          {textarea ? (
            <Textarea rows={rows} placeholder={`${placeholder ?? label} (ES)`} {...register(nameEs)} />
          ) : (
            <Input placeholder={`${placeholder ?? label} (ES)`} {...register(nameEs)} />
          )}
          <span className="text-xs text-muted-foreground">Español</span>
          {esError && <p className="text-sm text-destructive">{esError}</p>}
        </div>
        <div className="space-y-1">
          {textarea ? (
            <Textarea rows={rows} placeholder={`${placeholder ?? label} (EN)`} {...register(nameEn)} />
          ) : (
            <Input placeholder={`${placeholder ?? label} (EN)`} {...register(nameEn)} />
          )}
          <span className="text-xs text-muted-foreground">English</span>
          {enError && <p className="text-sm text-destructive">{enError}</p>}
        </div>
      </div>
    </div>
  )
}
