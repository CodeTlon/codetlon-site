# ARCHITECTURE — CodeTlon Site

Mapa para mantenimiento. **No releas el repo entero**: buscá tu tipo de cambio acá y abrí solo esos archivos.

## Stack
Next.js 14 (App Router, `src/`) · TypeScript · Tailwind · Shadcn/base-ui · Resend · GA4 · Vercel. Alias `@/*` → `src/*`.

## Para cambios comunes, leé solo esto

| Querés cambiar… | Abrí |
|-----------------|------|
| Textos/secciones del Home | `src/app/page.tsx` + el componente en `src/components/sections/` |
| Un servicio (texto, nuevo servicio, slug) | `src/lib/services-data.ts` (fuente de verdad) → se refleja en `servicios/` y `servicios/[slug]` |
| Header / Footer / botón WhatsApp | `src/components/layout/` |
| Formulario de contacto (campos, validación) | `src/components/sections/ContactForm.tsx` + `src/lib/validations/contact.ts` |
| Lógica de envío del form (email) | `src/app/actions/contact.ts` (Resend; **no** toca Supabase) |
| Metadata / SEO de una página | `metadata` export de esa `page.tsx` + `src/components/seo/JsonLd.tsx` |
| Sitemap / robots | `src/app/sitemap.ts` / `src/app/robots.ts` |
| Estilos globales / paleta / fuentes | `tailwind.config.ts` + `src/app/layout.tsx` + `src/app/globals.css` |
| Datos de contacto / links globales | `src/lib/constants.ts` |
| Analytics | `src/components/GoogleAnalytics.tsx` + `NEXT_PUBLIC_GA_ID` |
| Loading skeleton de una ruta | `src/components/PageSkeleton.tsx` (compartido) + el `loading.tsx` de esa ruta en `src/app/` |
| Error boundary de una ruta | `src/components/ErrorFallback.tsx` (compartido) + el `error.tsx` de esa ruta; `src/app/global-error.tsx` es aparte (self-contained, sin Header/Footer) |
| Headers de seguridad | `next.config.mjs` → `securityHeaders` (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) |

## Dónde NO meterse sin pensar
- `next.config.mjs` — image formats / remotePatterns / `securityHeaders`. Cambiar mal rompe `<Image>` o afloja el baseline de seguridad (ver `security-owasp.md` §5 en `codetlon-cloud`).
- `tailwind.config.ts` — tokens compartidos por toda la UI.
- `src/app/actions/contact.ts` — el form es Resend-only **a propósito**; no reintroducir Supabase sin pedido.
- `.env` / `.env.example` — si agregás una var, actualizá ambos + README + Vercel.
- `src/app/global-error.tsx` — reemplaza el `<html>`/`<body>` entero si el root layout falla; no puede importar nada del árbol normal (Header, ErrorFallback, Tailwind classes asumidas). Estilos inline a propósito.

## Flujo de datos
- Servicios: estáticos en `src/lib/services-data.ts` (sin DB). `servicios/[slug]` resuelve por slug de ahí.
- Contacto: `ContactForm` (`useFormState`) → `sendContact` Server Action → Resend. Redirige a `/gracias`.

## Deploy
Vercel (push a `main`). Variables de entorno cargadas manualmente en el dashboard de Vercel.
