# bapps-front
Este repositorio alberga el codigo fuente del frontend para nuestro negocio de servicios de paginas web. Nuestra mision es crear experiencias web excepcionales que cautiven a nuestros clientes y optimicen su presencia en linea.

## Variables de entorno publicas

- `NEXT_PUBLIC_SHOW_TEAM_PHOTOS`: controla si la seccion de equipo muestra fotos reales (`true`) o placeholders con iniciales (`false`).
- Valor por defecto: `true` si la variable no esta definida.
- Ejemplo local: `NEXT_PUBLIC_SHOW_TEAM_PHOTOS=false` en `.env.local`.
- Ejemplo de produccion: definir `NEXT_PUBLIC_SHOW_TEAM_PHOTOS=false` en el entorno del deploy para ocultar rostros sin tocar codigo.
- `NEXT_PUBLIC_MAILING_API_URL`: URL base de `mailing-api` para el formulario de contacto (por ejemplo `https://mailing-api.fly.dev`).
