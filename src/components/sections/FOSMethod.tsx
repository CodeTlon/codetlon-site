import { SectionLabel } from '@/components/ui/SectionLabel'

const phases = [
  {
    number: '01',
    title: 'Descubrimiento',
    description: 'Analizamos tu negocio, objetivos y contexto. Sin plantillas, sin genéricos.',
  },
  {
    number: '02',
    title: 'Propuesta',
    description: 'Definimos el nivel de servicio, stack y alcance. Todo documentado antes de arrancar.',
  },
  {
    number: '03',
    title: 'Diseño',
    description: 'Identidad visual, sistema de colores y tipografías. Tu marca como guía.',
  },
  {
    number: '04',
    title: 'Desarrollo',
    description: 'Código modular, testeado y commiteado con conventional commits.',
  },
  {
    number: '05',
    title: 'Revisión',
    description: 'Tests E2E, Lighthouse, ajustes. Nada llega a producción sin pasar el filtro.',
  },
  {
    number: '06',
    title: 'Lanzamiento',
    description: 'Deploy en producción, documentación entregada. El inicio, no el final.',
  },
]

export function FOSMethod() {
  return (
    <section className="py-20 bg-surface-low" aria-label="FOS Method">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <SectionLabel className="mb-3 block">Metodología propia</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
            El FOS Method
          </h2>
          <p className="font-body text-foreground/50 max-w-xl leading-relaxed">
            FOS: Factory Operating System. El proceso que seguimos en cada proyecto, sin excepciones.
            Predecible, documentado y orientado a resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((phase) => (
            <div
              key={phase.number}
              className="bg-surface-container rounded-2xl p-6 border border-white/6 hover:border-primary/20 transition-colors"
            >
              <span className="font-display text-5xl font-bold text-primary/20 leading-none block mb-4">
                {phase.number}
              </span>
              <h3 className="font-display text-xl text-foreground mb-2">{phase.title}</h3>
              <p className="font-body text-sm text-foreground/50 leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
