# CodeTlon Site

Sitio institucional de **CodeTlon** — Software Factory Autónoma. Marketing site multipágina construido con el stack CodeTlon.

🔗 Producción: https://codetlon.com

## Stack

- **Next.js 14** (App Router, `src/`) + **TypeScript**
- **Tailwind CSS** + **Shadcn/UI** (base-ui) + **Lucide React**
- **Resend** para el formulario de contacto (sin base de datos)
- **Google Analytics 4** vía `next/script`
- **Playwright** (E2E) · Deploy en **Vercel**

## Setup

```bash
npm install
cp .env.example .env.local   # completar credenciales
npm run dev                  # http://localhost:3000
```

## Scripts

```bash
npm run dev          # Dev server
npm run build        # Build de producción
npm start            # Serve producción (Lighthouse)
npm run lint         # ESLint
npm run test:e2e     # Tests E2E (Playwright)
```

## Variables de entorno

Ver `.env.example`. Claves: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_FROM_NAME`, `COMPANY_EMAIL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL`.

## Estructura

Páginas: Home, Servicios (+ detalle por slug), Proceso, Nosotros, Contacto, Gracias.
Ver [`ARCHITECTURE.md`](./ARCHITECTURE.md) para el mapa de archivos y dónde tocar cada cosa.

## Mantenimiento

Este repo usa el modelo de sesión de CodeTlon. En una sesión de cambios:

- `/cambio "<tema>"` — abre una rama de trabajo desde `main`. Cada cambio commitea ahí.
- `/cerrar` — build + actualiza este Changelog + mergea a `main` + tag SemVer.

Contexto de proyecto en `.claude/CLAUDE.md` + `ARCHITECTURE.md`.

## Changelog

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.3.1 | 2026-07-04 | Fix `ParticleField`: la capa global era `fixed` (solo viewport, sembrada una vez) con `bg-background` opaco en `HeroHome` tapándola — al terminar el hero se veía un corte. Ahora es `absolute` sobre todo el documento (recicla partículas cada 200ms para sentirse viva al scrollear). Efecto espacio: profundidad/parallax, parpadeo, halo en estrellas cercanas. Cursor con más alcance y fuerza. Hardening de performance: se reemplaza `shadowBlur` (costoso) por un halo de doble trazo, tope absoluto de 1400 partículas, y pausa por Page Visibility API cuando la pestaña está en background. Sin nuevas dependencias, bundle sin cambios. Build verde 23/23. |
| v1.3.0 | 2026-06-29 | **Rediseño visual "void/cosmos"** (referente Dala, colores CodeTlon). Tokens nuevos: fondo `#0a0f10` (negro con tinte teal), durazno `#ffb690` como único color de acción, bordes hairline, pills 24px; sin glass/gradientes/sombras (`.glass`/`.gradient-cta`/`.gradient-hero` quedan planas por nombre). Tipografía de familia única **Inter** (display peso 200, se removió Newsreader serif). Nuevo `ParticleField.tsx` (canvas sin deps, respeta `prefers-reduced-motion`): capa global sutil en `layout.tsx` + campo denso en `HeroHome`/`PageHero`. Secciones del home a transparente para que el campo global se vea. Build verde 23/23. |
| v1.2.0 | 2026-06-21 | Cookies/privacidad: banner de consentimiento + **Consent Mode v2** (GA4 arranca `denied`, opt-in vía banner, elección en `localStorage` `ct_cookie_consent`). Nuevas páginas **`/privacidad`** y **`/terminos`** (no existían) con sección de cookies + Ley 25.326, links en el footer y entradas en el sitemap. El banner solo aparece si hay `GA_ID` real. Cierra el hueco legal de cargar analytics sin consentimiento. Build verde 23/23. |
| v1.1.1 | 2026-06-18 | Se elimina `WhatsAppButton` (componente + test) por decisión de Mateo — no va más en el sitio. |
| v1.1.0 | 2026-06-18 | Accesibilidad: contraste del footer (4 textos `/50`→`/65`, ratio 4.24→AA) y links del menú móvil colapsado quedaban tabbables con `aria-hidden` (se agrega `tabIndex={-1}` cuando está cerrado). E2E: de 43/54 rojos a 54/54 verdes — la mayoría eran por falta de los browsers de Playwright (WebKit/Firefox no instalados) y selectores desactualizados vs. el rediseño actual (slug `landing-page`→`landing`, picker de botones en vez de `<select>`, texto "Enviar propuesta", aria-labels en español, navegación flaky en `next dev` por Fast Refresh). Pendiente real (no de código, requiere decisión de producto): los CTA de `/servicios/[slug]` linkean a `/contacto?servicio=<slug>` pero el form rediseñado no lee ese query param — el deep-link no preselecciona nada. |
| v1.0.0 | 2026 | Entrega inicial — marketing site |
| — | 2026 | Google Analytics 4 (next/script); grainy-gradients externo → SVG local; form de contacto vuelve a Resend |

## Licencia

© 2026 CodeTlon. Todos los derechos reservados. Software propietario de CodeTlon.
Prohibida su copia, redistribución o reuso sin autorización escrita. Ver [LICENSE](./LICENSE).
