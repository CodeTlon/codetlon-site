# KNOWN_ISSUES.md

**Sin hallazgos CRÍTICOS a la fecha de este audit (2026-09-18).** No hay credencial comprometida
ni committeada, no hay falta de enforcement de auth server-side (el sitio no tiene auth, por
diseño — ver `ARCHITECTURE.md`), y no hay vulnerabilidad crítica sin parchear. Los dos hallazgos
de mayor severidad son ALTA.

Ningún fix de este archivo fue aplicado al momento del audit (2026-09-18) — eran propuestas, no
cambios hechos. Actualización 2026-09-21: los dos ítems ALTA (#1 y #2) ya se resolvieron, ver
detalle en cada uno.

---

## 1 — [ALTA] [RESUELTO 2026-09-21] Dominio incorrecto hardcodeado en SEO/OG, vivo en producción

**Evidencia:** ~15 archivos (`page.tsx` de casi todas las rutas: home, `contacto`, `nosotros`,
`privacidad`, `proceso`, `servicios`, `servicios/[slug]`, `terminos`) más el fallback de
`SITE_URL` en `src/lib/constants.ts` tienen hardcodeado el literal `https://codetlon.com` (sin
`.ar`) en `alternates.canonical`, tags Open Graph y/o JSON-LD Organization — como string literal,
no derivado de `NEXT_PUBLIC_SITE_URL` ni de la constante ya corregida en otros lugares
(`layout.tsx`, `sitemap.ts`, `robots.ts` sí usan `codetlon.com.ar`).

**Escenario de falla concreto:** el commit `72e8b0d` confirmó por DNS que `codetlon.com` (sin
`.ar`) no resuelve (NXDOMAIN) y corrigió los fallbacks de `layout.tsx`/`sitemap.ts`/`robots.ts` —
pero no tocó estos ~15 literales. Resultado, hoy, en producción: la mayoría de las páginas emiten
`<link rel="canonical" href="https://codetlon.com/...">` apuntando a un dominio que no resuelve.
Impacto real: Google indexa la URL canónica equivocada (daño a SEO), y cualquier link compartido
en redes con esa OG URL rompe el preview. Esto contradice el objetivo de Lighthouse SEO ≥ 95 que
el propio `TASKS.md` se propone.

**Fix propuesto (no aplicado):** reemplazar los ~15 literales por la constante `SITE_URL` de
`src/lib/constants.ts` (una vez que esa constante también se corrija — ver siguiente punto) o por
`process.env.NEXT_PUBLIC_SITE_URL` con el mismo fallback correcto que ya usa `layout.tsx`.
Incluye corregir el fallback de `SITE_URL` en `constants.ts` mismo, que también apunta al dominio
viejo.

**Resuelto:** los ~10 `page.tsx` afectados (home, contacto, nosotros, privacidad, proceso,
servicios, servicios/[slug], términos) más el fallback de `SITE_URL` en `constants.ts` ahora usan
`https://codetlon.com.ar`, importado desde la constante en vez de repetido como literal. Build
verde. Los docs legacy (`README.md`, `public/llms.txt`, `docs/deployment-guide.md`) siguen con el
dominio viejo — eso queda bajo el ítem #6 (deliberadamente fuera de alcance de esta tarea).

---

## 2 — [ALTA] [RESUELTO 2026-09-21] `npm audit`: 1 HIGH activo, contradice el changelog documentado

**Evidencia:** `npm audit` al 2026-09-18 reporta **1 HIGH, 2 moderate, 1 low**, todas
transitivas. La HIGH es `browserslist` ≤4.28.6 (riesgo de OOM/DoS), arrastrada por `shadcn@4.2.0`
→ `@babel/helper-compilation-targets`/`update-browserslist-db`. `.claude/CLAUDE.md` documenta en
su changelog del 2026-06-19: *"npm audit: 17 vulns → 0 HIGH"* — ese estado ya no es cierto.

**Escenario de falla concreto:** cualquiera que confíe en el changelog de `.claude/CLAUDE.md` para
decidir si hace falta una pasada de seguridad de dependencias va a asumir que no hace falta,
cuando sí hay una HIGH activa hoy.

**Detalle adicional:** `shadcn` (la CLI de scaffolding, nunca importada en runtime) está listada en
`dependencies` de `package.json`, no en `devDependencies` — por eso su árbol completo (incluyendo
`express`/`qs`, origen de la vulnerabilidad moderate de `qs`) cuenta como superficie de producción
para `npm audit`, aunque nunca se bundlea en la app real.

**Fix propuesto (no aplicado):** correr `npm audit fix` (las 4 tienen fix no-breaking disponible,
verificado con `npm audit --json`) y mover `shadcn` de `dependencies` a `devDependencies`.

**Resuelto:** `npm audit fix` (sin `--force`) corrió limpio, `npm audit` ahora da **0
vulnerabilidades**. Build verde. Pendiente, no crítico: mover `shadcn` de `dependencies` a
`devDependencies` sigue sin hacerse (no afecta el conteo de `npm audit` una vez parchadas las
transitivas, es prolijidad de superficie, no seguridad).

---

## 3 — [MEDIA] Credencial Supabase viva y sin usar en `.env` local

**Evidencia:** `.env` (raíz, correctamente gitignoreado, nunca trackeado — verificado con
`git check-ignore` y `git ls-files`) contiene `SUPABASE_SERVICE_ROLE_KEY` real (JWT de 219
caracteres) pese a que el código **no usa Supabase en absoluto** (ver `DECISIONS.md`).

**Escenario de falla concreto:** un `service_role` key de Supabase bypasea RLS por completo. No
está expuesta (nunca se commiteó), pero es una credencial viva de alto privilegio para un servicio
que el sitio no usa — cuanto más tiempo exista sin rotar/remover, más superficie de riesgo si
alguna vez se filtra por otro canal (backup del `.env`, captura de pantalla, etc.).

**Fix propuesto (no aplicado, requiere decisión del usuario):** confirmar si esta key también
sigue seteada en las env vars de Producción/Preview de Vercel; si el plan es no reintroducir
Supabase, rotarla o eliminarla de ambos lugares. Ver `OPEN_QUESTIONS.md`.

---

## 4 — [BAJA] Rate limiting del formulario de contacto no es distribuido

**Evidencia:** `src/app/actions/contact.ts` usa un `Map` en memoria por IP (5 req/10 min),
autodocumentado en el propio código como "no distribuido (cada instancia/lambda tiene su propio
Map)".

