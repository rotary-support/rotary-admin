import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema, type ProjectFormValues } from '@/schemas/content.schema'
import type { Project, Club } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ClubSelect } from '@/components/shared/club-select'
import { BilingualField } from '@/components/shared/bilingual-field'
import { ImageUpload } from '@/components/shared/image-upload'
import { useScope } from '@/lib/scope'

interface ProjectFormProps {
  defaultValues?: Project
  defaultClub: Club
  onSubmit: (data: ProjectFormValues) => Promise<void>
  isSubmitting: boolean
}

export function ProjectForm({ defaultValues, defaultClub, onSubmit, isSubmitting }: ProjectFormProps) {
  const { clubs } = useScope()
  const { register, handleSubmit, watch, setValue, formState: { errors } } =
    useForm<ProjectFormValues>({
      resolver: zodResolver(projectSchema),
      defaultValues: defaultValues
        ? { ...defaultValues, description_es: defaultValues.description_es ?? '', description_en: defaultValues.description_en ?? '' }
        : { club: defaultClub, show_on_home: false, is_published: true, sort_order: 0, image_path: null },
    })

  const club = watch('club')
  const showOnHome = watch('show_on_home')
  const isPublished = watch('is_published')
  const imagePath = watch('image_path')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ClubSelect value={club} onChange={(c) => setValue('club', c)} clubs={clubs} />
      <BilingualField label="Título" nameEs="title_es" nameEn="title_en" register={register} errors={errors} />
      <BilingualField label="Descripción" nameEs="description_es" nameEn="description_en" register={register} errors={errors} textarea rows={3} />
      <ImageUpload prefix="projects" value={imagePath} onChange={(p) => setValue('image_path', p)} />

      <div className="space-y-2">
        <Label htmlFor="sort_order">Orden</Label>
        <Input id="sort_order" type="number" className="max-w-[120px]" {...register('sort_order', { valueAsNumber: true })} />
      </div>

      <div className="flex items-center gap-3">
        <Switch checked={showOnHome} onCheckedChange={(c) => setValue('show_on_home', c)} />
        <Label>Mostrar en el Home</Label>
      </div>
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
