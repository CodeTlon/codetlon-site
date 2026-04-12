import { services } from '@/lib/services-data'
import { ServiceChip } from '@/components/ui/ServiceChip'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GhostButton } from '@/components/ui/GhostButton'

export function ServicesTeaser() {
  return (
    <section className="py-20 bg-background" aria-label="Servicios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
          <div>
            <SectionLabel className="mb-3 block">9 niveles de servicio</SectionLabel>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground">
              Encontrá el nivel para tu proyecto
            </h2>
          </div>
          <GhostButton href="/servicios" size="sm">
            Ver todos →
          </GhostButton>
        </div>

        <div className="flex flex-wrap gap-3">
          {services.map((s) => (
            <ServiceChip key={s.slug} level={s.level} name={s.name} slug={s.slug} />
          ))}
        </div>
      </div>
    </section>
  )
}
