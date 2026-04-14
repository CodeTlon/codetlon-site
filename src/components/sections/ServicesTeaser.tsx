import { GhostButton } from '@/components/ui/GhostButton'
import { AnimateIn } from '@/components/ui/AnimateIn'
import Link from 'next/link'

const capabilities = [
  { number: '01', name: 'Desarrollo a Medida', slug: 'servicios' },
  { number: '02', name: 'Diseño de Interfaces (UX/UI)', slug: 'servicios' },
  { number: '03', name: 'Arquitectura Escalable', slug: 'servicios' },
  { number: '04', name: 'Ecosistemas Web', slug: 'servicios' },
]

export function ServicesTeaser() {
  return (
    <section className="bg-[#050505] py-24 md:py-32" aria-label="Nuestras Capacidades">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <AnimateIn>
          <div className="mb-16 md:mb-24 max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-[1px] bg-[#ffb690]/40" />
              <span className="font-body text-xs font-medium text-foreground/50 uppercase tracking-[0.2em]">
                Nuestras Capacidades
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] tracking-tight mb-6 text-balance">
              El ecosistema exacto que tu idea{' '}
              <em className="font-display italic text-[#ffb690] font-light">necesita.</em>
            </h2>

            <p className="font-body text-lg text-foreground/40 leading-relaxed font-light text-balance">
              No trabajamos con plantillas cerradas. Analizamos el objetivo de tu negocio y combinamos
              nuestras herramientas para construir la solución definitiva.
            </p>
          </div>
        </AnimateIn>

        <div className="border-t border-white/[0.04]">
          {capabilities.map((cap, i) => (
            <AnimateIn key={cap.number} delay={i * 70}>
              <Link
                href={`/${cap.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 md:py-10 border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors duration-500"
              >
                <div className="flex items-baseline gap-6 md:gap-12">
                  <span className="font-body text-sm font-medium text-foreground/30 group-hover:text-[#ffb690] transition-colors duration-500">
                    {cap.number}
                  </span>
                  <span className="font-display text-2xl md:text-4xl text-foreground/70 group-hover:text-foreground transition-colors duration-500">
                    {cap.name}
                  </span>
                </div>
                <span className="hidden sm:block font-body text-sm text-[#ffb690] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  Saber más →
                </span>
              </Link>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
