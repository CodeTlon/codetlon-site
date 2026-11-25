import Link from 'next/link'
import { services } from '@/lib/services-data'
import { AnimateIn } from '@/components/ui/AnimateIn'

// Listado completo del catálogo en /servicios (fila: ícono + número + nombre + descripción).
export function ServicesGrid() {
  return (
    <section className="relative py-24" aria-labelledby="services-list-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimateIn className="max-w-2xl mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-[1px] bg-[#ffb690]/40" />
            <span className="font-body text-xs font-medium text-foreground/50 uppercase tracking-[0.2em]">
              Servicios
            </span>
          </div>
          <h2
            id="services-list-heading"
            className="font-display text-4xl md:text-5xl text-foreground leading-[1.1] tracking-tight mb-6 text-balance"
          >
            Seis servicios,{' '}
            <em className="font-display italic text-[#ffb690] font-light">un solo equipo.</em>
          </h2>
          <p className="font-body text-lg text-foreground/65 leading-relaxed font-light">
            Cada proyecto combina lo que haga falta. Elegí un servicio para ver qué incluye, o
            contanos tu situación y te recomendamos por dónde empezar.
          </p>
        </AnimateIn>

        <div className="flex flex-col">
          {services.map((service, i) => (
            <AnimateIn key={service.slug} delay={i * 80}>
              <Link
                href={`/servicios/${service.slug}`}
                className="group flex flex-col lg:flex-row items-start lg:items-center justify-between py-12 md:py-14 border-t border-white/10 gap-6 lg:gap-16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb690]/50"
              >
                <div className="flex items-start gap-6 w-full lg:w-5/12 shrink-0">
                  <div className="mt-2 shrink-0">
                    <service.icon
                      className="w-6 h-6 text-white/30 group-hover:text-[#ffb690] transition-colors duration-500"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body text-[10px] font-bold text-white/40 group-hover:text-[#ffb690] transition-colors duration-500 tracking-[0.2em] mb-4">
                      SERVICIO // {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl text-foreground tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                      {service.name}
                    </h3>
                  </div>
                </div>

                <div className="w-full lg:w-7/12 lg:pl-12 flex flex-col gap-4">
                  <p className="font-body text-lg sm:text-xl text-foreground/65 leading-relaxed font-light text-pretty group-hover:text-foreground/80 transition-colors duration-500">
                    {service.shortDescription}
                  </p>
                  <span className="font-body text-sm text-[#ffb690]/70 group-hover:text-[#ffb690] transition-colors duration-500">
                    Ver servicio →
                  </span>
                </div>
              </Link>
            </AnimateIn>
          ))}
          <div className="border-t border-white/10 w-full" />
        </div>
      </div>
    </section>
  )
}
