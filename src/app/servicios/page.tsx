import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { CoreCapabilities } from '@/components/sections/CoreCapabilities'
import { EvolucionContinua } from '@/components/sections/EvolucionContinua'
import { CTABanner } from '@/components/sections/CTABanner'
import { WHATSAPP_CTA_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Capacidades Tecnológicas | CodeTlon',
  description:
    'Desarrollo a medida. Desde plataformas complejas hasta arquitecturas escalables en la nube. Construimos la tecnología que tu visión demanda.',
  alternates: { canonical: 'https://codetlon.com/servicios' },
}

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        badge="Nuestras Capacidades"
        title={
          <>
            Desarrollo a medida.{' '}
            <em className="font-display italic text-[#ffb690] font-light">Sin límites técnicos.</em>
          </>
        }
        subtitle="No trabajamos con plantillas ni soluciones enlatadas. Entendemos la complejidad de tu negocio y construimos la arquitectura exacta para escalarlo."
      />

      {/* Todo esto transcurre en el fondo Petróleo (bg-background) */}
      <CoreCapabilities />

      {/* Puente Narrativo: Acá ocurre la bajada hacia la oscuridad total (Negro) */}
      <section className="relative py-24 bg-[#050505] overflow-hidden">
        
        {/* Fundido de Petróleo (background) a Negro (#050505) */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      </section>

      {/* A partir de acá, la página ya es 100% Negra */}
      <EvolucionContinua />
      
      <CTABanner 
        headline="Tu proyecto merece el stack correcto." 
        ctaLabel="ASESORAMIENTO TÉCNICO"
        ctaHref={WHATSAPP_CTA_URL} 
      />
    </>
  )
}