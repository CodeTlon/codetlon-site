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
| v1.0.0 | 2026 | Entrega inicial — marketing site |
| — | 2026 | Google Analytics 4 (next/script); grainy-gradients externo → SVG local; form de contacto vuelve a Resend |
