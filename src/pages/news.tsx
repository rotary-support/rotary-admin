import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { type ColumnDef } from '@tanstack/react-table'
import { newsCrud } from '@/hooks/use-content-tables'
import { useCrudController } from '@/hooks/use-crud-controller'
import { useScope } from '@/lib/scope'
import { NewsForm } from '@/components/content/news-form'
import { DataTable } from '@/components/shared/data-table'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { ClubSelect } from '@/components/shared/club-select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { formatDate } from '@/lib/utils'
import { mediaUrl } from '@/lib/storage'
import type { News, Club } from '@/lib/types'

export default function NewsPage() {
  const { clubs, defaultClub } = useScope()
  const [club, setClub] = useState<Club>(defaultClub)
  const c = useCrudController<News, import('@/schemas/content.schema').NewsFormValues>(newsCrud)
  const rows = c.rows.filter((r) => r.club === club)

  const columns: ColumnDef<News>[] = [
    {
      id: 'image',
      header: '',
      cell: ({ row }) =>
        row.original.image_path ? (
          <img src={mediaUrl(row.original.image_path)} alt="" className="h-10 w-14 rounded object-cover" />
        ) : (
          <div className="h-10 w-14 rounded bg-muted" />
        ),
    },
    { accessorKey: 'title_es', header: 'Título', cell: ({ row }) => <span className="font-medium">{row.original.title_es}</span> },
    { accessorKey: 'published_at', header: 'Fecha', cell: ({ row }) => formatDate(row.original.published_at) },
    {
      accessorKey: 'is_published',
      header: 'Estado',
      cell: ({ row }) => (
        <Badge variant={row.original.is_published ? 'default' : 'outline'}>
          {row.original.is_published ? 'Publicada' : 'Borrador'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => c.openEdit(row.original)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => c.setDeleteId(row.original.id)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Noticias</h1>
        <Button onClick={c.openCreate}>
          <Plus className="mr-2 h-4 w-4" /> Nueva Noticia
        </Button>
      </div>

      <ClubSelect value={club} onChange={setClub} clubs={clubs} label="Filtrar por club" />

      <DataTable columns={columns} data={rows} isLoading={c.isLoading} searchPlaceholder="Buscar noticia..." searchColumn="title_es" />

      <Dialog open={c.formOpen} onOpenChange={(o) => (o ? c.setFormOpen(true) : c.closeForm())}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{c.editing ? 'Editar Noticia' : 'Nueva Noticia'}</DialogTitle>
          </DialogHeader>
          <NewsForm defaultValues={c.editing} defaultClub={club} onSubmit={c.submit} isSubmitting={c.isSubmitting} />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!c.deleteId}
        onClose={() => c.setDeleteId(null)}
        onConfirm={c.confirmDelete}
        title="Eliminar noticia"
        description="¿Seguro que deseas eliminar esta noticia? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        isLoading={c.isDeleting}
      />
    </div>
  )
}
