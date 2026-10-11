import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { historySchema, type HistoryFormValues } from '@/schemas/content.schema'
import type { HistoryNode, Club } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ClubSelect } from '@/components/shared/club-select'
import { BilingualField } from '@/components/shared/bilingual-field'
import { ImageUpload } from '@/components/shared/image-upload'
import { useScope } from '@/lib/scope'

interface HistoryFormProps {
  defaultValues?: HistoryNode
  defaultClub: Club
  onSubmit: (data: HistoryFormValues) => Promise<void>
  isSubmitting: boolean
}

export function HistoryForm({ defaultValues, defaultClub, onSubmit, isSubmitting }: HistoryFormProps) {
  const { clubs } = useScope()
  const { register, handleSubmit, watch, setValue, formState: { errors } } =
    useForm<HistoryFormValues>({
      resolver: zodResolver(historySchema),
      defaultValues: defaultValues
        ? { ...defaultValues, description_es: defaultValues.description_es ?? '', description_en: defaultValues.description_en ?? '' }
        : { club: defaultClub, year: '', sort_order: 0, image_path: null },
    })

  const club = watch('club')
  const imagePath = watch('image_path')
  const imageFocus = watch('image_focus')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ClubSelect value={club} onChange={(v) => setValue('club', v)} clubs={clubs} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="year">Año / Etiqueta</Label>
          <Input id="year" placeholder="1932 · Presente" {...register('year')} />
          {errors.year && <p className="text-sm text-destructive">{errors.year.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="sort_order">Orden</Label>
          <Input id="sort_order" type="number" className="max-w-[120px]" {...register('sort_order', { valueAsNumber: true })} />
        </div>
      </div>
      <BilingualField label="Título" nameEs="title_es" nameEn="title_en" register={register} errors={errors} />
      <BilingualField label="Descripción" nameEs="description_es" nameEn="description_en" register={register} errors={errors} textarea rows={3} />
      <ImageUpload prefix="history" value={imagePath} onChange={(p) => setValue('image_path', p)} focus={imageFocus} onFocusChange={(f) => setValue('image_focus', f)} />

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : defaultValues ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}
