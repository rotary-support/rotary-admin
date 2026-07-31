import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Pencil } from 'lucide-react'
import { useSiteContent, useUpdateSiteContent } from '@/hooks/use-site-content'
import { useScope } from '@/lib/scope'
import { siteContentSchema, type SiteContentFormValues } from '@/schemas/content.schema'
import { ClubSelect } from '@/components/shared/club-select'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { SiteContent, Club } from '@/lib/types'

function EditForm({ item, onDone }: { item: SiteContent; onDone: () => void }) {
  const update = useUpdateSiteContent()
  const { register, handleSubmit } = useForm<SiteContentFormValues>({
    resolver: zodResolver(siteContentSchema),
    defaultValues: { value_es: item.value_es ?? '', value_en: item.value_en ?? '' },
  })

  const onSubmit = async (data: SiteContentFormValues) => {
    try {
      await update.mutateAsync({ id: item.id, value_es: data.value_es ?? '', value_en: data.value_en ?? '' })
      toast.success('Mensaje actualizado')
      onDone()
    } catch {
      toast.error('Error al guardar')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label>Español</Label>
        <Textarea rows={4} {...register('value_es')} />
      </div>
      <div className="space-y-2">
        <Label>English</Label>
        <Textarea rows={4} {...register('value_en')} />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={update.isPending}>
          {update.isPending ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}

export default function ContentPage() {
  const { clubs, defaultClub } = useScope()
  const [club, setClub] = useState<Club>(defaultClub)
  const [editing, setEditing] = useState<SiteContent | null>(null)
  const { data = [], isLoading } = useSiteContent()
  const rows = data.filter((r) => r.club === club)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mensajes principales</h1>
        <p className="text-sm text-muted-foreground">Textos fijos de las páginas (títulos, introducciones, contacto).</p>
      </div>

      <ClubSelect value={club} onChange={setClub} clubs={clubs} label="Filtrar por club" />

      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <div className="divide-y rounded-md border">
          {rows.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="font-mono text-xs text-muted-foreground">{item.key}</p>
                <p className="mt-1 line-clamp-2 text-sm">{item.value_es || <span className="italic text-muted-foreground">(vacío)</span>}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setEditing(item)}>
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {rows.length === 0 && <p className="p-4 text-sm text-muted-foreground">No hay mensajes para este club.</p>}
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-mono text-sm">{editing?.key}</DialogTitle>
          </DialogHeader>
          {editing && <EditForm item={editing} onDone={() => setEditing(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
