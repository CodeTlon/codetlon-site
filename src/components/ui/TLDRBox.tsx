import { cn } from '@/lib/utils'

interface TLDRBoxProps {
  points: string[]
  className?: string
  label?: string
}

// Caja de "puntos clave" arriba de contenido largo — intención de búsqueda
// resuelta en 3-5 bullets antes de que el usuario tenga que leer todo.
export function TLDRBox({ points, className, label = 'En resumen' }: TLDRBoxProps) {
  if (points.length === 0) return null

  return (
    <div
      className={cn(
        'rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-6 sm:px-8 sm:py-7',
        className
      )}
    >
      <span className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-[#ffb690]/80 block mb-4">
        {label}
      </span>
      <ul className="flex flex-col gap-3">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <span className="text-[#ffb690]/50 mt-1 shrink-0 text-xs">—</span>
            <span className="font-body text-sm sm:text-base text-foreground/75 leading-relaxed font-light">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
