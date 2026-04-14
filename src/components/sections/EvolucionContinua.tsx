import { AnimateIn } from '@/components/ui/AnimateIn'

const items = [
  'Monitoreo de uptime y rendimiento continuo.',
  'Actualizaciones proactivas y parches de seguridad.',
  'Iteraciones basadas en métricas de usuario reales.',
  'Acompañamiento en la escalabilidad técnica.',
]

export function EvolucionContinua() {
  return (
    // CAMBIO: Fondo negro sólido (#050505), igual que el final de la sección anterior
    <section className="relative pb-32 pt-16 bg-[#050505] overflow-hidden" aria-label="Plan de Evolución Continua">
      
      {/* ELIMINADO: Ya no necesitamos el gradiente porque venimos de un fondo negro puro */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">

          <AnimateIn delay={150} threshold={0.3} className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-[1px] bg-[#ffb690]/30" />
              <span className="font-body text-xs font-medium text-foreground/40 uppercase tracking-[0.2em]">
                Post-Lanzamiento
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground mb-6 tracking-tight">
              Evolución{' '}
              <em className="font-display italic text-[#ffb690] font-light">Continua.</em>
            </h2>
            <p className="font-body text-lg text-foreground/40 leading-relaxed font-light max-w-sm">
              El despliegue es solo el día uno. Tu ecosistema digital crece, muta y se adapta junto
              con las demandas de tu mercado.
            </p>
          </AnimateIn>

          <AnimateIn delay={300} threshold={0.3} className="lg:col-span-7 lg:col-start-6 mt-8 lg:mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
              {items.map((item, i) => (
                <div key={i} className="flex flex-col gap-3 group">
                  <span className="font-body text-xs font-medium text-[#ffb690]/20 uppercase tracking-[0.1em] group-hover:text-[#ffb690] transition-colors duration-500">
                    Soporte // 0{i + 1}
                  </span>
                  <span className="font-body text-base text-foreground/70 leading-relaxed font-light">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  )
}