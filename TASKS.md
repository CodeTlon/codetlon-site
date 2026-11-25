# TASKS — codetlon-site

## Estado general
Sitio institucional de CodeTlon **en producción** en https://codetlon.com.ar (Vercel, auto-deploy desde `main`).
Mantenimiento por sesiones (`/cambio` → rama → `/cerrar`). Historial completo en el Changelog de `README.md`.

## Hecho
- [x] v1.0 – v1.3.6: sitio, Resend, GA4 + Consent Mode, rediseño void/cosmos, seguridad, limpieza de Supabase.
- [x] v1.4.0 (2026-11-25): nuevo posicionamiento — 6 servicios en vez de L1–L9, redirects 301, SEO, form, proyectos.

## Pendiente
- [ ] Link de Google Play de **InGlobal Agenda** (hoy solo App Store; `com.gruasinglobal.agenda` da 404 en Play).
- [ ] Génesis Estética: sumar a "En Producción" cuando se decida mostrar el sistema privado.
- [ ] `.env.example`: el ejemplo de `NEXT_PUBLIC_WHATSAPP_NUMBER` sigue con un número falso (archivo bloqueado para el agente).
- [ ] Mover `shadcn` de `dependencies` a `devDependencies` (ver `.ai/context/KNOWN_ISSUES.md` #2).
- [ ] Lighthouse en producción después del deploy de v1.4.0.
