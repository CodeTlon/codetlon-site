# CONVENTIONS.md

## Código

- **Tailwind only** — nunca `styled-jsx` ni otro CSS-in-JS.
- Diseño "void/cosmos": canvas casi negro (`#0a0f10`), un solo color de acción (durazno `#ffb690`),
  Inter como única familia tipográfica (peso 200 para display), sin glass/gradientes/sombras,
  geometría pill (radius 24px), bordes hairline. Tokens en `tailwind.config.ts` + `globals.css`.
- Formularios: `useFormState` de `react-dom` + Server Action con firma `(prevState, formData)`.
  Validación Zod **server-side dentro de la action**, no solo en el cliente — seguí el patrón de
  `src/app/actions/contact.ts`.
- Fuentes solo vía `next/font`. `viewport` separado de `metadata` en cada página.
- Alias `@/*` → `./src/*`.

## Git / proceso de mantenimiento

Este repo usa comandos custom de Claude Code (`.claude/commands/`), no un flujo de PR de GitHub:

- **`/cambio "<tema>"`** — abre una rama de mantenimiento (`<tipo>/<tema-corto>`). Cada prompt de
  la sesión commitea ahí, sin coautor, sin tocar `main`.
- **`/cerrar`** — cierra la sesión: corre `npm run build`, actualiza el Changelog de `README.md`
  raíz + `ARCHITECTURE.md` (si hubo cambio estructural) + "Historial de Cambios" de
  `.claude/CLAUDE.md`, mergea la rama a `main` **directo (sin PR)**, tagea SemVer y pushea.
- No se usan Pull Requests en este repo (`gh pr list --state all` da vacío) — el merge a `main` es
  local y directo. El push a `main` dispara el deploy automático a producción (ver
  `ARCHITECTURE.md`), así que un `/cerrar` es, en los hechos, un deploy a producción.
- **Nunca** agregar `Co-Authored-By: Claude`/`Anthropic` a un commit — regla global del usuario,
  no específica de este repo.
- Riesgo de proceso observado (ver `KNOWN_ISSUES.md` #6): el paso de actualizar
  README/ARCHITECTURE.md/CLAUDE.md dentro de `/cerrar` se saltó en los últimos merges — el código
  llegó a producción pero la documentación quedó atrás. Si vas a hacer un `/cerrar`, no te saltees
  ese paso aunque tengas apuro.

## Módulos compartidos (repo hermano)

`.claude/CLAUDE.md` referencia módulos en `../../codetlon-cloud/.claude/modules/*.md` (seguridad,
accesibilidad, CI/CD, observabilidad) — no están copiados en este repo. Leelos solo si la tarea
puntual los toca (deploy/env → `security-maintenance.md`; auth/DB/forms → `security-owasp.md`;
UI/a11y → `accessibility.md`; pipeline/CI → `ci-cd.md`; incidente en prod → `observability.md`).
