export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+5493511234567'
export const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://www.instagram.com/codetlon/'
export const COMPANY_EMAIL = process.env.COMPANY_EMAIL ?? 'info@codetlon.com.ar'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://codetlon.com'

export const WHATSAPP_CTA_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent('Hola CodeTlon! Me gustaría consultar sobre sus servicios.')}`

export const NAV_LINKS = [
  { label: 'Servicios', href: '/servicios' },
  { label: 'Proceso', href: '/proceso' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
]
