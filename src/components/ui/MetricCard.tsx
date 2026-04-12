import { cn } from '@/lib/utils'

interface MetricCardProps {
  value: string
  label: string
  className?: string
}

export function MetricCard({ value, label, className }: MetricCardProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="font-display text-4xl font-bold text-primary leading-none">
        {value}
      </span>
      <span className="font-body text-sm text-foreground/60 leading-snug max-w-[180px]">
        {label}
      </span>
    </div>
  )
}
