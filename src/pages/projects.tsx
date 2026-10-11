import { useState } from 'react'
import { Plus, Pencil, Trash2, Home } from 'lucide-react'
import { type ColumnDef } from '@tanstack/react-table'
import { projectsCrud } from '@/hooks/use-content-tables'
import { useCrudController } from '@/hooks/use-crud-controller'
import { useScope } from '@/lib/scope'
import { ProjectForm } from '@/components/content/project-form'
import { DataTable } from '@/components/shared/data-table'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { ClubSelect } from '@/components/shared/club-select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { mediaUrl } from '@/lib/storage'
import type { Project, Club } from '@/lib/types'

export default function ProjectsPage() {
  const { clubs, defaultClub } = useScope()
  const [club, setClub] = useState<Club>(defaultClub)
  const c = useCrudController<Project, import('@/schemas/content.schema').ProjectFormValues>(projectsCrud)
  const rows = c.rows.filter((r) => r.club === club)

  const columns: ColumnDef<Project>[] = [
    {
      id: 'image',
      header: '',
      cell: ({ row }) =>
        row.original.image_path ? (
          <img src={mediaUrl(row.original.image_path)} alt="" className="h-10 w-14 rounded object-cover" style={{ objectPosition: row.original.image_focus }} />
        ) : (
          <div className="h-10 w-14 rounded bg-muted" />
        ),
    },
    { accessorKey: 'title_es', header: 'Título', cell: ({ row }) => <span className="font-medium">{row.original.title_es}</span> },
    { accessorKey: 'sort_order', header: 'Orden' },
    {
      id: 'home',
      header: 'Home',
      cell: ({ row }) => (row.original.show_on_home ? <Home className="h-4 w-4 text-primary" /> : null),
    },
    {
      accessorKey: 'is_published',
      header: 'Estado',
      cell: ({ row }) => (
        <Badge variant={row.original.is_published ? 'default' : 'outline'}>
          {row.original.is_published ? 'Publicado' : 'Borrador'}
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
        <h1 className="text-2xl font-bold">Proyectos</h1>
        <Button onClick={c.openCreate}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Proyecto
        </Button>
      </div>

      <ClubSelect value={club} onChange={setClub} clubs={clubs} label="Filtrar por club" />

      <DataTable columns={columns} data={rows} isLoading={c.isLoading} searchPlaceholder="Buscar proyecto..." searchColumn="title_es" />

      <Dialog open={c.formOpen} onOpenChange={(o) => (o ? c.setFormOpen(true) : c.closeForm())}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{c.editing ? 'Editar Proyecto' : 'Nuevo Proyecto'}</DialogTitle>
          </DialogHeader>
          <ProjectForm defaultValues={c.editing} defaultClub={club} onSubmit={c.submit} isSubmitting={c.isSubmitting} />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!c.deleteId}
        onClose={() => c.setDeleteId(null)}
        onConfirm={c.confirmDelete}
        title="Eliminar proyecto"
        description="¿Seguro que deseas eliminar este proyecto? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        isLoading={c.isDeleting}
      />
    </div>
  )
}
