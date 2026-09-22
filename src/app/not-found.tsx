import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Página no encontrada',
  description: 'La página que buscás no existe o fue movida. Volvé al inicio o explorá nuestros servicios.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <Image
        src="/logos/codetlon-crema.png"
        alt="CodeTlon"
        width={140}
        height={36}
        className="mb-10 h-auto w-28 opacity-90 sm:w-32"
      />

      <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-[#ffb690]/70 mb-4">
        Error 404
      </span>

      <h1 className="font-display display-thin text-4xl text-foreground sm:text-5xl">
        Esta página no existe.
      </h1>
      <p className="font-body mt-4 mb-10 max-w-md leading-relaxed text-foreground/65">
        Puede que el enlace esté roto o que la página se haya movido. Volvé al inicio o elegí una sección desde acá.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full bg-[#ffb690] px-6 py-3 font-body text-sm font-medium text-[#0e1516] transition-all duration-300 hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb690]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Volver al inicio
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <Link
          href="/contacto"
          className="rounded-full border border-white/10 px-6 py-3 font-body text-sm font-medium text-foreground/80 transition-all duration-300 hover:text-foreground hover:border-white/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb690]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Hablar con nosotros
        </Link>
      </div>

      <nav aria-label="Secciones del sitio" className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-body text-xs uppercase tracking-[0.15em] text-foreground/40 transition-colors duration-300 hover:text-[#ffb690]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
