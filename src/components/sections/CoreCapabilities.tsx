import { MonitorSmartphone, CloudCog, DatabaseZap, Workflow } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

const capabilities = [
  {
    icon: MonitorSmartphone,
    title: 'Ecosistemas Web & Apps',
    description: 'Desarrollamos interfaces de alto rendimiento y arquitecturas modernas. Desde plataformas B2B complejas hasta experiencias inmersivas orientadas a la conversión, priorizando siempre la velocidad y la usabilidad.'
  },
  {
    icon: CloudCog,
    title: 'Arquitecturas Cloud',
    description: 'Diseñamos e implementamos infraestructuras escalables y seguras en la nube. Preparamos tu producto para soportar picos de tráfico masivos sin degradar el rendimiento, optimizando costos operativos.'
  },
  {
    icon: DatabaseZap,
    title: 'Sistemas Backend Core',
    description: 'Construimos el cerebro de tu operación. APIs robustas, gestión de bases de datos complejas y lógica de negocio segura que garantiza la integridad de tus datos y la comunicación fluida.'
  },
  {
    icon: Workflow,
    title: 'Integraciones & Automatización',
    description: 'Conectamos tu nuevo ecosistema con las herramientas que ya usas (ERPs, CRMs, Pasarelas de Pago). Automatizamos flujos de trabajo críticos para eliminar tareas manuales y reducir errores humanos.'
  }
]

export function CoreCapabilities() {
  return (
    <section className="relative py-24 bg-background overflow-hidden" aria-label="Capacidades Core">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col">
          {capabilities.map((cap, i) => (
            <AnimateIn key={cap.title} delay={i * 100}>
              <div className="group flex flex-col lg:flex-row items-start lg:items-center justify-between py-12 md:py-16 border-t border-white/10 gap-6 lg:gap-16">
                
                {/* Columna Izquierda: Número, Icono y Título */}
                <div className="flex items-start gap-6 w-full lg:w-5/12 shrink-0">
                  {/* Icono con color suave que se enciende en el hover */}
                  <div className="mt-2 shrink-0">
                    <cap.icon 
                      className="w-6 h-6 text-white/20 group-hover:text-[#ffb690] transition-colors duration-500" 
                      strokeWidth={1.5} 
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    {/* Numeración estilo tech */}
                    <span className="font-body text-[10px] font-bold text-white/20 group-hover:text-[#ffb690] transition-colors duration-500 tracking-[0.2em] mb-4">
                      CAPACIDAD // 0{i + 1}
                    </span>
                    {/* Título que se desplaza en el hover */}
                    <h3 className="font-display text-3xl sm:text-4xl text-foreground tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                      {cap.title}
                    </h3>
                  </div>
                </div>

                {/* Columna Derecha: Descripción */}
                <div className="w-full lg:w-7/12 lg:pl-12">
                  <p className="font-body text-lg sm:text-xl text-foreground/50 leading-relaxed font-light text-pretty group-hover:text-foreground/70 transition-colors duration-500">
                    {cap.description}
                  </p>
                </div>

              </div>
            </AnimateIn>
          ))}
          
          {/* Línea de cierre al final de la lista */}
          <div className="border-t border-white/10 w-full" />
        </div>
      </div>
    </section>
  )
}