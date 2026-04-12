import { cn } from '@/lib/utils'
import Link from 'next/link'
import { type ButtonHTMLAttributes } from 'react'

interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  size?: 'sm' | 'md' | 'lg'
}

export function GhostButton({ href, children, className, size = 'md', ...props }: GhostButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center font-body font-medium rounded-full border transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50',
    'border-white/20 text-foreground',
    {
      'px-4 py-2 text-sm': size === 'sm',
      'px-6 py-3 text-base': size === 'md',
      'px-8 py-4 text-lg': size === 'lg',
    },
    className
  )

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    )
  }

  return (
    <button className={base} {...props}>
      {children}
    </button>
  )
}
