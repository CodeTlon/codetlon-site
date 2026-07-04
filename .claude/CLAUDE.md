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
- Next.js 15 (App Router) + TypeScript + Tailwind CSS + Shadcn/UI (base-ui) + Lucide React
- Supabase: **no** (env vars heredadas en `.env.example` pero el form NO escribe a DB — ver `actions/contact.ts`)
- Resend: **sí** — formulario de contacto envía email, sin almacenamiento
- Analytics: Google Analytics 4 vía `next/script` (`NEXT_PUBLIC_GA_ID`)
- Fuentes: **una sola familia** — Inter vía `next/font` (display peso 200 + body). Newsreader (serif) fue removido en el rediseño void/cosmos.

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
| `src/components/ui/ParticleField.tsx` | Campo de partículas / starfield (canvas, sin deps) — firma visual void/cosmos. Capa global en `layout.tsx` es `absolute` sobre todo el documento (no `fixed`, no solo el viewport) en `body` con `position: relative`; recicla partículas cada 200ms para que se sientan nuevas al scrollear. Efecto espacio: profundidad (`depth`, parallax), parpadeo (twinkle) y halo en las estrellas cercanas (sin `shadowBlur`, por costo). Cursor: atrae/repele con más fuerza en las partículas de mayor `depth`. Se pausa con Page Visibility API si la pestaña está en background. Campo propio más denso en `HeroHome`/`PageHero` (sección transparente, sin `bg-*` opaco, para que el campo global se vea a través). Props: `count`, `cluster`. Respeta `prefers-reduced-motion` |
| `src/components/ui/` | Primitivas Shadcn + componentes propios (GlassCard, GradientButton, etc.) |
| `src/lib/services-data.ts` | Fuente de verdad de los servicios (slugs incluidos) |
| `src/lib/projects-data.ts` | Fuente de verdad de los proyectos en producción (sección "En Producción" del home) — agregar uno = una entrada |
| `src/components/sections/Projects.tsx` | Sección "En Producción" del home (cards de proyectos live → link externo al sitio) |
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
- **Estilo general (void/cosmos):** canvas negro casi puro (`#0a0f10`, leve tinte teal), **un solo color de acción = durazno `#ffb690`**, tipografía Inter ultra-fina (peso 200, tracking negativo) para display, bordes hairline, geometría pill (radius 24px), **sin glass / sin gradientes / sin sombras / sin elevación**. Partículas (`ParticleField`) como firma visual en todas las páginas. Colores CodeTlon; estructura del referente "Dala".
  - Tokens en `tailwind.config.ts` + `globals.css`. Las utilidades `.glass`/`.gradient-cta`/`.gradient-hero` se conservan por nombre pero ahora son planas (hairline / peach sólido / void sólido).
- **Secciones home:** Hero → CoreCapabilities → FOSMethod → ServicesTeaser → Metrics → CTA. Las secciones son transparentes (sin `bg-*` opaco) para que el campo de partículas global se vea a través — "todo flota sobre el void". Excepción: `CTABanner` (relleno peach invertido).
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
| 2026-06-19 | fix/security-vulnerabilities | Seguridad: Next 14.2.35 → 15.5.19 (estándar de fábrica) + `npm audit fix` de transitivas (hono y otras same-major). Cierra los 7 HIGH de Next 14 + hono. `npm audit`: 17 vulns → **0 HIGH** (1 moderate = postcss en Next, no accionable). Codemod `next-async-request-api` convirtió `servicios/[slug]` a async params. Build verde + **42/42 E2E**. |
| 2026-06-19 | feat/proyectos-produccion | feat: sección **"En Producción"** en el home (entre WhyCodeTlon y CTA) con cards de proyectos live (Marcovich Barbería, GC² Entrenamiento) → link externo al sitio. Data-driven en `src/lib/projects-data.ts` (agregar uno = una entrada; solo sitios con dominio confirmado). Reusa `GlassCard`/`SectionLabel`/`AnimateIn`. Build verde + 42/42 E2E. |
| 2026-06-21 | feat/cookie-consent | v1.2.0 — Cookies/privacidad: `GoogleAnalytics.tsx` con `consent default 'denied'` (Consent Mode v2, respeta `localStorage` `ct_cookie_consent`) + nuevo `CookieConsent.tsx` (banner sin deps, opt-in). Nuevas páginas `/privacidad` y `/terminos` (no existían) + links en `Footer` + entradas en `sitemap.ts`. El banner solo aparece si hay `GA_ID` real. Build verde 23/23. |
| 2026-06-29 | style/void-cosmos-redesign | **Rediseño visual completo "void/cosmos"** (referente Dala, colores CodeTlon). Tokens nuevos en `tailwind.config.ts`/`globals.css`: fondo `#0a0f10`, durazno `#ffb690` como único color de acción, **Inter como familia única** (display peso 200, se removió Newsreader serif), bordes hairline, pills 24px, sin glass/gradientes/sombras. Nuevo `ParticleField.tsx` (canvas sin deps): capa global sutil en `layout.tsx` (todas las páginas) + campo denso en `HeroHome`/`PageHero`; respeta `prefers-reduced-motion`. Secciones del home pasadas a transparente (sin `bg-*` opaco) para que el campo global se vea. Build verde 23/23. |
<!-- Agregar fila al finalizar cada sesión de mantenimiento -->
---

## Módulos de la fábrica — consultar en `/cambio` según lo que toques

Estos módulos viven en `codetlon-cloud/.claude/modules/` (desde este repo: `../../codetlon-cloud/.claude/modules/`). NO están copiados acá: leé el que aplique al iniciar una sesión de mantenimiento que toque cada tema.

| Si el `/cambio` toca… | Módulo a leer |
|---|---|
| deps / vulnerabilidades (`npm audit`, actualizar libs, upgrade de major) | `security-maintenance.md` |
| auth / DB / RLS / route handler / form / env / secrets (seguridad de **código**) | `security-owasp.md` |
| UI / componentes / forms / páginas (accesibilidad WCAG, Lighthouse a11y > 90) | `accessibility.md` |
| pipeline / `.github/workflows` / Dockerfile / env vars (CI = gate de calidad) | `ci-cd.md` |
| dejar el proyecto live / incidente en producción (monitoreo) | `observability.md` |

Regla: leer SOLO el módulo que la tarea pide (disciplina de tokens), no todos por las dudas.
