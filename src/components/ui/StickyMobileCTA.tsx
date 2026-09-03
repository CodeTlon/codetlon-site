'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

// Barra fija bottom, solo mobile — CTA directo a Contacto.
// Oculta en /contacto y /gracias (evita pedir lo mismo que ya se está haciendo o ya se hizo).
const HIDDEN_ON = ['/contacto', '/gracias']

export function StickyMobileCTA() {
  const pathname = usePathname()

  if (HIDDEN_ON.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-white/[0.06] bg-background/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <Link
        href="/contacto"
        className="group flex items-center justify-center gap-2 px-6 py-4 font-body text-[13px] font-bold uppercase tracking-[0.2em] text-[#0e1516] bg-[#ffb690] transition-opacity active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb690]/50"
      >
        Iniciar proyecto
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  )
}
