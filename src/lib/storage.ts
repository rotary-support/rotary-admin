import { supabase } from '@/lib/supabase'

export const MEDIA_BUCKET = 'media'

/**
 * Sube un archivo al bucket público `media` bajo `<prefix>/<uuid>.<ext>`
 * y devuelve el path guardable en `image_path`.
 */
export async function uploadMedia(prefix: string, file: File): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `${prefix}/${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false })
  if (error) throw error
  return path
}

/**
 * Resuelve un `image_path` a una URL usable en <img>.
 * Deja pasar URLs absolutas (http/https) tal cual; el resto se resuelve
 * como objeto público del bucket `media`.
 */
export function mediaUrl(path: string | null | undefined): string {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl
}

/** Borra un objeto del bucket si es un path de storage (ignora URLs absolutas). */
export async function removeMedia(path: string | null | undefined): Promise<void> {
  if (!path || /^https?:\/\//i.test(path)) return
  await supabase.storage.from(MEDIA_BUCKET).remove([path])
}
