# CURRENT_STATE.md

## Actualización 2026-11-26 — v1.5.0 (rama `feature/dev1-stack-estandar`)

- React 19, ESLint 9 (flat config) y Tailwind 4: el sitio queda en el estándar de la flota.
- Render igual al de v1.4.1: comparación píxel a píxel de 9 páginas en desktop y mobile.
- E2E 81/81 con mobile/tablet emulados en Chromium. Promovida a `dev` y `test`; el PR a `main` lo decide Mateo.

## Actualización 2026-11-25 — v1.4.0 (rama `feature/dev1-posicionamiento-2026`, sin mergear)

- Catálogo: 6 servicios generales en lugar de L1–L9; los 9 slugs viejos responden **301** al
  servicio nuevo (`next.config.mjs`).
- Docs legacy sincronizados con el código (Next 16.4.6, dominio `.com.ar`, `TASKS.md` real):
  `KNOWN_ISSUES.md` #6 resuelto, salvo `.env.example` (número de ejemplo falso, bloqueado para el agente).
- Producción sigue en v1.3.6 hasta que Mateo apruebe el PR a `main`.
- E2E: 81/81 en la VPS con los viewports mobile/tablet **emulados en Chromium** (WebKit no instalable
  sin sudo). Las fallas intermitentes del form eran un bug real (el `Suspense` de `?servicio=` remontaba
  el form y perdía la selección del usuario); corregido leyendo el parámetro en un `useEffect`.
- Ramas (2026-11-25): `dev` alineada con `main` (merge; conflicto de `.env.example` resuelto
  conservando el encabezado de entornos de `dev`), `test` creada. La feature está promovida a
  `dev` y `test`. Falta el PR a `main` (lo decide Mateo: despliega producción).

---

Foto verificada al **2026-09-18**. Todo lo de acá fue confirmado con evidencia (código, git,
`gh api`, Vercel CLI, `npm audit`) en la misma sesión que generó esta capa de contexto — no es una
copia de `README.md`/`TASKS.md` (que están atrasados, ver `KNOWN_ISSUES.md`).

## En producción ahora mismo

- Commit real corriendo en producción: **`72e8b0d`** (alias `codetlon.com.ar` confirmado vía
  `vercel inspect`). Coincide con `origin/main` y con el HEAD de la rama de trabajo local al
  momento de esta auditoría.
- Next.js **16.4.6** (no 14, no 15 — los docs legacy están atrasados).
- Dominio real: `https://codetlon.com.ar` (con `www`). `https://codetlon.com` (sin `.ar`) da
  NXDOMAIN — confirmado por el propio equipo en el commit `72e8b0d`. Al momento del audit
  (2026-09-18) el fix de ese commit no había llegado a todos los lugares que hardcodeaban la URL
  vieja; **resuelto 2026-09-21** en todo `src/` (ver `KNOWN_ISSUES.md` #1). Los docs legacy
  (`README.md`, `public/llms.txt`, `docs/deployment-guide.md`) siguen con el dominio viejo,
  deliberadamente fuera de alcance (ver `KNOWN_ISSUES.md` #6).
- `npm audit`: **0 vulnerabilidades** desde 2026-09-21 (`npm audit fix`, sin `--force`). Al momento
  del audit (2026-09-18) había 1 HIGH, 2 moderate, 1 low, todas transitivas (ver `KNOWN_ISSUES.md`
  #2).

## Sobre el estado de las ramas (aclaración, no un problema)

Al momento de esta auditoría, el clon local tenía la rama `main` desactualizada (`4b957ca`,
2026-07-11) mientras el checkout activo era `chore/ts7` (`72e8b0d`). Esto **no es trabajo sin
mergear** — se verificó que `origin/main` real ya está en `72e8b0d`, idéntico a `chore/ts7`. Es
simplemente que este clon no había hecho `git fetch` recientemente. Un `git fetch && git checkout
main` alinearía las cosas (no ejecutado en esta sesión, es una acción inocua fuera del alcance de
una tarea de documentación).

## Docs vs. código — resumen del drift (detalle completo en KNOWN_ISSUES.md #6)

| Doc | Dice | Realidad |
|---|---|---|
| `README.md`, `ARCHITECTURE.md` (raíz) | Next.js 14 | 16.3.3 |
| `.claude/CLAUDE.md` | Next.js 15 | 16.3.3 |
| `TASKS.md` | Fase 9 (deploy) pendiente; referencia `supabase/migrations/001_contact_leads.sql` | Sitio en producción hace meses; ese archivo no existe (Supabase removido a propósito) |
| `README.md`, `public/llms.txt` | Dominio `https://codetlon.com` | Real: `https://codetlon.com.ar` |
| `.claude/CLAUDE.md` changelog (2026-06-19) | "npm audit: 0 HIGH" | Hoy: 1 HIGH |

Esta capa (`AGENTS.md` + `.ai/context/`) es la fuente de verdad correcta hoy. Los docs legacy no
se corrigieron en esta tarea (decisión explícita del usuario) — quedan para una sesión `/cambio`
futura.
