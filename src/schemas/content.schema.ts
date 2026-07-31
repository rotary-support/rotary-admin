import { z } from 'zod'

export const clubEnum = z.enum(['rotary', 'rotaract'])

export const projectSchema = z.object({
  club: clubEnum,
  title_es: z.string().min(1, 'Título (ES) requerido'),
  title_en: z.string().min(1, 'Título (EN) requerido'),
  description_es: z.string().optional().or(z.literal('')),
  description_en: z.string().optional().or(z.literal('')),
  image_path: z.string().nullable().optional(),
  show_on_home: z.boolean(),
  sort_order: z.number().int(),
  is_published: z.boolean(),
})
export type ProjectFormValues = z.infer<typeof projectSchema>

export const eventSchema = z.object({
  club: clubEnum,
  title_es: z.string().min(1, 'Título (ES) requerido'),
  title_en: z.string().min(1, 'Título (EN) requerido'),
  description_es: z.string().optional().or(z.literal('')),
  description_en: z.string().optional().or(z.literal('')),
  event_date: z.string().min(1, 'Fecha requerida'),
  event_time: z.string().optional().or(z.literal('')),
  location_es: z.string().optional().or(z.literal('')),
  location_en: z.string().optional().or(z.literal('')),
  image_path: z.string().nullable().optional(),
  is_published: z.boolean(),
})
export type EventFormValues = z.infer<typeof eventSchema>

export const newsSchema = z.object({
  club: clubEnum,
  title_es: z.string().min(1, 'Título (ES) requerido'),
  title_en: z.string().min(1, 'Título (EN) requerido'),
  excerpt_es: z.string().optional().or(z.literal('')),
  excerpt_en: z.string().optional().or(z.literal('')),
  content_es: z.string().optional().or(z.literal('')),
  content_en: z.string().optional().or(z.literal('')),
  image_path: z.string().nullable().optional(),
  published_at: z.string().min(1, 'Fecha requerida'),
  is_published: z.boolean(),
})
export type NewsFormValues = z.infer<typeof newsSchema>

export const gallerySchema = z.object({
  club: clubEnum,
  image_path: z.string().min(1, 'Imagen requerida'),
  caption_es: z.string().optional().or(z.literal('')),
  caption_en: z.string().optional().or(z.literal('')),
  sort_order: z.number().int(),
})
export type GalleryFormValues = z.infer<typeof gallerySchema>

export const historySchema = z.object({
  club: clubEnum,
  year: z.string().min(1, 'Año requerido'),
  title_es: z.string().min(1, 'Título (ES) requerido'),
  title_en: z.string().min(1, 'Título (EN) requerido'),
  description_es: z.string().optional().or(z.literal('')),
  description_en: z.string().optional().or(z.literal('')),
  image_path: z.string().nullable().optional(),
  sort_order: z.number().int(),
})
export type HistoryFormValues = z.infer<typeof historySchema>

export const siteContentSchema = z.object({
  value_es: z.string().optional().or(z.literal('')),
  value_en: z.string().optional().or(z.literal('')),
})
export type SiteContentFormValues = z.infer<typeof siteContentSchema>

export const adminUserSchema = z.object({
  email: z.string().email('Correo inválido'),
  full_name: z.string().optional().or(z.literal('')),
  role: z.enum(['admin', 'collaborator']),
  club: clubEnum,
})
export type AdminUserFormValues = z.infer<typeof adminUserSchema>
