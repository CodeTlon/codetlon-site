import { Code2, RefreshCw, Zap } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

const differentials = [
  {
    icon: Zap,
    title: 'Desarrollo Nativo',
    description:
      'Construimos desde cero. Sin plantillas, sin gestores genéricos ni limitaciones. Código limpio y propietario que te da control absoluto.',
  },
  {
    icon: Code2,
    title: 'Arquitectura Premium',
    description:
      'Implementamos la misma tecnología que impulsa a las empresas líderes. Rendimiento superior, máxima seguridad y escalabilidad garantizada.',
  },
  {
    icon: RefreshCw,
    title: 'Evolución Continua',
    description:
      'El despliegue es solo el comienzo. Trabajamos como tu brazo tecnológico a largo plazo, asegurando que tu ecosistema itere junto con el mercado.',
  },
]

export function WhyCodeTlon() {
  return (
    // CAMBIO: bg-background (Verde Oscuro del Hero) en lugar de naranja
    <section className="relative pt-32 pb-24 md:pb-32 bg-background overflow-hidden" aria-label="Por qué CodeTlon">
      
      {/* Blend edge: Gradiente de Negro a Transparente */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />

      {/* Solo dejamos la textura de ruido muy sutil para que no parezca "plástico" */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimateIn delay={300} threshold={0.5} className="w-full">
          
          <div className="mb-16 md:mb-24 max-w-2xl mt-8">
            <div className="flex items-center gap-4 mb-8">
              {/* CAMBIO: Acentos en blanco/crema sobre el fondo oscuro */}
              <div className="w-8 h-[1px] bg-white/20" />
              <span className="font-body text-xs font-bold text-white/50 uppercase tracking-[0.2em]">
                Nuestra Diferencia
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight text-balance">
              No somos una agencia{' '}
              {/* CAMBIO: Volvemos al crema/naranja (#ffb690) para el italic, igual que en el Hero */}
              <em className="font-display italic text-[#ffb690] font-light drop-shadow-sm">tradicional.</em>
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