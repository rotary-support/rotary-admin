import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newsSchema, type NewsFormValues } from '@/schemas/content.schema'
import type { News, Club } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ClubSelect } from '@/components/shared/club-select'
import { BilingualField } from '@/components/shared/bilingual-field'
import { ImageUpload } from '@/components/shared/image-upload'
import { useScope } from '@/lib/scope'

interface NewsFormProps {
  defaultValues?: News
  defaultClub: Club
  onSubmit: (data: NewsFormValues) => Promise<void>
  isSubmitting: boolean
}

export function NewsForm({ defaultValues, defaultClub, onSubmit, isSubmitting }: NewsFormProps) {
  const { clubs } = useScope()
  const { register, handleSubmit, watch, setValue, formState: { errors } } =
    useForm<NewsFormValues>({
      resolver: zodResolver(newsSchema),
      defaultValues: defaultValues
        ? {
            ...defaultValues,
            excerpt_es: defaultValues.excerpt_es ?? '',
            excerpt_en: defaultValues.excerpt_en ?? '',
            content_es: defaultValues.content_es ?? '',
            content_en: defaultValues.content_en ?? '',
            published_at: defaultValues.published_at?.slice(0, 10) ?? '',
          }
        : { club: defaultClub, is_published: true, published_at: '', image_path: null },
    })

  const club = watch('club')
  const isPublished = watch('is_published')
  const imagePath = watch('image_path')
  const imageFocus = watch('image_focus')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ClubSelect value={club} onChange={(v) => setValue('club', v)} clubs={clubs} />
      <BilingualField label="Título" nameEs="title_es" nameEn="title_en" register={register} errors={errors} />
      <BilingualField label="Resumen (excerpt)" nameEs="excerpt_es" nameEn="excerpt_en" register={register} errors={errors} textarea rows={2} />
      <BilingualField label="Contenido" nameEs="content_es" nameEn="content_en" register={register} errors={errors} textarea rows={6} />
      <ImageUpload prefix="news" value={imagePath} onChange={(p) => setValue('image_path', p)} focus={imageFocus} onFocusChange={(f) => setValue('image_focus', f)} />

      <div className="space-y-2">
        <Label htmlFor="published_at">Fecha de publicación</Label>
        <Input id="published_at" type="date" className="max-w-[200px]" {...register('published_at')} />
        {errors.published_at && <p className="text-sm text-destructive">{errors.published_at.message}</p>}
      </div>

      <div className="flex items-center gap-3">
        <Switch checked={isPublished} onCheckedChange={(c) => setValue('is_published', c)} />
        <Label>{isPublished ? 'Publicada' : 'Borrador'}</Label>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : defaultValues ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}
