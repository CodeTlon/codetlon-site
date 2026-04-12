import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-2xl p-6 border border-white/8',
        className
      )}
    >
      {children}
    </div>
  )
}
