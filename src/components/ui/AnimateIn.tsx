'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AnimateInProps {
  children: ReactNode
  className?: string
  /** Milliseconds to wait after element enters viewport */
  delay?: number
  variant?: 'up' | 'left' | 'fade'
  /** IntersectionObserver threshold (0–1). Default: 0.08 */
  threshold?: number
}

export function AnimateIn({
  children,
  className,
  delay = 0,
  variant = 'up',
  threshold = 0.08,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let timer: ReturnType<typeof setTimeout>

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => {
            el.classList.add('in-view')
          }, delay)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [delay, threshold])

  return (
    <div
      ref={ref}
      className={cn(
        variant === 'up' && 'reveal',
        variant === 'left' && 'reveal-left',
        variant === 'fade' && 'reveal-fade',
        className
      )}
    >
      {children}
    </div>
  )
}
