import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { galleryCrud } from '@/hooks/use-content-tables'
import { useCrudController } from '@/hooks/use-crud-controller'
import { useScope } from '@/lib/scope'
import { GalleryForm } from '@/components/content/gallery-form'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { ClubSelect } from '@/components/shared/club-select'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { mediaUrl } from '@/lib/storage'
import type { GalleryImage, Club } from '@/lib/types'

export default function GalleryPage() {
  const { clubs, defaultClub } = useScope()
  const [club, setClub] = useState<Club>(defaultClub)
  const c = useCrudController<GalleryImage, import('@/schemas/content.schema').GalleryFormValues>(galleryCrud)
  const rows = c.rows.filter((r) => r.club === club)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Galería</h1>
        <Button onClick={c.openCreate}>
          <Plus className="mr-2 h-4 w-4" /> Nueva Imagen
        </Button>
      </div>

      <ClubSelect value={club} onChange={setClub} clubs={clubs} label="Filtrar por club" />

      {c.isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="aspect-square w-full rounded-lg" />)}
        </div>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No hay imágenes en esta galería.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {rows.map((img) => (
            <div key={img.id} className="group relative overflow-hidden rounded-lg border">
              <img src={mediaUrl(img.image_path)} alt={img.caption_es ?? ''} className="aspect-square w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="truncate text-xs text-white">{img.caption_es || '(sin mensaje)'}</p>
              </div>
              <div className="absolute right-1 top-1 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button variant="secondary" size="icon" className="h-7 w-7" onClick={() => c.openEdit(img)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="secondary" size="icon" className="h-7 w-7" onClick={() => c.setDeleteId(img.id)}>
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={c.formOpen} onOpenChange={(o) => (o ? c.setFormOpen(true) : c.closeForm())}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{c.editing ? 'Editar Imagen' : 'Nueva Imagen'}</DialogTitle>
          </DialogHeader>
          <GalleryForm defaultValues={c.editing} defaultClub={club} onSubmit={c.submit} isSubmitting={c.isSubmitting} />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!c.deleteId}
        onClose={() => c.setDeleteId(null)}
        onConfirm={c.confirmDelete}
        title="Eliminar imagen"
        description="¿Seguro que deseas eliminar esta imagen de la galería?"
        confirmLabel="Eliminar"
        isLoading={c.isDeleting}
      />
    </div>
  )
}
