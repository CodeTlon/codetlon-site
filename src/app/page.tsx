import type { Metadata } from 'next'
import { HeroHome } from '@/components/sections/HeroHome'
import { LogoStrip } from '@/components/sections/LogoStrip'
import { ServicesTeaser } from '@/components/sections/ServicesTeaser'
import { FOSMethod } from '@/components/sections/FOSMethod'
import { MetricsStrip } from '@/components/sections/MetricsStrip'
import { WhyCodeTlon } from '@/components/sections/WhyCodeTlon'
import { EvolucionContinua } from '@/components/sections/EvolucionContinua'
import { CTABanner } from '@/components/sections/CTABanner'
import { JsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'CodeTlon | Software Factory en Córdoba, Argentina',
  description:
    'Desarrollamos sitios, ecommerce, dashboards y automatizaciones. 9 niveles de servicio, stack moderno, metodología propia. Basados en Córdoba.',
  alternates: { canonical: 'https://codetlon.com' },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'CodeTlon Software Factory',
  description:
    'Software factory en Córdoba, Argentina. Desarrollamos sitios web, ecommerce, dashboards y automatizaciones con stack moderno y metodología propia.',
  url: 'https://codetlon.com',
  logo: 'https://codetlon.com/images/logo.png',
  email: 'hola@codetlon.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Córdoba',
    addressRegion: 'Córdoba',
    addressCountry: 'AR',
  },
  sameAs: [
    'https://www.instagram.com/codetlon/',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Argentina',
  },
}

export default function Home() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <HeroHome />
      <LogoStrip />
      <ServicesTeaser />
      <FOSMethod />
      <MetricsStrip />
      <WhyCodeTlon />
      <EvolucionContinua />
      <CTABanner />
    </>
  )
}
