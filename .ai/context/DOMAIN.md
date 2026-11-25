# DOMAIN.md

No hay base de datos ni ORM. El "modelo de datos" completo de este proyecto son tres archivos TS
estáticos bajo `src/lib/`.

## `services-data.ts` (~277 líneas) — catálogo de servicios

Array estático de objetos `Service`, tiers **L1 a L9** (de sitio simple a aplicación con auth/
roles/dashboard). Cada `Service` tiene: `slug`, `level`, nombre/descripciones, `whatYouGet[]`,
`techStack[]`, `timeline[]`, `relatedSlugs[]`, `color`.

- El `slug` es la única regla de negocio real derivable del código: alimenta la ruta dinámica
  `/servicios/[slug]`. Agregar un servicio = agregar una entrada a este array.
- **No hay pricing en el código** (verificado, cero referencias a precio/price/$/USD/ARS). El
  pricing se negocia por fuera, vía la conversación que arranca el formulario de contacto.
- El tier "L5" (auth + roles + dashboard) es copy de marketing sobre lo que CodeTlon *vende a sus
  clientes* — no describe nada implementado en este sitio (este sitio no tiene auth, ver
  `ARCHITECTURE.md`).

## `projects-data.ts` (~34 líneas) — proyectos en producción

2 entradas hardcodeadas de proyectos reales ya en producción hechos por CodeTlon (nombre,
categoría, descripción, URL externa, tags). Alimenta la sección "En Producción" del home
(`src/components/sections/Projects.tsx`) como prueba social. Regla documentada en el propio
archivo: solo agregar sitios con dominio confirmado y ya live, nunca proyectos pendientes.

## `constants.ts` (~13 líneas) — constantes globales

Datos derivados de env vars con fallback: WhatsApp, Instagram, email de la empresa, URL del sitio,
links de navegación.

✅ [RESUELTO 2026-09-21] El fallback de `SITE_URL` apuntaba a `https://codetlon.com` (sin `.ar`,
NXDOMAIN) — corregido a `https://codetlon.com.ar`. Ver `KNOWN_ISSUES.md` #1.
