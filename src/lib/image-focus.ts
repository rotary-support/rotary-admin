export const DEFAULT_FOCUS = '50% 50%'

/** Convierte "X% Y%" en números 0–100 (centro si el valor no es válido). */
export function parseFocus(focus: string | null | undefined): { x: number; y: number } {
  const m = /^\s*(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%\s*$/.exec(focus ?? '')
  if (!m) return { x: 50, y: 50 }
  return { x: Math.min(100, Number(m[1])), y: Math.min(100, Number(m[2])) }
}
