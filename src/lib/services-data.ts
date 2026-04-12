export interface Service {
  slug: string
  level: string
  name: string
  shortDescription: string
  longDescription: string
  problemStatement: string
  whatYouGet: string[]
  techStack: string[]
  timeline: { step: string; duration: string }[]
  relatedSlugs: string[]
  color: string
}

export const services: Service[] = [
  {
    slug: 'landing',
    level: 'L1',
    name: 'Landing de Alta Conversión',
    shortDescription: 'Una página optimizada para convertir visitantes en clientes.',
    longDescription:
      'La landing perfecta para lanzar un producto, servicio o campaña. Diseñada para convertir, con formulario de contacto, secciones de características, testimonios y SEO desde el día uno.',
    problemStatement:
      'Necesitás presencia digital rápida, profesional y orientada a resultados. Sin complejidad innecesaria.',
    whatYouGet: [
      'Diseño premium responsive (mobile-first)',
      'Formulario de contacto con notificaciones email',
      'Secciones: Hero, Features, Testimonios, Galería, FAQ, Contacto',
      'SEO on-page completo + Schema.org LocalBusiness',
      'Lighthouse Performance > 85, SEO > 95',
      'Deploy en Vercel con dominio personalizado',
      'Tests E2E automatizados',
      'Documentación y guía de mantenimiento',
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Resend', 'Vercel'],
    timeline: [
      { step: 'Brief y diseño', duration: '1 día' },
      { step: 'Desarrollo', duration: '2 días' },
      { step: 'Testing y ajustes', duration: '1 día' },
      { step: 'Deploy', duration: '4 horas' },
    ],
    relatedSlugs: ['marketing-site', 'sitio-estatico'],
    color: '#ffb690',
  },
  {
    slug: 'marketing-site',
    level: 'L2',
    name: 'Marketing Site',
    shortDescription: 'Sitio multipágina para posicionar tu marca y captar leads.',
    longDescription:
      'Un sitio institucional completo con múltiples páginas, navegación global, blog opcional y SEO por página. Ideal para empresas que necesitan una presencia digital sólida y escalable.',
    problemStatement:
      'Tu negocio creció y necesitás más que una landing: un sitio que cuente toda tu historia y posicione tu marca.',
    whatYouGet: [
      'Múltiples páginas: Home, Nosotros, Servicios, Contacto y más',
      'Navegación global con Header y Footer',
      'Metadata única y SEO por página',
      'Sitemap dinámico y robots.txt',
      'Formulario de contacto completo',
      'Blog opcional (MDX o Supabase)',
      'Lighthouse Performance > 85, SEO > 95',
      'Deploy en Vercel',
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Resend', 'Vercel'],
    timeline: [
      { step: 'Brief y diseño', duration: '1-2 días' },
      { step: 'Desarrollo', duration: '3-4 días' },
      { step: 'Testing y SEO', duration: '1 día' },
      { step: 'Deploy', duration: '4 horas' },
    ],
    relatedSlugs: ['landing', 'dashboard-usuarios'],
    color: '#a4cddb',
  },
  {
    slug: 'dashboard-usuarios',
    level: 'L3',
    name: 'Dashboard con Usuarios',
    shortDescription: 'Aplicación web con autenticación, roles y panel de gestión.',
    longDescription:
      'Para negocios que necesitan que sus clientes o equipo inicien sesión y gestionen datos. Incluye autenticación segura con Supabase Auth, roles de usuario y un dashboard CRUD completo.',
    problemStatement:
      'Necesitás que tus usuarios tengan acceso privado a datos, configuraciones o herramientas dentro de tu plataforma.',
    whatYouGet: [
      'Autenticación completa (email/password o magic link)',
      'Roles: usuario y administrador (RBAC)',
      'Dashboard con operaciones CRUD',
      'Row Level Security en base de datos',
      'Middleware de protección de rutas',
      'Panel admin independiente',
      'Deploy en Vercel + Supabase Cloud',
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Supabase Auth', 'Supabase DB', 'Vercel'],
    timeline: [
      { step: 'Arquitectura y diseño', duration: '2 días' },
      { step: 'Auth y roles', duration: '2 días' },
      { step: 'Dashboard y CRUD', duration: '3 días' },
      { step: 'Testing y deploy', duration: '2 días' },
    ],
    relatedSlugs: ['ecommerce', 'marketing-site'],
    color: '#ffb690',
  },
  {
    slug: 'ecommerce',
    level: 'L4',
    name: 'Ecommerce',
    shortDescription: 'Tienda online completa con catálogo, carrito y pagos.',
    longDescription:
      'Una tienda online robusta con catálogo de productos, carrito de compras y pagos integrados con MercadoPago o Stripe. Disponible en versión básica (catálogo + contacto) o completa (tienda + panel admin).',
    problemStatement:
      'Querés vender online con una plataforma propia, sin pagar comisiones a marketplaces ni depender de plataformas cerradas.',
    whatYouGet: [
      'Catálogo de productos con filtros y búsqueda',
      'Carrito de compras persistente',
      'Checkout con MercadoPago o Stripe',
      'Webhooks para confirmación de pagos',
      'Panel admin para gestión de productos y órdenes',
      'Deploy en VPS Docker',
      'Optimización de performance para e-commerce',
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Supabase', 'MercadoPago/Stripe', 'Docker', 'VPS'],
    timeline: [
      { step: 'Diseño y arquitectura', duration: '2 días' },
      { step: 'Catálogo y carrito', duration: '3 días' },
      { step: 'Pagos y webhooks', duration: '2 días' },
      { step: 'Admin y deploy', duration: '3 días' },
    ],
    relatedSlugs: ['dashboard-usuarios', 'sitio-automatizacion'],
    color: '#a4cddb',
  },
  {
    slug: 'sitio-automatizacion',
    level: 'L5',
    name: 'Sitio + Automatización',
    shortDescription: 'Cualquier sitio de los niveles anteriores + workflows automáticos con n8n.',
    longDescription:
      'La combinación perfecta: un sitio web profesional más la potencia de la automatización. Con n8n corriendo en tu propia VPS, conectamos tu sitio con CRMs, notificaciones automáticas, reportes y cualquier flujo que necesites.',
    problemStatement:
      'Tu sitio capta leads pero los procesos manuales consumen tiempo. Necesitás automatizar sin perder el control.',
    whatYouGet: [
      'Sitio web (L1-L4 según necesidad)',
      'n8n self-hosted en tu VPS',
      'Workflows: notificaciones, CRM, reportes',
      'Webhook desde el sitio a n8n',
      'Docker Compose para toda la infraestructura',
      'Documentación de workflows',
    ],
    techStack: ['Next.js 14', 'TypeScript', 'n8n', 'Docker', 'PostgreSQL', 'Nginx', 'VPS'],
    timeline: [
      { step: 'Sitio base', duration: 'según nivel' },
      { step: 'Setup VPS + Docker', duration: '1 día' },
      { step: 'Workflows n8n', duration: '2-3 días' },
      { step: 'Testing e integración', duration: '1 día' },
    ],
    relatedSlugs: ['automatizacion', 'ecommerce'],
    color: '#ffb690',
  },
  {
    slug: 'sitio-estatico',
    level: 'L6',
    name: 'Sitio Estático',
    shortDescription: 'Sitio informativo puro, sin base de datos ni servidor.',
    longDescription:
      'Para presencias digitales simples que solo necesitan mostrar información: portfolios, curriculums, micrositios de eventos o páginas de presentación. Build estático 100%, velocidad máxima, costo mínimo.',
    problemStatement:
      'Necesitás algo rápido, barato y confiable. Sin base de datos, sin backend, sin complicaciones.',
    whatYouGet: [
      'Sitio informativo completo',
      'Export estático 100% (HTML + CSS + JS)',
      'Velocidad de carga excepcional',
      'Hosting en Vercel (gratis)',
      'SEO básico incluido',
      'Sin costos de servidor ni base de datos',
    ],
    techStack: ['Next.js 14 (static export)', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    timeline: [
      { step: 'Diseño', duration: '1 día' },
      { step: 'Desarrollo', duration: '1-2 días' },
      { step: 'Deploy', duration: '2 horas' },
    ],
    relatedSlugs: ['landing', 'marketing-site'],
    color: '#a4cddb',
  },
  {
    slug: 'refactor',
    level: 'L7',
    name: 'Refactor a Nuestro Stack',
    shortDescription: 'Migramos tu sitio existente a Next.js + Tailwind + Supabase.',
    longDescription:
      'Tenés un sitio viejo en WordPress, PHP, React legacy o cualquier otro stack y querés modernizarlo. Lo auditamos, planificamos y migramos completo a nuestro stack curado sin perder SEO ni contenido.',
    problemStatement:
      'Tu sitio actual es lento, difícil de mantener o no escala. Sabés que necesita una renovación tecnológica pero no querés empezar de cero.',
    whatYouGet: [
      'Auditoría completa del sitio existente',
      'Plan de migración detallado',
      'Migración a Next.js 14 + Tailwind + Supabase',
      'Preservación de SEO (301 redirects, metadata)',
      'Migración de contenido y datos',
      'Performance mejorado garantizado',
      'Documentación del nuevo stack',
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel'],
    timeline: [
      { step: 'Auditoría', duration: '1 día' },
      { step: 'Plan de migración', duration: '1 día' },
      { step: 'Migración', duration: '4-7 días' },
      { step: 'Validación y QA', duration: '2 días' },
    ],
    relatedSlugs: ['marketing-site', 'dashboard-usuarios'],
    color: '#ffb690',
  },
  {
    slug: 'automatizacion',
    level: 'L8',
    name: 'Solo Automatización',
    shortDescription: 'n8n puro en tu VPS para automatizar procesos de tu negocio.',
    longDescription:
      'Sin necesidad de un sitio nuevo. Montamos n8n en tu VPS y construimos los workflows que necesita tu negocio: lead generation, procesamiento de datos, notificaciones automáticas, integraciones con APIs y más.',
    problemStatement:
      'Ya tenés un sitio. Lo que necesitás es automatizar los procesos que hoy hacés a mano.',
    whatYouGet: [
      'n8n self-hosted en tu VPS con Docker',
      'Workflows documentados y testeados',
      'Casos típicos: leads, notificaciones, reportes, integraciones',
      'Backups automáticos de workflows',
      'Dashboard de monitoreo',
      'Capacitación para operar n8n',
    ],
    techStack: ['n8n', 'Docker', 'PostgreSQL', 'Nginx', 'VPS'],
    timeline: [
      { step: 'Setup VPS + Docker', duration: '4 horas' },
      { step: 'Workflows', duration: '2-5 días' },
      { step: 'Testing y documentación', duration: '1 día' },
    ],
    relatedSlugs: ['sitio-automatizacion', 'ia-integrada'],
    color: '#a4cddb',
  },
  {
    slug: 'ia-integrada',
    level: 'L9',
    name: 'Sitio + IA Integrada',
    shortDescription: 'Tu sitio con inteligencia artificial: chatbots, generadores y asistentes.',
    longDescription:
      'El nivel más avanzado. Cualquier sitio de los niveles anteriores más integración real de IA usando Claude o GPT: chatbots entrenados con tu información, generadores de presupuestos automáticos, asistentes de contenido y más.',
    problemStatement:
      'Querés que tu sitio haga más que mostrar información: que entienda, responda y ayude a tus usuarios en tiempo real.',
    whatYouGet: [
      'Sitio web base (L1-L5 según necesidad)',
      'Integración con Claude API o GPT',
      'Chatbot entrenado con tu información',
      'Rate limiting para control de costos',
      'System prompt personalizado al negocio',
      'Panel de monitoreo de uso de IA',
      'Deploy en VPS Docker',
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Claude API / GPT', 'Docker', 'VPS', 'Supabase'],
    timeline: [
      { step: 'Sitio base', duration: 'según nivel' },
      { step: 'Integración IA', duration: '2-3 días' },
      { step: 'Training y tuning', duration: '1-2 días' },
      { step: 'Testing y deploy', duration: '1 día' },
    ],
    relatedSlugs: ['automatizacion', 'sitio-automatizacion'],
    color: '#ffb690',
  },
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
