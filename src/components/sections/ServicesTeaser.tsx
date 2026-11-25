import { AnimateIn } from '@/components/ui/AnimateIn'
import Link from 'next/link'
import { services } from '@/lib/services-data'

export function ServicesTeaser() {
  return (
    <section className="py-24 md:py-32" aria-label="Nuestros servicios">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <AnimateIn>
          <div className="mb-16 md:mb-24 max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-[1px] bg-[#ffb690]/40" />
              <span className="font-body text-xs font-medium text-foreground/50 uppercase tracking-[0.2em]">
                Nuestros Servicios
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] tracking-tight mb-6 text-balance">
              Todo el software de tu negocio,{' '}
              <em className="font-display italic text-[#ffb690] font-light">un solo equipo.</em>
            </h2>

            <p className="font-body text-lg text-foreground/65 leading-relaxed font-light text-balance">
              Trabajamos con empresas y negocios de cualquier rubro. Partimos de lo que necesitás
              resolver y elegimos la solución adecuada: un sistema nuevo, una app, una integración o
              la modernización de lo que ya tenés.
            </p>
          </div>
        </AnimateIn>

        <div className="border-t border-white/[0.04]">
          {services.map((service, i) => (
            <AnimateIn key={service.slug} delay={i * 70}>
              <Link
                href={`/servicios/${service.slug}`}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-12 py-8 md:py-10 border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors duration-500"
              >
                <div className="flex items-baseline gap-6 md:gap-12 md:w-5/12 shrink-0">
                  <span className="font-body text-sm font-medium text-foreground/30 group-hover:text-[#ffb690] transition-colors duration-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-2xl md:text-4xl text-foreground/70 group-hover:text-foreground transition-colors duration-500">
                    {service.name}
                  </span>
                </div>
                <span className="font-body text-sm md:text-base text-foreground/50 leading-relaxed font-light pl-12 md:pl-0 md:flex-1 text-pretty">
                  {service.shortDescription}
                </span>
                <span className="hidden md:block shrink-0 font-body text-sm text-[#ffb690] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
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
