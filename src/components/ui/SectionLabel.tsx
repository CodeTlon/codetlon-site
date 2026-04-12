import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'font-body text-xs font-semibold uppercase tracking-[0.15em] text-secondary',
        className
      )}
    >
      {children}
    </span>
  )
}
