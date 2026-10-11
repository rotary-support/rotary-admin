import { useRef } from 'react'
import { Crosshair } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DEFAULT_FOCUS, parseFocus } from '@/lib/image-focus'

const clamp = (n: number) => Math.round(Math.min(100, Math.max(0, n)))

/** Proporciones en las que el sitio recorta las imágenes, para previsualizar. */
const PREVIEWS = [
  { label: 'Horizontal', className: 'aspect-[16/9]' },
  { label: 'Tarjeta', className: 'aspect-[4/3]' },
  { label: 'Cuadrada', className: 'aspect-square' },
]

interface ImageFocusPickerProps {
  src: string
  value: string | null | undefined
  onChange: (focus: string) => void
}

/**
 * Muestra la imagen completa; un clic (o arrastrar) marca el punto que debe
 * quedar visible cuando el sitio recorta la imagen.
 */
export function ImageFocusPicker({ src, value, onChange }: ImageFocusPickerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { x, y } = parseFocus(value)
  const focus = `${x}% ${y}%`

  const setFromPointer = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const nx = clamp(((e.clientX - rect.left) / rect.width) * 100)
    const ny = clamp(((e.clientY - rect.top) / rect.height) * 100)
    onChange(`${nx}% ${ny}%`)
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Haz clic en la parte de la imagen que siempre debe verse en el sitio.
      </p>
      <div
        ref={ref}
        className="relative inline-block max-w-full cursor-crosshair touch-none select-none overflow-hidden rounded-md border"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          setFromPointer(e)
        }}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) setFromPointer(e)
        }}
      >
        <img src={src} alt="Seleccionar enfoque" draggable={false} className="block max-h-72 max-w-full" />
        <span
          className="pointer-events-none absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary/60 shadow-[0_0_0_2px_rgba(0,0,0,0.4)]"
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      </div>

      <div className="grid max-w-md grid-cols-3 gap-2">
        {PREVIEWS.map((p) => (
          <div key={p.label} className="space-y-1">
            <div className={`${p.className} overflow-hidden rounded border bg-muted`}>
              <img src={src} alt="" className="h-full w-full object-cover" style={{ objectPosition: focus }} />
            </div>
            <p className="text-center text-xs text-muted-foreground">{p.label}</p>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" size="sm" onClick={() => onChange(DEFAULT_FOCUS)}>
        <Crosshair className="mr-2 h-4 w-4" /> Centrar
      </Button>
    </div>
  )
}
