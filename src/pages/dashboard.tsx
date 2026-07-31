import { useQuery } from '@tanstack/react-query'
import { FolderKanban, Calendar, Newspaper, Images, History } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'

function useCount(table: string) {
  return useQuery({
    queryKey: ['dashboard', table],
    queryFn: async () => {
      const { count } = await supabase.from(table).select('*', { count: 'exact', head: true })
      return count ?? 0
    },
  })
}

export default function DashboardPage() {
  const { data: projects = 0 } = useCount('projects')
  const { data: events = 0 } = useCount('events')
  const { data: news = 0 } = useCount('news')
  const { data: gallery = 0 } = useCount('gallery_images')
  const { data: history = 0 } = useCount('history_nodes')

  const stats = [
    { label: 'Proyectos', value: projects, icon: FolderKanban },
    { label: 'Eventos', value: events, icon: Calendar },
    { label: 'Noticias', value: news, icon: Newspaper },
    { label: 'Imágenes de galería', value: gallery, icon: Images },
    { label: 'Nodos de historia', value: history, icon: History },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
