import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/auth-context'
import { NAV_ITEMS } from './nav-items'

export function Sidebar() {
  const { role } = useAuth()
  const navItems = NAV_ITEMS.filter((item) => !item.adminOnly || role === 'admin')

  return (
    <aside className="hidden w-64 border-r bg-sidebar-background lg:block">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-lg font-bold text-primary">Rotary Admin</h1>
      </div>
      <nav className="space-y-1 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
