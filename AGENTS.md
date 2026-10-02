# AGENTS.md — codetlon-site

> Punto de entrada universal para agentes de IA en este repo. Sesión de mantenimiento del código
> (Claude Code): leer también `.claude/CLAUDE.md` (workflow `/cambio` / `/cerrar`). Para cualquier
> otra cosa — auditoría, onboarding de otro agente/humano, debugging — este archivo + `.ai/context/`
> alcanzan.

## ⚠️ Este proyecto está en producción

Sirve tráfico real en `https://codetlon.com.ar`. Reglas no negociables:

- **Nunca mutar datos/estado de producción** (Resend, variables de entorno en Vercel, DNS, el
  propio deploy) sin confirmación explícita del usuario. Leer datos de prod para diagnosticar está
  bien; escribir no.
- **Nunca asumas el mecanismo de deploy sin verificarlo.** `docs/deployment-guide.md` describe el
  deploy manual (`vercel --prod`) como el flujo primario y el auto-deploy por Git como opcional —
  en la práctica es al revés: el deploy real y activo es 100% automático, vía la integración
  nativa GitHub↔Vercel (GitHub App) en cada push a `main`. No hay CI/CD (`.github/workflows/` no
  existe) y no se usan Pull Requests — el merge a `main` es directo, vía el comando `/cerrar`. Ver
  `.ai/context/ARCHITECTURE.md` para el detalle verificado.
- Antes de citar cualquier dato de este repo como cierto (versión de Next, estado de un fix,
  qué está en producción), preferí verificarlo (`package.json`, `git`, `npm audit`) sobre confiar
  ciegamente en un doc — varios de los docs existentes (`README.md`, `ARCHITECTURE.md`, `TASKS.md`,
  `public/llms.txt`) están desincronizados del código real. Ver
  `.ai/context/KNOWN_ISSUES.md`.

## Qué es esto

Sitio institucional de CodeTlon (agencia de software), tipo **L2 — marketing site multipágina**.
No es una app con usuarios/login — es un sitio de presentación de servicios con un formulario de
contacto que manda email. Ver `.ai/context/PROJECT.md`.

## Stack (verificado, no el que dicen los docs legacy)

- **Next.js 16.3.3** (App Router) — ojo: `README.md`/`ARCHITECTURE.md` dicen "14", `.claude/CLAUDE.md`
  dice "15". El real, instalado, es 16.3.3 (`package.json`).
- TypeScript, Tailwind CSS, Shadcn/UI (base-ui), Lucide React.
- Fuente única: Inter vía `next/font` (peso 200 para display + body). No hay serif.
- Sin base de datos. Supabase está en `.env.example`/`package.json` (`@supabase/supabase-js`) pero
  **no se usa** — la inserción de leads a Supabase fue removida a propósito (ver
  `src/app/actions/contact.ts`, comentario explícito). No la reintroduzcas salvo pedido explícito.
- Resend para el único efecto server-side real: el formulario de contacto envía dos emails
  (notificación interna + confirmación al usuario), sin almacenar nada.
- GA4 vía `next/script`, con Consent Mode v2 (banner opt-in, `CookieConsent.tsx`).
- Sin autenticación/autorización de ningún tipo — no hay rutas admin, no hay `middleware.ts`, no
  hay `route.ts`. Es intencional, no un gap.

## Comandos

```bash
npm run dev          # Dev server
npm run build        # Build de producción (es el único gate real antes de deployar)
npm start             # Serve producción (para Lighthouse)
npm run lint          # ESLint
npm run test:e2e      # Playwright E2E
```

## Convenciones críticas

- **Tailwind only** — sin `styled-jsx`, sin CSS-in-JS.
- Formularios: `useFormState` de `react-dom` + Server Action con firma `(prevState, formData)`.
  Validación con Zod **enforced server-side** dentro de la action (no solo en el cliente) — así
  está hecho en `contact.ts`, seguí el mismo patrón para cualquier form nuevo.
- Fuentes solo vía `next/font`. Un solo color de acción: durazno `#ffb690`. Sin glass, sin
  gradientes, sin sombras/elevación — geometría pill (radius 24px), bordes hairline.
- `viewport` separado de `metadata` (regla de Next 14+/App Router, sigue vigente en 16).
- Alias `@/*` → `./src/*`.
- **Git**: commits nunca llevan `Co-Authored-By: Claude` ni similar (regla global del usuario, no
  solo de este repo). El merge a `main` es directo (sin PR) vía `/cerrar` — no asumas que hay un
  flujo de PR/review antes de producción, porque no lo hay.
- Antes de tocar deploy/env/auth/DB o accesibilidad, mirá si aplica un módulo compartido en
  `../../codetlon-cloud/.claude/modules/*.md` (repo hermano, fuera de este repo) — no están
  copiados acá, léelos solo si la tarea los toca (disciplina de tokens).

## Para más contexto

| Necesitás... | Leé |
|---|---|
| Mapa completo, tabla por tipo de tarea | `.ai/context/00_INDEX.md` |
| Qué es el proyecto / para quién | `.ai/context/PROJECT.md` |
| Arquitectura real + cadena de deploy verificada | `.ai/context/ARCHITECTURE.md` |
| Modelo de datos (servicios, proyectos) | `.ai/context/DOMAIN.md` |
| Convenciones de código y de proceso (`/cambio`/`/cerrar`) | `.ai/context/CONVENTIONS.md` |
| Por qué se decidió X (sin Supabase, sin auth, sin CI/CD...) | `.ai/context/DECISIONS.md` |
| Qué es verdad en el código/prod hoy | `.ai/context/CURRENT_STATE.md` |
| Bugs y riesgos conocidos, con severidad | `.ai/context/KNOWN_ISSUES.md` |
| Preguntas abiertas sin resolver | `.ai/context/OPEN_QUESTIONS.md` |

Workflow de mantenimiento propio de este repo (`.claude/commands/`): `/cambio "<tema>"` abre rama
y commitea ahí; `/cerrar` builda, actualiza changelog/docs y mergea+pushea+tagea a `main`. Detalle
completo en `.claude/CLAUDE.md`.
