import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ServiceChipProps {
  level: string
  name: string
  slug: string
  className?: string
}

export function ServiceChip({ level, name, slug, className }: ServiceChipProps) {
  return (
    <Link
      href={`/servicios/${slug}`}
      className={cn(
        // 1. Fondo transparente, borde casi invisible y transición lenta (duration-500)
        'group relative flex items-center gap-3 px-5 py-3 rounded-full border border-white/[0.06] bg-transparent backdrop-blur-sm transition-all duration-500 ease-out',
        // 2. Hover: Elevación sutil, borde que se enciende y apenas un tinte de fondo
        'hover:border-[#ffb690]/40 hover:bg-[#ffb690]/[0.02] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,182,144,0.04)]',
        className
      )}
    >
      {/* 3. Nivel: Más pequeño, mucho espaciado (tracking-widest) */}
      <span className="font-body text-[10px] font-semibold text-foreground/40 uppercase tracking-widest group-hover:text-[#ffb690] transition-colors duration-500">
        {level}
      </span>
      
      {/* 4. Divisor: Una línea vertical microscópica entre el nivel y el nombre */}
      <span className="w-px h-3 bg-white/10 group-hover:bg-[#ffb690]/30 transition-colors duration-500" />
      
      {/* 5. Nombre: Fuente ligera (font-light) que se ilumina al pasar el mouse */}
      <span className="font-body text-sm font-light text-foreground/60 group-hover:text-foreground transition-colors duration-500">
        {name}
      </span>
    </Link>
  )
}