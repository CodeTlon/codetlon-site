import Link from 'next/link'
import { AnimateIn } from '@/components/ui/AnimateIn'

interface CTABannerProps {
  headline?: string
  ctaLabel?: string
  ctaHref?: string
}

export function CTABanner({
  headline = 'Tu próximo gran lanzamiento empieza acá.',
  ctaLabel = 'INICIAR PROYECTO',
  ctaHref = '/contacto',
}: CTABannerProps) {
  return (
    <section
      className="relative py-16 md:py-20 flex items-center justify-center bg-[#ffb690] overflow-hidden"
      aria-label="Llamado a la acción"
    >
      {/* Textura de ruido sutil para dar profundidad al naranja */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      {/* Brillo interno para que el naranja no sea plano */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          <AnimateIn variant="fade" className="w-full lg:max-w-2xl text-center lg:text-left">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#0e1516] leading-[1.05] tracking-tight text-balance">
              {headline}
            </h2>
          </AnimateIn>

          <AnimateIn delay={150} className="shrink-0 w-full sm:w-auto">
            {/* Botón adaptado al estilo Tech/Pro del Hero */}
            <Link
              href={ctaHref}
              className="group relative flex items-center justify-center gap-8 px-8 py-5 bg-[#0e1516] text-[#ffb690] overflow-hidden w-full sm:w-auto shadow-2xl shadow-black/10"
            >
              {/* Animación de fondo (swipe hacia arriba con una capa sutil clara) */}
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              
              <span className="relative z-10 font-body text-[13px] font-bold uppercase tracking-[0.25em]">
                {ctaLabel}
              </span>
              
            </Link>
          </AnimateIn>
          
        </div>
      </div>
    </section>
  )
}