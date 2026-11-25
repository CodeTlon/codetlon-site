import type { LucideIcon } from 'lucide-react'
import { Boxes, Globe, Smartphone, Workflow, RefreshCcw, LifeBuoy } from 'lucide-react'

// Catálogo de servicios — fuente de verdad del sitio (home, /servicios, /servicios/[slug],
// sitemap, JSON-LD, select del formulario de contacto).
// Reemplaza al viejo modelo de niveles L1–L9 (ver .ai/context/DECISIONS.md). Los slugs viejos
// redirigen con 301 a estos desde next.config.mjs.
export interface Service {
  slug: string
  name: string
  shortDescription: string
  longDescription: string
  problemStatement: string
  whatYouGet: string[]
  techStack: string[]
  relatedSlugs: string[]
  icon: LucideIcon
}

export const services: Service[] = [
  {
    slug: 'software-a-medida',
    name: 'Software a medida',
    icon: Boxes,
    shortDescription:
      'Sistemas diseñados desde cero según los procesos y objetivos de tu negocio, escalables y seguros.',
    longDescription:
      'Diseñamos y desarrollamos sistemas que se adaptan a cómo trabaja tu negocio, no al revés: paneles de gestión, plataformas internas, portales para clientes y herramientas operativas. Partimos de tus procesos reales, definimos juntos el alcance y construimos una base sólida que pueda crecer con vos.',
    problemStatement:
      'Para negocios que hoy se apoyan en planillas, sistemas genéricos que no encajan o procesos manuales que ya no alcanzan, y necesitan una herramienta propia.',
    whatYouGet: [
      'Relevamiento de procesos y definición del alcance antes de escribir código',
      'Usuarios, roles y permisos según quién hace qué en tu operación',
      'Panel de gestión con reportes y exportación de datos',
      'Base de datos diseñada para tu información, con copias de seguridad',
      'API para conectar el sistema con otras herramientas',
      'Tests automatizados sobre los flujos críticos',
      'Código fuente y documentación técnica de tu propiedad',
    ],
    techStack: ['Next.js', 'React', 'Node.js', '.NET / C#', 'Java', 'Python / FastAPI', 'Go', 'PostgreSQL', 'SQL Server', 'Redis', 'Docker'],
    relatedSlugs: ['automatizacion-e-integraciones', 'modernizacion-de-sistemas', 'aplicaciones-moviles'],
  },
  {
    slug: 'desarrollo-web',
    name: 'Desarrollo web',
    icon: Globe,
    shortDescription:
      'Sitios institucionales, plataformas web y tiendas online modernas, rápidas y adaptadas a todos los dispositivos.',
    longDescription:
      'Desarrollamos sitios y plataformas web pensados para que tu negocio se encuentre, se entienda y se contacte. Desde un sitio institucional hasta una tienda online o una plataforma con contenido editable, cuidamos la velocidad, el SEO técnico y la accesibilidad en cada página.',
    problemStatement:
      'Para negocios que no tienen presencia web, que tienen un sitio desactualizado o que necesitan vender y captar consultas online.',
    whatYouGet: [
      'Diseño a medida, adaptado a celular, tablet y escritorio',
      'Contenido editable desde un panel, sin tocar código',
      'SEO técnico: metadata, sitemap y datos estructurados',
      'Formularios de contacto conectados a tu correo o WhatsApp',
      'Tienda online con catálogo, carrito y pagos cuando el proyecto lo requiere',
      'Accesibilidad revisada y tests automatizados antes de publicar',
      'Publicación con dominio propio y certificado HTTPS',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel', 'Cloudflare'],
    relatedSlugs: ['mantenimiento-y-soporte', 'automatizacion-e-integraciones', 'software-a-medida'],
  },
  {
    slug: 'aplicaciones-moviles',
    name: 'Aplicaciones móviles',
    icon: Smartphone,
    shortDescription: 'Apps para Android e iOS integradas con tus sistemas y servicios.',
    longDescription:
      'Desarrollamos aplicaciones para Android e iOS desde una misma base de código, conectadas a tus sistemas existentes o a un backend que construimos para la app. Nos ocupamos también de la publicación en Google Play y App Store.',
    problemStatement:
      'Para negocios cuyos clientes o equipos necesitan operar desde el celular: agendas, pedidos, seguimiento en campo o acceso a sus datos en cualquier lugar.',
    whatYouGet: [
      'Una app para Android e iOS desarrollada con una sola base de código',
      'Login y sesión segura, integrada con tus usuarios existentes',
      'Conexión con tu sistema web o con una API construida para la app',
      'Notificaciones push',
      'Publicación en Google Play y App Store',
      'Actualizaciones de la app sin depender de terceros',
    ],
    techStack: ['React Native', 'Expo', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase'],
    relatedSlugs: ['software-a-medida', 'automatizacion-e-integraciones'],
  },
  {
    slug: 'automatizacion-e-integraciones',
    name: 'Automatización e integraciones',
    icon: Workflow,
    shortDescription:
      'Automatizamos tareas repetitivas y conectamos tus herramientas y sistemas: WhatsApp, correo, planillas, CRM, pagos, facturación e inteligencia artificial.',
    longDescription:
      'Identificamos las tareas que tu equipo repite todos los días y las automatizamos. Conectamos las herramientas que ya usás para que la información fluya sola entre ellas, y sumamos inteligencia artificial donde aporta: responder consultas, clasificar mensajes o procesar documentos.',
    problemStatement:
      'Para negocios que pierden horas copiando datos entre sistemas, respondiendo los mismos mensajes o armando reportes a mano.',
    whatYouGet: [
      'Relevamiento de las tareas repetitivas y priorización por impacto',
      'Flujos automáticos entre WhatsApp, correo, planillas y CRM',
      'Integración con pagos, facturación y sistemas existentes',
      'Asistentes con inteligencia artificial conectados a tu información',
      'Alertas cuando un flujo falla, para que nada se pierda en silencio',
      'Documentación de cada automatización',
    ],
    techStack: ['n8n', 'WhatsApp Business API', 'Node.js', 'Python', 'OpenRouter', 'LangChain', 'LangGraph', 'PostgreSQL', 'Docker'],
    relatedSlugs: ['software-a-medida', 'desarrollo-web', 'aplicaciones-moviles'],
  },
  {
    slug: 'modernizacion-de-sistemas',
    name: 'Modernización de sistemas',
    icon: RefreshCcw,
    shortDescription:
      'Actualizamos, migramos o rediseñamos sistemas existentes para mejorar rendimiento, seguridad y experiencia de uso.',
    longDescription:
      'Tomamos sistemas que funcionan pero quedaron viejos —en PHP, WordPress, .NET Framework, Access u otras tecnologías— y los llevamos a una base actual. Auditamos lo que hay, planificamos la migración por etapas y cuidamos que los datos, el SEO y la operación diaria no se vean afectados.',
    problemStatement:
      'Para negocios con un sistema lento, difícil de mantener, con problemas de seguridad o que ya nadie se anima a tocar.',
    whatYouGet: [
      'Auditoría técnica del sistema actual: código, datos, seguridad y rendimiento',
      'Plan de migración por etapas, sin cortar la operación',
      'Migración de datos con validación',
      'Redirecciones y metadata para conservar el posicionamiento web',
      'Rediseño de la interfaz cuando la experiencia de uso lo necesita',
      'Tests automatizados que cubren lo que antes funcionaba',
      'Documentación del sistema nuevo',
    ],
    techStack: ['Next.js', '.NET / C#', 'Java', 'Node.js', 'PostgreSQL', 'SQL Server', 'Docker', 'Playwright'],
    relatedSlugs: ['software-a-medida', 'mantenimiento-y-soporte'],
  },
  {
    slug: 'mantenimiento-y-soporte',
    name: 'Mantenimiento y soporte',
    icon: LifeBuoy,
    shortDescription:
      'Hosting, copias de seguridad, monitoreo, actualizaciones y soporte técnico continuo.',
    longDescription:
      'Nos hacemos cargo de que tu sitio o sistema siga funcionando bien después del lanzamiento: infraestructura, copias de seguridad, actualizaciones de seguridad y mejoras. Trabajamos tanto sobre proyectos que desarrollamos nosotros como sobre sistemas existentes.',
    problemStatement:
      'Para negocios que dependen de su sitio o sistema y necesitan a alguien que lo cuide, lo actualice y responda cuando algo falla.',
    whatYouGet: [
      'Hosting en infraestructura administrada (Vercel, Cloudflare o servidores propios)',
      'Copias de seguridad automáticas con restauración probada',
      'Monitoreo de disponibilidad y alertas',
      'Actualizaciones de dependencias y parches de seguridad',
      'Soporte técnico y mejoras cotizadas por alcance',
      'Registro de cada cambio en el repositorio',
    ],
    techStack: ['Docker', 'VPS propios', 'Vercel', 'Cloudflare', 'Playwright', 'PostgreSQL'],
    relatedSlugs: ['desarrollo-web', 'modernizacion-de-sistemas'],
  },
]

export const OTHER_SERVICE_OPTION = 'Otro / no estoy seguro'

// Opciones válidas del campo "serviceInterest" del formulario de contacto (cliente + Zod).
// Tipada como tupla no vacía porque z.enum lo exige.
export const SERVICE_INTEREST_OPTIONS: [string, ...string[]] = [
  services[0].name,
  ...services.slice(1).map((s) => s.name),
  OTHER_SERVICE_OPTION,
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getRelatedServices(slug: string): Service[] {
  const service = getServiceBySlug(slug)
  if (!service) return []
  return service.relatedSlugs
    .map((s) => getServiceBySlug(s))
    .filter(Boolean) as Service[]
}
