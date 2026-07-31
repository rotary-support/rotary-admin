import { CLUBS, type Club } from '@/lib/types'
import { Label } from '@/components/ui/label'

interface ClubSelectProps {
  value: Club
  onChange: (club: Club) => void
  /** Clubes que el usuario puede elegir. Si es uno solo, el selector se bloquea. */
  clubs?: Club[]
  label?: string
  id?: string
}

/** Selector de club (Rotary / Rotaract). Se limita/bloquea según el alcance del usuario. */
export function ClubSelect({ value, onChange, clubs, label = 'Club', id = 'club' }: ClubSelectProps) {
  const allowed = clubs && clubs.length ? clubs : CLUBS.map((c) => c.value)
  const options = CLUBS.filter((c) => allowed.includes(c.value))
  const single = options.length <= 1

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        value={value}
        disabled={single}
        onChange={(e) => onChange(e.target.value as Club)}
        className="flex h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-70"
      >
        {options.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
    </div>
  )
}
