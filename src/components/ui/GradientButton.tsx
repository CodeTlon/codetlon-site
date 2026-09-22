import { cn } from '@/lib/utils'
import Link from 'next/link'
import { type ButtonHTMLAttributes } from 'react'

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  size?: 'sm' | 'md' | 'lg'
}

export function GradientButton({ href, children, className, size = 'md', ...props }: GradientButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center font-body font-semibold rounded-full transition-all duration-300 hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
    {
      'px-4 py-2 text-sm': size === 'sm',
      'px-6 py-3 text-base': size === 'md',
      'px-8 py-4 text-lg': size === 'lg',
    },
    'gradient-cta text-[#552100]',
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
