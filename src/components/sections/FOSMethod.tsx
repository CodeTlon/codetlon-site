import { AnimateIn } from '@/components/ui/AnimateIn'

const phases = [
  {
    number: '01',
    title: 'Descubrimiento',
    description:
      'Entendemos la visión y el contexto de tu negocio para trazar una hoja de ruta estratégica, sin suposiciones.',
  },
  {
    number: '02',
    title: 'Propuesta',
    description:
      'Estructuramos el alcance, la tecnología y los objetivos. Transparencia total antes de escribir la primera línea de código.',
  },
  {
    number: '03',
    title: 'Diseño',
    description:
      'Creamos interfaces funcionales y estéticas que conectan con tu audiencia y elevan el estándar de tu marca.',
  },
  {
    number: '04',
    title: 'Desarrollo',
    description:
      'Construimos sistemas robustos y escalables, aplicando los estándares de calidad más exigentes de la industria.',
  },
  {
    number: '05',
    title: 'Revisión',
    description:
      'Sometemos cada entrega a rigurosos controles de calidad y rendimiento. Nada llega a tus manos sin ser probado.',
  },
  {
    number: '06',
    title: 'Lanzamiento',
    description:
      'Desplegamos el producto final de manera segura, acompañando la transición y el crecimiento continuo.',
  },
]

export function FOSMethod() {
  return (
    <section className="relative py-32 bg-[#050505]" aria-label="FOS Method">
      {/* Subtle central aura */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[#ffb690] opacity-[0.02] rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        <AnimateIn>
          <div className="mb-20 max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-[1px] bg-[#ffb690]/60" />
              <span className="font-body text-xs font-medium text-[#ffb690]/80 uppercase tracking-[0.2em]">
                Metodología Propia
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground mb-6 tracking-tight">
              El sistema{' '}
              <em className="font-display italic text-[#ffb690] font-light">FOS.</em>
            </h2>
            <p className="font-body text-lg text-foreground/40 leading-relaxed font-light text-balance">
              Factory Operating System. El proceso que seguimos en cada proyecto, sin excepciones.
              Predecible, documentado y orientado a resultados.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-0">
          {phases.map((phase, i) => (
            <AnimateIn key={phase.number} delay={i * 80}>
              <div className="group border-t border-[#ffb690]/10 pt-8 pb-12 hover:bg-white/[0.01] transition-colors duration-500 px-2">
                <span className="font-display italic text-5xl text-[#ffb690]/30 block mb-6 group-hover:text-[#ffb690] transition-colors duration-500">
                  {phase.number}
                </span>
                <h3 className="font-body text-xl font-medium text-foreground mb-3">
                  {phase.title}
                </h3>
                <p className="font-body text-sm font-light text-foreground/50 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
