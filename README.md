# bapps-front
Este repositorio alberga el codigo fuente del frontend para nuestro negocio de servicios de paginas web. Nuestra mision es crear experiencias web excepcionales que cautiven a nuestros clientes y optimicen su presencia en linea.

## Scripts

- `npm run dev`: levanta la app en modo desarrollo con Vite.
- `npm run build`: genera build estatico en `dist/`.
- `npm run preview`: previsualiza localmente el build generado.

## Variables de entorno publicas

- `NEXT_PUBLIC_MAILING_API_URL`: URL base de `mailing-api` para el formulario de contacto (por ejemplo `https://mailing-api.fly.dev`).

## Deploy y operación

Sigue el estándar de bapps (manifiesto [`bapps.yml`](bapps.yml); detalle en `bapps-console/docs/estandar/`).

- **Prod directo:** merge a `main` → `deploy-prod.yml` crea el tag `v0.5.<n>` y deploya ese tag → https://bapps.com.ar.
  Sin testing ni release PR (el `health` de `bapps.yml` muestra versión y sha).
- **Volver atrás:** `gh workflow run deploy-prod.yml -R agusnarvaez/bapps-front --ref v<anterior>`. Desde una rama falla a propósito.
- El build no necesita claves (sin `BUILD_ENV`).
- Los checks corren en el pre-push local (el `ci.yml` de GitHub está apagado); operar desde la oficina:
  `bapps-console/docs/operar/desde-la-oficina.md`.
