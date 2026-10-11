import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { eventSchema, type EventFormValues } from '@/schemas/content.schema'
import type { Event, Club } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ClubSelect } from '@/components/shared/club-select'
import { BilingualField } from '@/components/shared/bilingual-field'
import { ImageUpload } from '@/components/shared/image-upload'
import { useScope } from '@/lib/scope'

interface EventFormProps {
  defaultValues?: Event
  defaultClub: Club
  onSubmit: (data: EventFormValues) => Promise<void>
  isSubmitting: boolean
}

export function EventForm({ defaultValues, defaultClub, onSubmit, isSubmitting }: EventFormProps) {
  const { clubs } = useScope()
  const { register, handleSubmit, watch, setValue, formState: { errors } } =
    useForm<EventFormValues>({
      resolver: zodResolver(eventSchema),
      defaultValues: defaultValues
        ? {
            ...defaultValues,
            description_es: defaultValues.description_es ?? '',
            description_en: defaultValues.description_en ?? '',
            event_time: defaultValues.event_time ?? '',
            location_es: defaultValues.location_es ?? '',
            location_en: defaultValues.location_en ?? '',
          }
        : { club: defaultClub, is_published: true, event_date: '', image_path: null },
    })

  const club = watch('club')
  const isPublished = watch('is_published')
  const imagePath = watch('image_path')
  const imageFocus = watch('image_focus')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ClubSelect value={club} onChange={(v) => setValue('club', v)} clubs={clubs} />
      <BilingualField label="Título" nameEs="title_es" nameEn="title_en" register={register} errors={errors} />
      <BilingualField label="Descripción" nameEs="description_es" nameEn="description_en" register={register} errors={errors} textarea rows={3} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="event_date">Fecha</Label>
          <Input id="event_date" type="date" {...register('event_date')} />
          {errors.event_date && <p className="text-sm text-destructive">{errors.event_date.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="event_time">Horario (texto libre)</Label>
          <Input id="event_time" placeholder="7:00 PM - 11:00 PM" {...register('event_time')} />
        </div>
      </div>

      <BilingualField label="Lugar" nameEs="location_es" nameEn="location_en" register={register} errors={errors} />
      <ImageUpload prefix="events" value={imagePath} onChange={(p) => setValue('image_path', p)} focus={imageFocus} onFocusChange={(f) => setValue('image_focus', f)} />

      <div className="flex items-center gap-3">
        <Switch checked={isPublished} onCheckedChange={(c) => setValue('is_published', c)} />
        <Label>{isPublished ? 'Publicado' : 'Borrador'}</Label>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : defaultValues ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}
