import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2, Pencil } from 'lucide-react'
import { type ColumnDef } from '@tanstack/react-table'
import { adminUsersCrud } from '@/hooks/use-content-tables'
import { useCrudController } from '@/hooks/use-crud-controller'
import { adminUserSchema, type AdminUserFormValues } from '@/schemas/content.schema'
import { useScope } from '@/lib/scope'
import { DataTable } from '@/components/shared/data-table'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { ClubSelect } from '@/components/shared/club-select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { AdminUser } from '@/lib/types'

type Values = {
  id?: string
  email: string
  full_name?: string | null
  role: 'admin' | 'collaborator'
  club: 'rotary' | 'rotaract'
}

function AdminUserForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: {
  defaultValues?: AdminUser
  onSubmit: (data: Values) => Promise<void>
  isSubmitting: boolean
}) {
  const isEdit = !!defaultValues
  const { clubs, defaultClub } = useScope()
  const [id, setId] = useState('')
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<AdminUserFormValues>({
    resolver: zodResolver(adminUserSchema),
    defaultValues: defaultValues
      ? { email: defaultValues.email, full_name: defaultValues.full_name ?? '', role: defaultValues.role, club: defaultValues.club }
      : { role: 'collaborator', email: '', full_name: '', club: defaultClub },
  })
  const role = watch('role')
  const club = watch('club')

  const submit = (data: AdminUserFormValues) => onSubmit(isEdit ? data : { ...data, id })

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      {!isEdit && (
        <div className="space-y-2">
          <Label htmlFor="uid">UUID del usuario (Auth)</Label>
          <Input id="uid" placeholder="Copia el ID desde Authentication > Users" value={id} onChange={(e) => setId(e.target.value)} required />
          <p className="text-xs text-muted-foreground">
            Primero crea el usuario en Supabase (Authentication → Add user), luego pega aquí su UUID.
          </p>
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Correo</Label>
        <Input id="email" type="email" disabled={isEdit} {...register('email')} />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="full_name">Nombre</Label>
        <Input id="full_name" {...register('full_name')} />
      </div>
      <ClubSelect value={club} onChange={(v) => setValue('club', v)} clubs={clubs} />
      <div className="space-y-2">
        <Label htmlFor="role">Rol</Label>
        <select
          id="role"
          value={role}
          onChange={(e) => setValue('role', e.target.value as 'admin' | 'collaborator')}
          className="flex h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
        >
          <option value="collaborator">Colaborador</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || (!isEdit && !id)}>
          {isSubmitting ? 'Guardando...' : isEdit ? 'Actualizar' : 'Agregar'}
        </Button>
      </div>
    </form>
  )
}

export default function AdminUsersPage() {
  const c = useCrudController<AdminUser, Values>(adminUsersCrud)

  const columns: ColumnDef<AdminUser>[] = [
    { accessorKey: 'email', header: 'Correo', cell: ({ row }) => <span className="font-medium">{row.original.email}</span> },
    { accessorKey: 'full_name', header: 'Nombre', cell: ({ row }) => row.original.full_name ?? '—' },
    {
      accessorKey: 'club',
      header: 'Club',
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.club}
        </Badge>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Rol',
      cell: ({ row }) => (
        <Badge variant={row.original.role === 'admin' ? 'default' : 'outline'}>
          {row.original.role === 'admin' ? 'Administrador' : 'Colaborador'}
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
        <h1 className="text-2xl font-bold">Usuarios del panel</h1>
        <Button onClick={c.openCreate}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Usuario
        </Button>
      </div>

      <DataTable columns={columns} data={c.rows} isLoading={c.isLoading} searchPlaceholder="Buscar usuario..." searchColumn="email" />

      <Dialog open={c.formOpen} onOpenChange={(o) => (o ? c.setFormOpen(true) : c.closeForm())}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{c.editing ? 'Editar Usuario' : 'Agregar Usuario'}</DialogTitle>
          </DialogHeader>
          <AdminUserForm defaultValues={c.editing} onSubmit={c.submit} isSubmitting={c.isSubmitting} />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!c.deleteId}
        onClose={() => c.setDeleteId(null)}
        onConfirm={c.confirmDelete}
        title="Quitar usuario"
        description="El usuario perderá acceso al panel. Su cuenta de Auth no se elimina."
        confirmLabel="Quitar"
        isLoading={c.isDeleting}
      />
    </div>
  )
}
