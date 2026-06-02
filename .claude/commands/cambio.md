---
description: Abre una sesión de mantenimiento (crea la rama). Cada prompt commitea acá; no mergea ni pushea hasta /cerrar.
---

Tema de la sesión: $ARGUMENTS

Abrí una sesión de mantenimiento:

1. **Contexto:** Ya tenés `.claude/CLAUDE.md` cargado. Tené a mano `ARCHITECTURE.md` para leer SOLO lo necesario en cada cambio (no releas el repo entero).
2. **Elegí el tipo** según el trabajo (e inferilo de la descripción; si el usuario lo indica, respetalo):
   `feat/` pedido/feature nueva · `fix/` bug · `perf/` optimización · `refactor/` refactor · `chore/` deps/config/contenido · `style/` visual · `docs/` documentación.
3. **Crear la rama desde main:**
   `git checkout main && git pull origin main`
   `git checkout -b <tipo>/<tema-corto>`
4. **Avisá:** "Sesión abierta en `<tipo>/<tema>`. Por cada cosa que me pidas voy a commitear en esta rama. NO voy a mergear ni pushear a main hasta que me digas `/cerrar`."

A partir de ahora, en CADA prompt de la sesión:
- Implementás lo pedido leyendo solo los archivos necesarios.
- `git add` + `git commit` granular y convencional (`fix:`/`feat:`/...), **sin `Co-Authored-By: Claude`**.
- Si el cambio fue estructural (archivo/tabla/env nuevos), actualizás `.claude/CLAUDE.md` y `ARCHITECTURE.md` en el mismo commit.
- **NO** `git push`, **NO** merge a main. Quedás en la rama esperando el próximo pedido.

Regla: si ya estás parado en una rama de trabajo (cualquier prefijo `feat/`/`fix/`/`perf/`/..., no `main`), seguís en la misma sesión — no abras otra rama salvo que el usuario lo pida.
