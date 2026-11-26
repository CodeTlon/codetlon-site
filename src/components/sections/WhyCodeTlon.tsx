import { Code2, RefreshCw, Zap } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

const differentials = [
  {
    icon: Zap,
    title: 'Hecho a medida',
    description:
      'Construimos sobre tus procesos reales, sin plantillas ni constructores genéricos. El código queda en tu propiedad y lo podés seguir manteniendo con quien quieras.',
  },
  {
    icon: Code2,
    title: 'Tecnología adecuada',
    description:
      'Elegimos la tecnología según el problema, no al revés: web, mobile, backend o automatización. Priorizamos seguridad, rendimiento y que el sistema pueda crecer con tu negocio.',
  },
  {
    icon: RefreshCw,
    title: 'Evolución Continua',
    description:
      'El lanzamiento es solo el comienzo. Acompañamos tu sistema con mantenimiento, soporte y mejoras para que evolucione junto con tu negocio.',
  },
]

export function WhyCodeTlon() {
  return (
    <section className="relative pt-32 pb-24 md:pb-32 overflow-hidden" aria-label="Por qué CodeTlon">
      
      {/* Solo dejamos la textura de ruido muy sutil para que no parezca "plástico" */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url("/noise.svg")' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimateIn delay={300} threshold={0.5} className="w-full">
          
          <div className="mb-16 md:mb-24 max-w-2xl mt-8">
            <div className="flex items-center gap-4 mb-8">
              {/* CAMBIO: Acentos en blanco/crema sobre el fondo oscuro */}
              <div className="w-8 h-px bg-white/20" />
              <span className="font-body text-xs font-bold text-white/50 uppercase tracking-[0.2em]">
                Nuestra Diferencia
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl md:leading-[var(--text-5xl--line-height)] lg:text-6xl lg:leading-[var(--text-6xl--line-height)] text-white leading-[1.1] tracking-tight text-balance">
              Por qué elegir{' '}
              {/* CAMBIO: Volvemos al crema/naranja (#ffb690) para el italic, igual que en el Hero */}
              <em className="font-display italic text-primary font-light drop-shadow-xs">CodeTlon.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
            {differentials.map((d) => (
              <div key={d.title} className="group flex flex-col items-start border-t border-white/10 pt-8">
                <div className="mb-8 p-4 rounded-full border border-white/10 bg-white/5 group-hover:bg-white transition-colors duration-500">
                  <d.icon
                    strokeWidth={1.5}
                    className="w-8 h-8 text-white group-hover:text-background transition-colors duration-500"
                  />
                </div>
                <h3 className="font-display text-2xl text-white mb-4">{d.title}</h3>
                <p className="font-body text-sm font-medium text-white/60 leading-relaxed">
                  {d.description}
                </p>
              </div>
            ))}
          </div>
          
        </AnimateIn>

      </div>
    </section>
  )
}