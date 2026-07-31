import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { gallerySchema, type GalleryFormValues } from '@/schemas/content.schema'
import type { GalleryImage, Club } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ClubSelect } from '@/components/shared/club-select'
import { BilingualField } from '@/components/shared/bilingual-field'
import { ImageUpload } from '@/components/shared/image-upload'
import { useScope } from '@/lib/scope'

interface GalleryFormProps {
  defaultValues?: GalleryImage
  defaultClub: Club
  onSubmit: (data: GalleryFormValues) => Promise<void>
  isSubmitting: boolean
}

export function GalleryForm({ defaultValues, defaultClub, onSubmit, isSubmitting }: GalleryFormProps) {
  const { clubs } = useScope()
  const { register, handleSubmit, watch, setValue, formState: { errors } } =
    useForm<GalleryFormValues>({
      resolver: zodResolver(gallerySchema),
      defaultValues: defaultValues
        ? { ...defaultValues, caption_es: defaultValues.caption_es ?? '', caption_en: defaultValues.caption_en ?? '' }
        : { club: defaultClub, image_path: '', sort_order: 0 },
    })

  const club = watch('club')
  const imagePath = watch('image_path')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ClubSelect value={club} onChange={(v) => setValue('club', v)} clubs={clubs} />
      <ImageUpload prefix="gallery" value={imagePath} onChange={(p) => setValue('image_path', p ?? '')} label="Imagen" />
      {errors.image_path && <p className="text-sm text-destructive">{errors.image_path.message}</p>}
      <BilingualField label="Mensaje de la imagen" nameEs="caption_es" nameEn="caption_en" register={register} errors={errors} />
      <div className="space-y-2">
        <Label htmlFor="sort_order">Orden</Label>
        <Input id="sort_order" type="number" className="max-w-[120px]" {...register('sort_order', { valueAsNumber: true })} />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : defaultValues ? 'Actualizar' : 'Agregar'}
        </Button>
      </div>
    </form>
  )
}
