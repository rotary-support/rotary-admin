import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

interface Order {
  column: string
  ascending: boolean
}

/**
 * Fábrica de hooks CRUD para una tabla. Los volúmenes de datos son pequeños,
 * así que `useList` trae todas las filas ordenadas y el filtrado por club se
 * hace en la página con un selector.
 */
export function makeCrud<TRow extends { id: string }, TValues>(
  table: string,
  order: Order = { column: 'created_at', ascending: false }
) {
  const queryKey = [table]

  function useList() {
    return useQuery({
      queryKey,
      queryFn: async () => {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .order(order.column, { ascending: order.ascending })
        if (error) throw error
        return data as TRow[]
      },
    })
  }

  function useCreate() {
    const qc = useQueryClient()
    return useMutation({
      mutationFn: async (values: TValues) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, error } = await supabase.from(table).insert(values as any).select().single()
        if (error) throw error
        return data as TRow
      },
      onSuccess: () => qc.invalidateQueries({ queryKey }),
    })
  }

  function useUpdate() {
    const qc = useQueryClient()
    return useMutation({
      mutationFn: async ({ id, values }: { id: string; values: Partial<TValues> }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await supabase.from(table).update(values as any).eq('id', id)
        if (error) throw error
      },
      onSuccess: () => qc.invalidateQueries({ queryKey }),
    })
  }

  function useDelete() {
    const qc = useQueryClient()
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase.from(table).delete().eq('id', id)
        if (error) throw error
      },
      onSuccess: () => qc.invalidateQueries({ queryKey }),
    })
  }

  return { queryKey, useList, useCreate, useUpdate, useDelete }
}
