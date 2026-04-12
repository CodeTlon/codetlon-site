# TASKS — codetlon-site

## Estado general
Proyecto iniciado el 2026-04-12. Marketing site L2 de CodeTlon Software Factory.
**Estado:** Listo para deploy. Pendiente configuración de Supabase + Resend + Vercel por el usuario.

## Fases

- [x] FASE 0 — Setup (create-next-app, git, deps, Shadcn, tokens)
- [x] FASE 1 — Design tokens, fuentes, lib base (constants, supabase, services-data)
- [x] FASE 2 — Layout global (Header, Footer, MobileMenu, WhatsAppButton, CodeTlonBadge)
- [x] FASE 3 — Home (9 secciones: Hero, LogoStrip, ServicesTeaser, FOS, Metrics, Why, Evolución, CTA)
- [x] FASE 4 — Páginas internas (/nosotros, /servicios, /servicios/[slug]x9, /proceso, /contacto, /gracias)
- [x] FASE 5 — Backend (Zod schema, Server Action, Supabase migration, Resend dual-email)
- [x] FASE 6 — SEO (sitemap.ts, robots.ts, Schema.org JSON-LD en Home/Servicios/Contacto)
- [x] FASE 7 — Tests E2E (playwright.config.ts, 4 specs x 3 viewports: navigation, mobile-menu, contact-form, whatsapp-button)
- [x] FASE 8 — Documentación (deployment-guide, technical-docs, maintenance-guide)
- [ ] FASE 9 — Deploy (configurar Supabase + Resend + Vercel — ejecutar por el usuario, ver docs/deployment-guide.md)

## Archivos clave

| Archivo | Descripción |
|---|---|
| `src/app/actions/contact.ts` | Server Action del formulario |
| `supabase/migrations/001_contact_leads.sql` | Migración SQL para ejecutar en Supabase |
| `.env.example` | Variables de entorno requeridas |
| `docs/deployment-guide.md` | Instrucciones completas de deploy |
| `playwright.config.ts` | Config de tests E2E |

## Pendiente del usuario (FASE 9)

1. Crear proyecto en Supabase y correr la migración SQL
2. Crear API key en Resend y verificar dominio codetlon.com
3. Crear proyecto en Vercel y linkear el repo de GitHub
4. Cargar todas las variables de `.env.example` en Vercel
5. Hacer deploy: `git push origin main` (Vercel auto-deploy)
6. Correr Lighthouse en producción: Performance ≥ 85, SEO ≥ 95, Accessibility ≥ 90
7. Merge dev→main + tag `v1.0.0`
