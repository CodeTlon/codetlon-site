// Fallback = número real de CodeTlon. En producción manda NEXT_PUBLIC_WHATSAPP_NUMBER (Vercel).
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+5493518922024'
export const WHATSAPP_DISPLAY = '+54 9 351 892 2024'
export const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://www.instagram.com/codetlon/'
export const COMPANY_EMAIL = process.env.COMPANY_EMAIL ?? 'info@codetlon.com.ar'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://codetlon.com.ar'

export const WHATSAPP_CTA_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent('¡Hola CodeTlon! Quisiera hacer una consulta sobre sus servicios.')}`

// Posicionamiento (metadata, OG, JSON-LD, llms.txt).
export const SITE_TAGLINE = 'Desarrollamos la tecnología que tu negocio necesita.'
export const SITE_DESCRIPTION =
  'Software a medida, desarrollo web, apps móviles y automatización de procesos para empresas y negocios. Córdoba, Argentina.'

export const NAV_LINKS = [
  { label: 'Servicios', href: '/servicios' },
  { label: 'Proceso', href: '/proceso' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
]
