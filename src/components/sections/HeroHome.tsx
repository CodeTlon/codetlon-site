import Link from 'next/link'

export function HeroHome() {
  return (
    // min-h-[90vh] en móvil evita problemas con la barra de navegación del navegador, y min-h-screen en desktop
    <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center overflow-hidden bg-background">
      
      {/* Textura de ruido sutil para que el fondo no sea plano */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-4xl">

          {/* Título: Escalado responsivo masivo y text-balance */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem] text-foreground leading-[1.05] tracking-tight mb-8 text-balance anim-fade-up anim-d2">
            Construimos el digital que tu negocio{' '}
            <em className="font-display italic text-[#ffb690] font-light pr-2">merece.</em>
          </h1>

          {/* Subtítulo: text-pretty para evitar viudas (palabras solas al final) y mejor color */}
          <p className="font-body text-lg sm:text-xl text-foreground/50 leading-relaxed mb-14 max-w-2xl text-pretty font-light anim-fade-up anim-d3">
            Desarrollamos ecosistemas digitales a medida. Desde plataformas complejas hasta experiencias
            web inmersivas, construimos la tecnología que impulsa tu visión.
          </p>

          {/* Botones - Rediseñados al estilo Tech/Pro */}
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-6 anim-fade-up anim-d4">
            
            {/* Botón Primario */}
            <Link
              href="/contacto"
              className="group relative flex items-center justify-center gap-6 px-8 py-5 bg-[#ffb690] text-[#0e1516] overflow-hidden shadow-2xl shadow-[#ffb690]/5 w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              
              <span className="relative z-10 font-body text-[13px] font-bold uppercase tracking-[0.25em]">
                Iniciar proyecto
              </span>
              
            </Link>

            {/* Botón Secundario */}
            <Link
              href="/servicios"
              className="group relative flex items-center justify-center gap-4 px-8 py-5 border border-white/10 text-white hover:bg-white/5 transition-colors duration-500 w-full sm:w-auto"
            >
              <span className="font-body text-[13px] font-bold uppercase tracking-[0.25em] text-foreground/70 group-hover:text-foreground transition-colors duration-500">
                Explorar capacidades
              </span>
            </Link>

          </div>
        </div>
      </div>
    </section>
  )
}