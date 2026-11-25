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
]

export function projectDisplayUrl(p: Project): string {
  return p.displayUrl ?? p.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}
