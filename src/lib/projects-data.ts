export interface Project {
  name: string
  category: string
  description: string
  url: string
  // Dominio mostrado (sin protocolo) — se deriva de url si se omite.
  displayUrl?: string
  tags: string[]
}

// Proyectos reales en producción. Agregar uno nuevo = una entrada acá.
// Solo sitios LIVE con dominio confirmado (no agregar "pendientes").
export const projects: Project[] = [
  {
    name: 'Marcovich Barbería',
    category: 'Barbería · Reservas + Bot WhatsApp',
    description:
      'Sistema de reservas online con disponibilidad en tiempo real, panel de administración y un bot de WhatsApp que confirma turnos y envía recordatorios automáticos.',
    url: 'https://marcovichbarber.com.ar',
    tags: ['Next.js', 'Supabase', 'n8n', 'WhatsApp API'],
  },
  {
    name: 'GC² Entrenamiento',
    category: 'Entrenamiento deportivo · CMS + Blog',
    description:
      'Plataforma del equipo de entrenamiento de resistencia con CMS interno: editan planes, coaches y blog sin tocar código, con SEO técnico desde el día uno.',
    url: 'https://gc2entrenamientoderesistencia.com.ar',
    tags: ['Next.js', 'Supabase', 'Dashboard', 'SEO'],
  },
  {
    name: 'Grúas InGlobal',
    category: 'Grúas y montajes industriales · Modernización + CMS',
    description:
      'Sitio institucional migrado de PHP legacy a Next.js, con CMS propio y un módulo de agenda de grúas instalable como PWA, con vista kiosco para TV.',
    url: 'https://gruasinglobal.com',
    tags: ['Next.js', 'CMS', 'PWA'],
  },
  {
    name: 'InGlobal Agenda',
    category: 'App móvil · iOS',
    description:
      'App para gestionar desde el celular la agenda de grúas, operarios y empresas, conectada a la misma API del sistema web de Grúas InGlobal.',
    url: 'https://apps.apple.com/ar/app/inglobal-agenda/id6810508533',
    displayUrl: 'App Store',
    tags: ['React Native', 'Expo', 'API'],
  },
  {
    name: 'Recovery Parts Academy',
    category: 'Academia técnica · Sitio + Campus virtual',
    description:
      'Sitio de la academia con cursos y galería editables desde un CMS, y un campus virtual con accesos diferenciados para administración, profesores y alumnos.',
    url: 'https://recoverypartsacademy.com.ar',
    tags: ['Next.js', 'Supabase', 'CMS', 'Campus'],
  },
]

export function projectDisplayUrl(p: Project): string {
  return p.displayUrl ?? p.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}
