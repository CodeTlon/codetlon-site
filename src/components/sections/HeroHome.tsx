import Link from 'next/link'
import { ParticleField } from '@/components/ui/ParticleField'
import { ShareButton } from '@/components/ui/ShareButton'

export function HeroHome() {
  return (
    // min-h-[90vh] en móvil evita problemas con la barra del navegador; min-h-screen en desktop
    <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center overflow-hidden">

      {/* La constelación es la identidad visual, no decoración: ocupa todo el hero. */}
      <ParticleField className="absolute inset-0 z-0 h-full w-full pointer-events-none" />

      {/* Desvanecido lateral para que el texto respire sobre las partículas. */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-background via-background/70 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl">

          {/* Display ultra-fino: la firma "etched in light" sobre el void */}
          <h1 className="font-display display-thin text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem] text-foreground leading-[1.0] mb-8 text-balance anim-fade-up anim-d1">
            Desarrollamos la tecnología que tu negocio{' '}
            <span className="text-[#ffb690]">necesita.</span>
          </h1>

          {/* Subtítulo — body abierto para legibilidad sobre el void */}
          <p className="font-body text-lg sm:text-xl text-foreground/70 leading-relaxed mb-14 max-w-2xl text-pretty font-light tracking-[0.01em] anim-fade-up anim-d2">
            Impulsamos el crecimiento de tu negocio con desarrollo de software a medida, aplicaciones
            móviles y automatización de procesos.
          </p>

          {/* CTAs — geometría pill del sistema, peach como único relleno */}
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 anim-fade-up anim-d4">

            <Link
              href="/contacto"
              className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#ffb690] text-[#552100] overflow-hidden transition-all duration-300 hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb690]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background w-full sm:w-auto"
            >
              <span className="relative z-10 font-body text-[13px] font-bold uppercase tracking-[0.2em]">
                Iniciar proyecto
              </span>
            </Link>

            <Link
              href="/servicios"
              className="group flex items-center justify-center gap-4 px-8 py-4 rounded-full border border-white/15 text-foreground/70 hover:text-foreground hover:border-white/30 transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb690]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background w-full sm:w-auto"
            >
              <span className="font-body text-[13px] font-bold uppercase tracking-[0.2em]">
                Ver servicios
              </span>
            </Link>

          </div>

          <div className="mt-8 anim-fade-up anim-d5">
            <ShareButton
              title="CodeTlon | Software Factory en Córdoba, Argentina"
              text="Software a medida, desarrollo web, apps móviles y automatización de procesos para empresas y negocios. Córdoba, Argentina."
            />
          </div>
        </div>
      </div>
    </section>
  )
}