**Escenario de falla concreto:** en Vercel serverless, cada instancia fría tiene su propio Map —
un atacante que golpea distintas instancias no queda limitado de forma efectiva. Severidad baja
porque no hay auth ni datos sensibles en juego, solo spam potencial al form.

**Fix propuesto (no aplicado):** si se vuelve un problema real, mover el rate limit a un store
compartido (KV de Vercel, Upstash Redis, etc.).

---

## 5 — [BAJA] Falla silenciosa en el email de confirmación al cliente

**Evidencia:** en `contact.ts`, el segundo email (confirmación al usuario) se dispara con
`.catch(err => console.error(...))` y su fallo **no** afecta el `{ success: true }` que devuelve
la action. El email de notificación interna (el importante) sí propaga error correctamente.

**Escenario de falla concreto:** un usuario puede ver "mensaje enviado con éxito" sin recibir
nunca su email de confirmación, sin que nadie se entere.

**Fix propuesto (no aplicado):** decidir si vale la pena registrar/alertar sobre estos fallos
(no necesariamente bloquear el `success` — el lead sigue llegando igual por el email interno).

---

## 6 — [MEDIA] Documentación legacy desincronizada del código real

**Evidencia:** ver tabla completa en `CURRENT_STATE.md`. Resumen: `README.md`/`ARCHITECTURE.md`
(raíz) dicen Next 14, `.claude/CLAUDE.md` dice Next 15 (real: 16.3.3); `TASKS.md` describe un
estado pre-lanzamiento y referencia un archivo de migración de Supabase que no existe; `README.md`
y `public/llms.txt` apuntan al dominio incorrecto (`codetlon.com` en vez de `.com.ar`).

**Escenario de falla concreto:** un agente o persona que confíe en esos docs en vez de en esta
capa (`AGENTS.md`/`.ai/context/`) va a trabajar con supuestos incorrectos sobre la versión del
stack, el estado del deploy o el dominio real.

**Fix propuesto (no aplicado — decisión explícita del usuario de no tocarlos en esta tarea):**
corregir estos 4 archivos (README.md, ARCHITECTURE.md, TASKS.md, public/llms.txt) en la próxima
sesión `/cambio`. Ver `OPEN_QUESTIONS.md`.
