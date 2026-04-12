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
        'flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-surface-container hover:border-primary/40 hover:bg-surface-high transition-all group',
        className
      )}
    >
      <span className="font-body text-xs font-bold text-primary uppercase tracking-wider">
        {level}
      </span>
      <span className="font-body text-sm text-foreground/80 group-hover:text-foreground transition-colors">
        {name}
      </span>
    </Link>
  )
}
