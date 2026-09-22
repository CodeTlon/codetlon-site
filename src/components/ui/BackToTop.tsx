'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

// Botón flotante scroll-to-top — aparece pasado ~1 viewport de scroll.
// Sin deps nuevas, respeta prefers-reduced-motion (scroll instantáneo si el usuario lo pide).
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver arriba"
      tabIndex={visible ? 0 : -1}
      className={cn(
        'fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-background/90 backdrop-blur-md text-foreground/60 shadow-lg transition-all duration-300',
        'hover:text-[#ffb690] hover:border-[#ffb690]/40 active:scale-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb690]/50',
        'md:bottom-8 md:right-8',
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
      )}
    >
      <ArrowUp size={18} strokeWidth={1.75} />
    </button>
  )
}
