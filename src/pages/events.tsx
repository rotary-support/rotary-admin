import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { type ColumnDef } from '@tanstack/react-table'
import { eventsCrud } from '@/hooks/use-content-tables'
import { useCrudController } from '@/hooks/use-crud-controller'
import { useScope } from '@/lib/scope'
import { EventForm } from '@/components/content/event-form'
import { DataTable } from '@/components/shared/data-table'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { ClubSelect } from '@/components/shared/club-select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { formatDate } from '@/lib/utils'
import type { Event, Club } from '@/lib/types'

export default function EventsPage() {
  const { clubs, defaultClub } = useScope()
  const [club, setClub] = useState<Club>(defaultClub)
  const c = useCrudController<Event, import('@/schemas/content.schema').EventFormValues>(eventsCrud)
  const rows = c.rows.filter((r) => r.club === club)

  const columns: ColumnDef<Event>[] = [
    { accessorKey: 'title_es', header: 'Título', cell: ({ row }) => <span className="font-medium">{row.original.title_es}</span> },
    { accessorKey: 'event_date', header: 'Fecha', cell: ({ row }) => formatDate(row.original.event_date) },
    { accessorKey: 'location_es', header: 'Lugar', cell: ({ row }) => row.original.location_es ?? '—' },
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
        <h1 className="text-2xl font-bold">Eventos</h1>
        <Button onClick={c.openCreate}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Evento
        </Button>
      </div>

      <ClubSelect value={club} onChange={setClub} clubs={clubs} label="Filtrar por club" />

      <DataTable columns={columns} data={rows} isLoading={c.isLoading} searchPlaceholder="Buscar evento..." searchColumn="title_es" />

      <Dialog open={c.formOpen} onOpenChange={(o) => (o ? c.setFormOpen(true) : c.closeForm())}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{c.editing ? 'Editar Evento' : 'Nuevo Evento'}</DialogTitle>
          </DialogHeader>
          <EventForm defaultValues={c.editing} defaultClub={club} onSubmit={c.submit} isSubmitting={c.isSubmitting} />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!c.deleteId}
        onClose={() => c.setDeleteId(null)}
        onConfirm={c.confirmDelete}
        title="Eliminar evento"
        description="¿Seguro que deseas eliminar este evento? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        isLoading={c.isDeleting}
      />
    </div>
  )
}
