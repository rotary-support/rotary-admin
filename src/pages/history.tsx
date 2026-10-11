import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { type ColumnDef } from '@tanstack/react-table'
import { historyCrud } from '@/hooks/use-content-tables'
import { useCrudController } from '@/hooks/use-crud-controller'
import { useScope } from '@/lib/scope'
import { HistoryForm } from '@/components/content/history-form'
import { DataTable } from '@/components/shared/data-table'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { ClubSelect } from '@/components/shared/club-select'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { mediaUrl } from '@/lib/storage'
import type { HistoryNode, Club } from '@/lib/types'

export default function HistoryPage() {
  const { clubs, defaultClub } = useScope()
  const [club, setClub] = useState<Club>(defaultClub)
  const c = useCrudController<HistoryNode, import('@/schemas/content.schema').HistoryFormValues>(historyCrud)
  const rows = c.rows.filter((r) => r.club === club)

  const columns: ColumnDef<HistoryNode>[] = [
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
    { accessorKey: 'sort_order', header: 'Orden' },
    { accessorKey: 'year', header: 'Año', cell: ({ row }) => <span className="font-semibold">{row.original.year}</span> },
    { accessorKey: 'title_es', header: 'Título', cell: ({ row }) => row.original.title_es },
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
        <h1 className="text-2xl font-bold">Historia (Timeline)</h1>
        <Button onClick={c.openCreate}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Nodo
        </Button>
      </div>

      <ClubSelect value={club} onChange={setClub} clubs={clubs} label="Filtrar por club" />

      <DataTable columns={columns} data={rows} isLoading={c.isLoading} searchPlaceholder="Buscar nodo..." searchColumn="title_es" />

      <Dialog open={c.formOpen} onOpenChange={(o) => (o ? c.setFormOpen(true) : c.closeForm())}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{c.editing ? 'Editar Nodo' : 'Nuevo Nodo'}</DialogTitle>
          </DialogHeader>
          <HistoryForm defaultValues={c.editing} defaultClub={club} onSubmit={c.submit} isSubmitting={c.isSubmitting} />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!c.deleteId}
        onClose={() => c.setDeleteId(null)}
        onConfirm={c.confirmDelete}
        title="Eliminar nodo"
        description="¿Seguro que deseas eliminar este nodo de la historia? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        isLoading={c.isDeleting}
      />
    </div>
  )
}
