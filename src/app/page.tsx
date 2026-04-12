import { HeroHome } from '@/components/sections/HeroHome'
import { LogoStrip } from '@/components/sections/LogoStrip'
import { ServicesTeaser } from '@/components/sections/ServicesTeaser'
import { FOSMethod } from '@/components/sections/FOSMethod'
import { MetricsStrip } from '@/components/sections/MetricsStrip'
import { WhyCodeTlon } from '@/components/sections/WhyCodeTlon'
import { EvolucionContinua } from '@/components/sections/EvolucionContinua'
import { CTABanner } from '@/components/sections/CTABanner'

export default function Home() {
  return (
    <>
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
