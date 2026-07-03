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
        title={
          <>
            Desarrollo a medida.{' '}
            <em className="font-display italic text-[#ffb690] font-light">Sin límites técnicos.</em>
          </>
        }
        subtitle="No trabajamos con plantillas ni soluciones enlatadas. Entendemos la complejidad de tu negocio y construimos la arquitectura exacta para escalarlo."
      />

      <CoreCapabilities />

      <EvolucionContinua />
      
      <CTABanner 
        headline="Tu proyecto merece el stack correcto." 
        ctaLabel="ASESORAMIENTO TÉCNICO"
        ctaHref={WHATSAPP_CTA_URL} 
      />
    </>
  )
}