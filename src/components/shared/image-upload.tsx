import { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { uploadMedia, mediaUrl } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface ImageUploadProps {
  /** Prefijo/carpeta dentro del bucket: gallery, news, projects, history */
  prefix: string
  /** image_path actual (path de storage o URL absoluta) */
  value: string | null | undefined
  onChange: (path: string | null) => void
  label?: string
}

export function ImageUpload({ prefix, value, onChange, label = 'Imagen' }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const path = await uploadMedia(prefix, file)
      onChange(path)
    } catch {
      setError('No se pudo subir la imagen')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {value ? (
        <div className="relative w-full max-w-xs overflow-hidden rounded-md border">
          <img src={mediaUrl(value)} alt="preview" className="h-40 w-full object-cover" />
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute right-2 top-2 h-7 w-7"
            onClick={() => onChange(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          <Upload className="mr-2 h-4 w-4" />
          {uploading ? 'Subiendo...' : 'Subir imagen'}
        </Button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
