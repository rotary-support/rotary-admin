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

interface CropPreviewProps {
  src: string
  label: string
  className: string
  x: number
  y: number
  onChange: (focus: string) => void
}

/**
 * Recuadro con el recorte tal como se verá en el sitio. Arrastrar la imagen
 * dentro del recuadro la desplaza, como al recortar una foto de perfil.
 */
function CropPreview({ src, label, className, x, y, onChange }: CropPreviewProps) {
  const start = useRef<{ px: number; py: number; x: number; y: number } | null>(null)

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = start.current
    const img = e.currentTarget.querySelector('img')
    if (!s || !img?.naturalWidth) return
    const box = e.currentTarget.getBoundingClientRect()
    // object-fit: cover escala la imagen hasta cubrir el recuadro; lo que
    // sobra en cada eje es lo que object-position permite desplazar.
    const scale = Math.max(box.width / img.naturalWidth, box.height / img.naturalHeight)
    const overflowX = img.naturalWidth * scale - box.width
    const overflowY = img.naturalHeight * scale - box.height
    const nx = overflowX > 1 ? clamp(s.x - ((e.clientX - s.px) / overflowX) * 100) : s.x
    const ny = overflowY > 1 ? clamp(s.y - ((e.clientY - s.py) / overflowY) * 100) : s.y
    onChange(`${nx}% ${ny}%`)
  }

  return (
    <div className="space-y-1">
      <div
        className={`${className} cursor-grab touch-none select-none overflow-hidden rounded border bg-muted active:cursor-grabbing`}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          start.current = { px: e.clientX, py: e.clientY, x, y }
        }}
        onPointerMove={onPointerMove}
        onPointerUp={() => (start.current = null)}
        onPointerCancel={() => (start.current = null)}
      >
        <img
          src={src}
          alt=""
          draggable={false}
          className="pointer-events-none h-full w-full object-cover"
          style={{ objectPosition: `${x}% ${y}%` }}
        />
      </div>
      <p className="text-center text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

interface ImageFocusPickerProps {
  src: string
  value: string | null | undefined
  onChange: (focus: string) => void
}

/**
 * Permite elegir qué parte de la imagen queda visible cuando el sitio la
 * recorta: arrastrando la imagen dentro de los recuadros de vista previa, o
 * haciendo clic sobre la imagen completa.
 */
export function ImageFocusPicker({ src, value, onChange }: ImageFocusPickerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { x, y } = parseFocus(value)

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
        Así se verá recortada en el sitio. Arrastra la imagen dentro de los recuadros para elegir qué parte se ve.
      </p>
      <div className="grid max-w-xl grid-cols-3 gap-3">
        {PREVIEWS.map((p) => (
          <CropPreview key={p.label} src={src} label={p.label} className={p.className} x={x} y={y} onChange={onChange} />
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        También puedes hacer clic en la imagen completa sobre la parte que siempre debe verse.
      </p>
      <div>
        <div
          ref={ref}
          className="relative inline-block max-w-full cursor-crosshair touch-none select-none"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId)
            setFromPointer(e)
          }}
          onPointerMove={(e) => {
            if (e.currentTarget.hasPointerCapture(e.pointerId)) setFromPointer(e)
          }}
        >
          <img src={src} alt="Seleccionar enfoque" draggable={false} className="block max-h-72 max-w-full rounded-md border" />
          <span
            className="pointer-events-none absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary/60 shadow-[0_0_0_2px_rgba(0,0,0,0.4)]"
            style={{ left: `${x}%`, top: `${y}%` }}
          />
        </div>
      </div>

      <Button type="button" variant="outline" size="sm" onClick={() => onChange(DEFAULT_FOCUS)}>
        <Crosshair className="mr-2 h-4 w-4" /> Centrar
      </Button>
    </div>
  )
}
