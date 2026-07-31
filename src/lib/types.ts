export type Club = 'rotary' | 'rotaract'
export type AdminRole = 'admin' | 'collaborator'

export const CLUBS: { value: Club; label: string }[] = [
  { value: 'rotary', label: 'Rotary' },
  { value: 'rotaract', label: 'Rotaract' },
]

export interface AdminUser {
  id: string
  email: string
  full_name: string | null
  role: AdminRole
  club: Club
  created_at: string
  updated_at: string
}

export interface SiteContent {
  id: string
  club: Club
  key: string
  value_es: string | null
  value_en: string | null
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  club: Club
  title_es: string
  title_en: string
  description_es: string | null
  description_en: string | null
  image_path: string | null
  show_on_home: boolean
  sort_order: number
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  club: Club
  title_es: string
  title_en: string
  description_es: string | null
  description_en: string | null
  event_date: string
  event_time: string | null
  location_es: string | null
  location_en: string | null
  image_path: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface News {
  id: string
  club: Club
  title_es: string
  title_en: string
  excerpt_es: string | null
  excerpt_en: string | null
  content_es: string | null
  content_en: string | null
  image_path: string | null
  published_at: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface GalleryImage {
  id: string
  club: Club
  image_path: string
  caption_es: string | null
  caption_en: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export interface HistoryNode {
  id: string
  club: Club
  year: string
  title_es: string
  title_en: string
  description_es: string | null
  description_en: string | null
  image_path: string | null
  sort_order: number
  created_at: string
  updated_at: string
}
