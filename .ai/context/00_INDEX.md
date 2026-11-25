# Índice — .ai/context/

Capa 2 de contexto para agentes de IA. Capa 1 es `/AGENTS.md` (raíz) — leela primero siempre.

Generado 2026-09-18 mediante auditoría de evidencia (código, git, `gh api`, Vercel CLI, `npm
audit`) — no es una copia de los docs legacy del proyecto (`README.md`, `ARCHITECTURE.md`,
`TASKS.md`), que están parcialmente desincronizados del código real (ver `KNOWN_ISSUES.md`).

## Qué leer según la tarea

| Tu tarea toca... | Leé (en orden) |
|---|---|
| Cualquier cosa, para orientarte | `AGENTS.md` → este índice |
| El formulario de contacto / emails | `ARCHITECTURE.md` (sección Contact Flow) → `DECISIONS.md` → `KNOWN_ISSUES.md` (#4, #5) |
| Agregar/editar un servicio o proyecto en el home | `DOMAIN.md` |
| Deploy, variables de entorno, Vercel | `ARCHITECTURE.md` (sección Deploy) → `CURRENT_STATE.md` → `KNOWN_ISSUES.md` (#3) |
| SEO / metadata / dominio | `KNOWN_ISSUES.md` (#1) **primero** — hay un bug conocido vivo |
| Dependencias / `npm audit` / seguridad de deps | `KNOWN_ISSUES.md` (#2) → `CURRENT_STATE.md` |
| Auth, roles, panel admin | `ARCHITECTURE.md` (sección Auth) — spoiler: no existe, es intencional |
| Convenciones de código o de git/`/cambio`/`/cerrar` | `CONVENTIONS.md` |
| "¿Por qué está hecho así?" | `DECISIONS.md` |
| Antes de reportar un hallazgo nuevo de seguridad/riesgo | `KNOWN_ISSUES.md` (evitar duplicar) |
| Algo no está claro / decisión pendiente del usuario | `OPEN_QUESTIONS.md` |

## Archivos de esta capa

- `PROJECT.md` — qué es, para quién, qué problema resuelve.
- `ARCHITECTURE.md` — stack real, cadena de deploy verificada, rutas, flujo del form, seguridad.
- `DOMAIN.md` — modelo de datos (servicios, proyectos, constantes) y reglas de negocio detectables.
- `CONVENTIONS.md` — convenciones de código y de proceso (git, `/cambio`, `/cerrar`).
- `DECISIONS.md` — decisiones de arquitectura/producto con su razón.
- `CURRENT_STATE.md` — foto verificada de "qué es verdad hoy" (código y producción).
- `KNOWN_ISSUES.md` — hallazgos con severidad explícita, evidencia y fix propuesto (sin aplicar).
- `OPEN_QUESTIONS.md` — decisiones que le corresponden al usuario, no al agente.
