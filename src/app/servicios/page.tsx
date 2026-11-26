import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { EvolucionContinua } from '@/components/sections/EvolucionContinua'
import { CTABanner } from '@/components/sections/CTABanner'
import { JsonLd } from '@/components/seo/JsonLd'
import { WHATSAPP_CTA_URL, SITE_URL } from '@/lib/constants'
import { services } from '@/lib/services-data'

const description =
  'Software a medida, desarrollo web, aplicaciones móviles, automatización e integraciones, modernización de sistemas y mantenimiento. Software Factory en Córdoba, Argentina.'

export const metadata: Metadata = {
  title: 'Servicios de desarrollo de software',
  description,
  alternates: { canonical: `${SITE_URL}/servicios` },
  openGraph: {
    title: 'Servicios de desarrollo de software | CodeTlon',
    description,
    url: `${SITE_URL}/servicios`,
  },
}

const catalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Servicios de CodeTlon Software Factory',
  url: `${SITE_URL}/servicios`,
  itemListElement: services.map((s, i) => ({
    '@type': 'Offer',
    position: i + 1,
    itemOffered: {
      '@type': 'Service',
      name: s.name,
      description: s.shortDescription,
      url: `${SITE_URL}/servicios/${s.slug}`,
      provider: { '@type': 'Organization', name: 'CodeTlon Software Factory', url: SITE_URL },
      areaServed: { '@type': 'Country', name: 'Argentina' },
    },
  })),
}

export default function ServiciosPage() {
  return (
    <>
      <JsonLd data={catalogSchema} />
      <PageHero
        title={
          <>
            Desarrollamos la tecnología que tu negocio{' '}
            <em className="font-display italic text-primary font-light">necesita.</em>
          </>
        }
        subtitle="Sistemas desde cero, sitios y plataformas web, apps móviles, automatizaciones y la modernización de lo que ya tenés. Trabajamos con empresas y negocios de cualquier rubro."
      />

      <ServicesGrid />

      <EvolucionContinua />

      <CTABanner
        headline="¿No sabés por dónde empezar? Te asesoramos."
        ctaLabel="ESCRIBINOS POR WHATSAPP"
        ctaHref={WHATSAPP_CTA_URL}
      />
    </>
  )
}
