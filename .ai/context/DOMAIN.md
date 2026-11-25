# DOMAIN.md

No hay base de datos ni ORM. El "modelo de datos" completo de este proyecto son tres archivos TS
estáticos bajo `src/lib/`.

## `services-data.ts` — catálogo de servicios

Array estático de 6 objetos `Service` (desde v1.4.0, 2026-11-25; antes eran 9 niveles L1–L9, ver
`DECISIONS.md`): software a medida, desarrollo web, aplicaciones móviles, automatización e
integraciones, modernización de sistemas, mantenimiento y soporte. Cada `Service` tiene: `slug`,
`name`, descripciones, `problemStatement`, `whatYouGet[]`, `techStack[]`, `relatedSlugs[]`, `icon`
(Lucide). Sin niveles ni duraciones.

- El `slug` alimenta `/servicios/[slug]`, el sitemap, el JSON-LD y la preselección del form
  (`/contacto?servicio=<slug>`). Cambiar un slug publicado exige un redirect 301 en
  `next.config.mjs`.
- `SERVICE_INTEREST_OPTIONS` = nombres de los 6 + "Otro / no estoy seguro": opciones del form y
  enum de Zod (validado server-side).
- **No hay pricing en el código.** Se cotiza por alcance después del Descubrimiento.

## `fos-phases.ts` — FOS Method

Las 6 fases (número, título, resumen, descripción, entregables), sin duraciones. Fuente única para
el home, `/proceso` y el detalle de cada servicio.

## `projects-data.ts` (~34 líneas) — proyectos en producción

5 entradas de proyectos reales (Marcovich, GC², Grúas InGlobal, InGlobal Agenda en App Store, Recovery Parts Academy) ya en producción hechos por CodeTlon (nombre,
categoría, descripción, URL externa, tags). Alimenta la sección "En Producción" del home
(`src/components/sections/Projects.tsx`) como prueba social. Regla documentada en el propio
archivo: solo agregar sitios con dominio confirmado y ya live, nunca proyectos pendientes.

## `constants.ts` — constantes globales

Datos derivados de env vars con fallback: WhatsApp (fallback = número real `+5493518922024`,
`WHATSAPP_DISPLAY` para mostrar), Instagram, email de la empresa, URL del sitio,
`SITE_TAGLINE`/`SITE_DESCRIPTION` (posicionamiento, usados en metadata y JSON-LD), links de navegación.

✅ [RESUELTO 2026-09-21] El fallback de `SITE_URL` apuntaba a `https://codetlon.com` (sin `.ar`,
NXDOMAIN) — corregido a `https://codetlon.com.ar`. Ver `KNOWN_ISSUES.md` #1.
