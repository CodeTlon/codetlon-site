import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { EvolucionContinua } from '@/components/sections/EvolucionContinua'
import { CTABanner } from '@/components/sections/CTABanner'
import { WHATSAPP_CTA_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Servicios de desarrollo web | CodeTlon — 9 niveles',
  description:
    'Desde landings de alta conversión hasta sitios con IA integrada. Elegí el nivel que necesita tu negocio. Sin precios fijos: cada proyecto es único.',
  alternates: { canonical: 'https://codetlon.com/servicios' },
}

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        badge="Soluciones digitales"
        title="9 niveles. Un mismo estándar."
        subtitle="No existe una sola forma de hacer presencia digital. Cada negocio tiene un punto de partida diferente."
      />
      <ServicesGrid />

      {/* Hint de nivel */}
      <section className="py-12 bg-surface-low border-y border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl text-foreground mb-1">
              ¿No sabés qué nivel necesitás?
            </p>
            <p className="font-body text-sm text-foreground/50">
              Contanos de tu proyecto y te asesoramos sin compromiso.
            </p>
          </div>
          <a
            href={WHATSAPP_CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-primary hover:underline"
          >
            Consultar por WhatsApp →
          </a>
        </div>
      </section>

      <EvolucionContinua />
      <CTABanner headline="Tu proyecto merece el stack correcto." />
    </>
  )
}
