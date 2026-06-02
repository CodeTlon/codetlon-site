# CodeTlon Site — Project Context

> **Contexto de sesión para Claude Code.**
> Al iniciar: leer este archivo + `ARCHITECTURE.md` + `TASKS.md`.
> Sesión de mantenimiento: `/cambio "<tema>"` abre la rama; cada prompt commitea ahí (sin coautor, sin tocar main); `/cerrar` mergea/pushea/tagea cuando lo pidas.
> Al cerrar: fila(s) en el **Changelog del README.md (raíz)** + fila en Historial de Cambios acá. Si hubo cambios estructurales → editar la sección + ARCHITECTURE.md.

---

## Identidad del Proyecto
- **Cliente:** CodeTlon (sitio institucional propio de la agencia)
- **Tipo:** L2 — Marketing site multipágina
- **Generado:** 2026 (entrega inicial)
- **URL Producción:** https://codetlon.com
- **Repo GitHub:** CodeTlon/codetlon-site
- **Deploy:** Vercel

## Stack
- Next.js 14 (App Router) + TypeScript + Tailwind CSS + Shadcn/UI (base-ui) + Lucide React
- Supabase: **no** (env vars heredadas en `.env.example` pero el form NO escribe a DB — ver `actions/contact.ts`)
- Resend: **sí** — formulario de contacto envía email, sin almacenamiento
- Analytics: Google Analytics 4 vía `next/script` (`NEXT_PUBLIC_GA_ID`)
- Fuentes: cargadas vía `next/font` (ver `app/layout.tsx` + `app/fonts/`)

## Mapa de Archivos Clave
| Archivo | Rol |
|---------|-----|
| `src/app/layout.tsx` | Root layout — Header, Footer, WhatsApp, fuentes, metadata, GA4 |
| `src/app/page.tsx` | Home — Hero → Capacidades → Método FOS → Servicios teaser → Métricas → CTA |
| `src/app/servicios/page.tsx` | Listado de servicios |
| `src/app/servicios/[slug]/page.tsx` | Detalle de servicio (data de `lib/services-data.ts`) |
| `src/app/proceso/page.tsx` | Página de proceso / metodología |
| `src/app/nosotros/page.tsx` | Sobre la agencia |
| `src/app/contacto/page.tsx` | Formulario de contacto (Resend) |
| `src/app/gracias/page.tsx` | Confirmación post-envío |
| `src/app/actions/contact.ts` | Server Action `sendContact` — Resend, sin Supabase |
| `src/app/sitemap.ts` / `src/app/robots.ts` | SEO técnico |
| `src/components/layout/` | Header, Footer, WhatsAppButton |
| `src/components/sections/` | Secciones reutilizables (Hero, ServicesGrid, CTABanner, ContactForm, etc.) |
| `src/components/seo/JsonLd.tsx` | JSON-LD structured data |
| `src/components/ui/` | Primitivas Shadcn + componentes propios (GlassCard, GradientButton, etc.) |
| `src/lib/services-data.ts` | Fuente de verdad de los servicios (slugs incluidos) |
| `src/lib/constants.ts` | Constantes globales (links, datos de contacto) |
| `src/lib/validations/contact.ts` | Schema Zod del formulario |

## Variables de Entorno
```
# Resend (form de contacto)
RESEND_API_KEY=
RESEND_FROM_NAME=
RESEND_FROM_EMAIL=
COMPANY_EMAIL=
NOTIFICATIONS_EMAIL=        # opcional, default info@codetlon.com.ar
# Analytics
NEXT_PUBLIC_GA_ID=
# Públicos
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_SITE_URL=
# Supabase: presentes en .env.example pero NO usados por el form actual
```
Ver `.env.example` para el listado completo.

## Diseño — Decisiones Clave
- **Estilo general:** glassmorphism + gradientes, look "tech premium" (GlassCard, GradientButton, grain).
- **Secciones home:** Hero → CoreCapabilities → FOSMethod → ServicesTeaser → Metrics → CTA.
- **Íconos:** Lucide React. WhatsApp → SVG inline.

## Quirks y Advertencias
- El formulario de contacto **solo manda email vía Resend** — la inserción a Supabase fue removida a propósito (`actions/contact.ts` lo deja documentado). No reintroducir Supabase salvo pedido explícito.
- Estructura con `src/` y alias `@/*` → `./src/*`.
- GA4 se carga con `next/script` en el layout — gobernado por `NEXT_PUBLIC_GA_ID`.
- Reglas FOS: Tailwind only (sin styled-jsx), `useFormState` de `react-dom`, Server Action con `(prevState, formData)`, fuentes vía `next/font`, viewport separado de metadata.

## Comandos Rápidos
```bash
npm run dev          # Dev server
npm run build        # Build producción
npm start            # Serve producción (para Lighthouse)
npm run lint         # ESLint
npm run test:e2e     # Playwright E2E
```

## Historial de Cambios
| Fecha | Rama | Cambio |
|-------|------|--------|
| 2026 | main | v1.0.0 — entrega inicial (marketing site) |
| 2026 | main | feat: Google Analytics 4 con next/script |
| 2026 | main | fix: grainy-gradients externo → SVG local; form vuelve a Resend |
<!-- Agregar fila al finalizar cada sesión de mantenimiento -->
