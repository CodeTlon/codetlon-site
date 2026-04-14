import { services } from '@/lib/services-data'
import { AnimateIn } from '@/components/ui/AnimateIn'
import Link from 'next/link'

export function ServicesGrid() {
  return (
    <section className="bg-background py-8" aria-label="Todos los servicios">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-t border-white/[0.04]">
          {services.map((s, i) => (
            <AnimateIn key={s.slug} delay={i * 45}>
              <Link
                href={`/servicios/${s.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 md:py-10 border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors duration-500"
              >
                <div className="flex items-baseline gap-6 md:gap-10">
                  <span className="font-body text-xs font-medium text-[#ffb690]/40 group-hover:text-[#ffb690] transition-colors duration-500 uppercase tracking-[0.15em] w-8 shrink-0">
                    {s.level}
                  </span>
                  <span className="font-display text-xl md:text-3xl text-foreground/70 group-hover:text-foreground transition-colors duration-500">
                    {s.name}
                  </span>
                </div>
                <div className="flex items-center gap-8 mt-3 sm:mt-0 ml-14 sm:ml-0">
                  <span className="font-body text-xs text-foreground/25 hidden md:block">
                    {s.techStack.slice(0, 3).join(' · ')}
                  </span>
                  <span className="font-body text-sm text-[#ffb690] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    Ver servicio →
                  </span>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
