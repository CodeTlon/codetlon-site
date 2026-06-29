import Link from 'next/link'
import { ParticleField } from '@/components/ui/ParticleField'

export function HeroHome() {
  return (
    // min-h-[90vh] en móvil evita problemas con la barra del navegador; min-h-screen en desktop
    <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center overflow-hidden bg-background">

      {/* La constelación es la identidad visual, no decoración: ocupa todo el hero. */}
      <ParticleField className="absolute inset-0 z-0 h-full w-full pointer-events-none" />

      {/* Desvanecido lateral para que el texto respire sobre las partículas. */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-background via-background/70 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl">

          {/* Eyebrow kicker — bandera tonal del sistema */}
          <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-[#ffb690] mb-8 anim-fade-up anim-d1">
            Software Factory · Córdoba, Argentina
          </p>

          {/* Display ultra-fino: la firma "etched in light" sobre el void */}
          <h1 className="font-display display-thin text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem] text-foreground leading-[1.0] mb-8 text-balance anim-fade-up anim-d2">
            Construimos el software que tu negocio{' '}
            <span className="text-[#ffb690]">merece.</span>
          </h1>

          {/* Subtítulo — body abierto para legibilidad sobre el void */}
          <p className="font-body text-lg sm:text-xl text-foreground/55 leading-relaxed mb-14 max-w-2xl text-pretty font-light tracking-[0.01em] anim-fade-up anim-d3">
            Desarrollamos ecosistemas digitales a medida. Desde plataformas complejas hasta experiencias
            web inmersivas, construimos la tecnología que impulsa tu visión.
          </p>

          {/* CTAs — geometría pill del sistema, peach como único relleno */}
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 anim-fade-up anim-d4">

            <Link
              href="/contacto"
              className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#ffb690] text-[#552100] overflow-hidden transition-opacity hover:opacity-90 w-full sm:w-auto"
            >
              <span className="relative z-10 font-body text-[13px] font-bold uppercase tracking-[0.2em]">
                Iniciar proyecto
              </span>
            </Link>

            <Link
              href="/servicios"
              className="group flex items-center justify-center gap-4 px-8 py-4 rounded-full border border-white/15 text-foreground/70 hover:text-foreground hover:border-white/30 transition-colors duration-500 w-full sm:w-auto"
            >
              <span className="font-body text-[13px] font-bold uppercase tracking-[0.2em]">
                Explorar capacidades
              </span>
            </Link>

          </div>
        </div>
      </div>
    </section>
  )
}
