import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { SiteContent } from '@/lib/types'

const queryKey = ['site_content']

export function useSiteContent() {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .order('club', { ascending: true })
        .order('key', { ascending: true })
      if (error) throw error
      return data as SiteContent[]
    },
  })
}

export function useUpdateSiteContent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      value_es,
      value_en,
    }: {
      id: string
      value_es: string
      value_en: string
    }) => {
      const { error } = await supabase
        .from('site_content')
        .update({ value_es, value_en })
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey }),
  })
}
