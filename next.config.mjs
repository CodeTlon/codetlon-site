/** @type {import('next').NextConfig} */
// CSP: 'unsafe-inline' en script/style es necesario porque el sitio no usa nonces
// (script inline de GA4 en GoogleAnalytics.tsx + estilos inline puntuales en JSX).
// Igual restringe fuentes externas, bloquea framing (clickjacking) y objetos embebidos.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://images.unsplash.com https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
]

// Slugs del viejo catálogo de niveles (L1–L9) → servicios actuales. 301 explícito
// (permanent: true en Next responde 308) para conservar SEO y links compartidos.
const legacyServiceRedirects = {
  landing: 'desarrollo-web',
  'marketing-site': 'desarrollo-web',
  'sitio-estatico': 'desarrollo-web',
  ecommerce: 'desarrollo-web',
  'dashboard-usuarios': 'software-a-medida',
  'sitio-automatizacion': 'automatizacion-e-integraciones',
  automatizacion: 'automatizacion-e-integraciones',
  'ia-integrada': 'automatizacion-e-integraciones',
  refactor: 'modernizacion-de-sistemas',
}

const nextConfig = {
  async redirects() {
    return Object.entries(legacyServiceRedirects).map(([from, to]) => ({
      source: `/servicios/${from}`,
      destination: `/servicios/${to}`,
      statusCode: 301,
    }))
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 60,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

export default nextConfig
