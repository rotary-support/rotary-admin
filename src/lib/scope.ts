import { useAuth } from '@/context/auth-context'
import type { Club } from '@/lib/types'

/**
 * Alcance del usuario actual según su club y rol.
 * - Rotary admin = super admin: puede gestionar ambos clubes.
 * - Rotaract admin / cualquier collaborator: bloqueado a su propio club.
 */
export function useScope() {
  const { role, club } = useAuth()
  const isSuperAdmin = role === 'admin' && club === 'rotary'
  const clubs: Club[] = isSuperAdmin ? ['rotary', 'rotaract'] : club ? [club] : ['rotary']
  return {
    role,
    club,
    isSuperAdmin,
    clubs,
    defaultClub: clubs[0],
    canSwitchClubs: clubs.length > 1,
  }
}
