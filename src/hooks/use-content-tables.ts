import { makeCrud } from '@/hooks/crud'
import type {
  Project,
  Event,
  News,
  GalleryImage,
  HistoryNode,
  AdminUser,
} from '@/lib/types'
import type {
  ProjectFormValues,
  EventFormValues,
  NewsFormValues,
  GalleryFormValues,
  HistoryFormValues,
} from '@/schemas/content.schema'

export const projectsCrud = makeCrud<Project, ProjectFormValues>('projects', {
  column: 'sort_order',
  ascending: true,
})

export const eventsCrud = makeCrud<Event, EventFormValues>('events', {
  column: 'event_date',
  ascending: true,
})

export const newsCrud = makeCrud<News, NewsFormValues>('news', {
  column: 'published_at',
  ascending: false,
})

export const galleryCrud = makeCrud<GalleryImage, GalleryFormValues>('gallery_images', {
  column: 'sort_order',
  ascending: true,
})

export const historyCrud = makeCrud<HistoryNode, HistoryFormValues>('history_nodes', {
  column: 'sort_order',
  ascending: true,
})

export const adminUsersCrud = makeCrud<
  AdminUser,
  { id?: string; email: string; full_name?: string | null; role: 'admin' | 'collaborator' }
>('admin_users', { column: 'created_at', ascending: false })
