# PROJECT.md

## Qué es

Sitio institucional de **CodeTlon**, una agencia de software. No es un producto para terceros —
es la propia vidriera de la agencia. Tipo **L2 — marketing site multipágina** (clasificación
interna de CodeTlon para sus propios entregables).

## Para quién

Clientes potenciales de la agencia (dueños de negocio / decisores no técnicos, principalmente en
Argentina dado el dominio `.com.ar` y el copy en español) que llegan buscando contratar desarrollo
de software.

## Qué problema resuelve

- Presenta el catálogo de servicios de CodeTlon en tiers (`L1`–`L9`, ver `DOMAIN.md`), desde sitios
  simples hasta aplicaciones con auth/roles/dashboard.
- Explica el proceso/metodología de trabajo ("Método FOS").
- Muestra proyectos reales ya en producción hechos por la agencia (prueba social, sección "En
  Producción" del home).
- Captura leads: el único punto de conversión real es el formulario de `/contacto`, que dispara un
  email — no hay checkout, no hay login, no hay dashboard de cliente.

## Qué NO es

- No es una app con usuarios logueados.
- No es un e-commerce ni tiene pricing público en el código (el pricing se negocia por fuera, vía
  el contacto que genera el form).
- No persiste ningún dato de negocio (leads, formularios) en una base de datos — solo email.

## Estado

En producción desde 2026, iterando activamente (ver `CURRENT_STATE.md` para la foto verificada al
2026-09-18 y `KNOWN_ISSUES.md` para lo que hay que arreglar).
