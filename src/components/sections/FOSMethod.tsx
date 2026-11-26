import { AnimateIn } from '@/components/ui/AnimateIn'
import { fosPhases } from '@/lib/fos-phases'

export function FOSMethod() {
  return (
    <section className="relative py-32" aria-label="FOS Method">

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        <AnimateIn>
          <div className="mb-20 max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-primary/60" />
              <span className="font-body text-xs font-medium text-primary/80 uppercase tracking-[0.2em]">
                Metodología Propia
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground mb-6 tracking-tight">
              El sistema{' '}
              <em className="font-display italic text-primary font-light">FOS.</em>
            </h2>
            <p className="font-body text-lg text-foreground/65 leading-relaxed font-light text-balance">
              Factory Operating System. El proceso que seguimos en cada proyecto, sin excepciones.
              Predecible, documentado y orientado a resultados.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-0">
          {fosPhases.map((phase, i) => (
            <AnimateIn key={phase.number} delay={i * 80}>
              <div className="group border-t border-primary/10 pt-8 pb-12 hover:bg-white/1 transition-colors duration-500 px-2">
                <span className="font-display italic text-5xl text-primary/30 block mb-6 group-hover:text-primary transition-colors duration-500">
                  {phase.number}
                </span>
                <h3 className="font-body text-xl font-medium text-foreground mb-3">
                  {phase.title}
                </h3>
                <p className="font-body text-sm font-light text-foreground/65 leading-relaxed">
                  {phase.summary}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
