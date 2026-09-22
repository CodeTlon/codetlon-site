# DECISIONS.md

Decisiones detectables en el código/historial, con su razón. No reintroducir lo removido salvo
pedido explícito del usuario.

## No escribir a Supabase

`@supabase/supabase-js` sigue como dependencia y las env vars de Supabase siguen en `.env.example`,
pero el insert de leads del formulario a Supabase fue **removido a propósito** (comentario
explícito en `src/app/actions/contact.ts`: "ACÁ BORRAMOS TODA LA INSERCIÓN A SUPABASE"). El
formulario solo manda email vía Resend, sin persistir nada. No reintroducir Supabase salvo pedido
explícito del usuario.

## Sin autenticación

Sitio de marketing puro, sin usuarios ni panel — no hay razón de negocio para tener auth. Ver
`ARCHITECTURE.md`.

## Resend-only para el formulario

Un solo canal de conversión (el form de `/contacto`), un solo efecto (email), sin base de datos.
Mantiene la superficie de ataque y de mantenimiento mínima para un sitio de marketing.

## Redesign "void/cosmos" con Inter como única familia

Se removió Newsreader (serif) que existía antes del rediseño. Un solo color de acción (durazno
`#ffb690`) en vez de paleta amplia — decisión de foco visual, no accidente. `ParticleField.tsx`
(canvas sin dependencias) es la firma visual del rediseño.

## Sin CI/CD, confiar en el build de Vercel como gate

No hay `.github/workflows/`. El deploy a producción depende únicamente de que `next build` pase —
no hay gate de lint ni de tests antes de que el código llegue a producción. Es una decisión
implícita (nunca se armó un pipeline), no necesariamente una decisión consciente — ver
`OPEN_QUESTIONS.md` sobre si vale la pena agregar uno.

## Sin Pull Requests

El merge a `main` es local y directo vía `/cerrar`, no vía GitHub. Coherente con ser un proyecto de
un solo mantenedor sin necesidad de review externo.

## Gate de contexto: RAG y subagente de mantenimiento — no aplican hoy

Evaluados explícitamente al cerrar el ciclo de context engineering (2026-09-21), con evidencia de
este proyecto puntual, no por default.

**¿RAG?** No aplica. RAG tiene sentido cuando hay un corpus grande y/o que cambia seguido que un
agente necesita consultar en tiempo de respuesta (docs de producto extensos, base de conocimiento,
histórico de soporte). Acá:
- El "contenido" del sitio son `services-data.ts` (277 líneas) + `projects-data.ts` (34 líneas):
  ~311 líneas totales de datos estructurados, estáticos, que cambian con la frecuencia de "agregar
  un servicio o un proyecto" (eventos raros, no un flujo continuo).
- 9 rutas (`page.tsx`) en total, todas listadas en `ARCHITECTURE.md`.
- No hay contenido dinámico ni generado por usuarios (sin DB, sin CMS, sin comentarios).
- Toda esta capa (`AGENTS.md` + `.ai/context/`, ~600 líneas) ya cabe entera en el contexto de
  cualquier sesión de `/cambio` sin necesitar retrieval. Un RAG acá sería infraestructura (vector
  store, embeddings, pipeline de indexado) para resolver un problema de tamaño que no existe.

**¿Subagente de mantenimiento?** No aplica. Un subagente de mantenimiento se justifica cuando hay
volumen de tareas repetitivas paralelizables o multi-proyecto que ameritan orquestación. Acá:
- Mantenedor único: `git shortlog -sn --all` da 49 commits de Mateo Pavoni contra 4 de
  colaboradores puntuales — no hay equipo que necesite coordinación entre agentes.
- Un solo repo, un solo deploy target (Vercel, ver `ARCHITECTURE.md`), sin variantes de ambiente
  que mantener en paralelo.
- El propio workflow del proyecto (`/cambio` + `/cerrar`, ver `CONVENTIONS.md`) ya es secuencial:
  una rama, una tarea, un merge — no hay paralelismo que un subagente esté orquestando.
- Si el proyecto creciera a múltiples mantenedores o a un ritmo de cambios mucho más alto, vale
  revisar esto de nuevo — no es un "nunca", es "no con la evidencia de hoy".
