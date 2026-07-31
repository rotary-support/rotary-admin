import { useState } from 'react'
import { toast } from 'sonner'

interface Crud<TRow extends { id: string }, TValues> {
  useList: () => { data?: TRow[]; isLoading: boolean }
  useCreate: () => { mutateAsync: (values: TValues) => Promise<unknown>; isPending: boolean }
  useUpdate: () => { mutateAsync: (arg: { id: string; values: Partial<TValues> }) => Promise<unknown>; isPending: boolean }
  useDelete: () => { mutateAsync: (id: string) => Promise<unknown>; isPending: boolean }
}

/**
 * Encapsula el estado y los handlers comunes de una página CRUD
 * (abrir/cerrar formulario, editar, crear, eliminar con toasts).
 */
export function useCrudController<TRow extends { id: string }, TValues>(
  crud: Crud<TRow, TValues>,
  labels = { created: 'Creado', updated: 'Actualizado', deleted: 'Eliminado' }
) {
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<TRow | undefined>()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const list = crud.useList()
  const create = crud.useCreate()
  const update = crud.useUpdate()
  const del = crud.useDelete()

  const openCreate = () => {
    setEditing(undefined)
    setFormOpen(true)
  }
  const openEdit = (row: TRow) => {
    setEditing(row)
    setFormOpen(true)
  }
  const closeForm = () => {
    setFormOpen(false)
    setEditing(undefined)
  }

  const submit = async (values: TValues) => {
    try {
      if (editing) {
        await update.mutateAsync({ id: editing.id, values })
        toast.success(labels.updated)
      } else {
        await create.mutateAsync(values)
        toast.success(labels.created)
      }
      closeForm()
    } catch {
      toast.error('Error al guardar')
    }
  }

  const confirmDelete = async () => {
    if (!deleteId) return
    try {
      await del.mutateAsync(deleteId)
      toast.success(labels.deleted)
      setDeleteId(null)
    } catch {
      toast.error('Error al eliminar')
    }
  }

  return {
    rows: list.data ?? [],
    isLoading: list.isLoading,
    formOpen,
    editing,
    deleteId,
    setDeleteId,
    openCreate,
    openEdit,
    closeForm,
    setFormOpen,
    submit,
    confirmDelete,
    isSubmitting: create.isPending || update.isPending,
    isDeleting: del.isPending,
  }
}
