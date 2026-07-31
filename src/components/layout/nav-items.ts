import {
  LayoutDashboard,
  FolderKanban,
  Calendar,
  Newspaper,
  Images,
  History,
  MessageSquareText,
  Users,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  adminOnly: boolean
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, adminOnly: false },
  { to: '/projects', label: 'Proyectos', icon: FolderKanban, adminOnly: true },
  { to: '/events', label: 'Eventos', icon: Calendar, adminOnly: false },
  { to: '/news', label: 'Noticias', icon: Newspaper, adminOnly: false },
  { to: '/history', label: 'Historia', icon: History, adminOnly: false },
  { to: '/gallery', label: 'Galería', icon: Images, adminOnly: true },
  { to: '/content', label: 'Mensajes', icon: MessageSquareText, adminOnly: true },
  { to: '/admin-users', label: 'Usuarios', icon: Users, adminOnly: true },
]
