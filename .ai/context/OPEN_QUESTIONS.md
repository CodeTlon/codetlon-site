# OPEN_QUESTIONS.md

Decisiones que le corresponden al usuario, no a un agente.

## 1. ¿Corregir los docs legacy ahora o en la próxima sesión?

`README.md`, `ARCHITECTURE.md` (raíz), `TASKS.md` y `public/llms.txt` quedaron desincronizados del
código real (ver `KNOWN_ISSUES.md` #6). El usuario decidió explícitamente no tocarlos en esta
tarea de context engineering. Queda pendiente decidir cuándo corregirlos — se sugiere la próxima
sesión `/cambio`.

## 2. ¿El `SUPABASE_SERVICE_ROLE_KEY` sigue seteado en Vercel (Production/Preview)?

No verificable sin acceso al dashboard/API de Vercel desde esta sesión. Si el plan sigue siendo no
reintroducir Supabase, tiene sentido rotar o eliminar esta credencial tanto del `.env` local como
de Vercel, dado que es un key de alto privilegio (bypass total de RLS) sin ningún uso hoy.

## 3. ¿Vale la pena un gate de CI mínimo antes del auto-deploy?

Hoy no hay `.github/workflows/` — el único gate antes de producción es que `next build` compile.
Un `lint`/`test:e2e` roto no bloquea el deploy. Para un sitio de marketing de bajo riesgo puede ser
aceptable tal cual; si el apetito de riesgo cambia (por ejemplo si el sitio empieza a manejar algo
más sensible), un workflow mínimo de GitHub Actions (lint + `test:e2e`) como check requerido sería
el siguiente paso natural — pero requeriría además empezar a usar Pull Requests, que hoy no se
usan.

## 4. ¿El team de Vercel "mateo-pavonis-projects" es intencional?

El proyecto vive en un team personal de Vercel (`mateo-pavonis-projects`), no en un team con
nombre "CodeTlon". Funcionalmente no cambia nada, pero vale confirmar si es la organización real
que se quiere usar a largo plazo (por ejemplo si en algún momento se suma otra persona al equipo
que necesite acceso al proyecto en Vercel).
