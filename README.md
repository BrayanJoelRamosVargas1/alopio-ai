# AlóPío

Pollería con catálogo, carrito, asistente de inteligencia artificial, confirmación de pedidos y estadísticas. Proyecto independiente de StockVision y PetVision.

## Publicación y estado verificado

- Web: https://brayanjoelramosvargas1.github.io/alopio-ai/
- Frontend HTML, CSS y JavaScript sin framework; GitHub Pages publica solo `public/` después de ejecutar las pruebas.
- Backend activo en Google Apps Script, ejecutado con la cuenta autorizada del propietario. `public/config.json` contiene su URL pública `/exec`; no contiene credenciales privadas.
- Pedidos persistentes en la hoja privada [AlóPío · Pedidos](https://docs.google.com/spreadsheets/d/1yh6C3s6V7a8sc-2C_LrWWtVkkcfFCRroWXPNfgjQJQE/edit). No se compartió públicamente la hoja.
- Verificación real del 29/10/2026: cuarto de pollo más papas, total Bs 43, confirmación explícita en la web y una sola fila automática en Sheets. ID de prueba: `233f852a-3033-41d5-9210-681f3bfedd5e`. No se realizó cobro ni entrega.
- ElevenLabs real: agente `agent_1001m645ehe2fjmv4ys682bcbxrw`, español y herramientas cliente `get_menu` / `set_cart`. Chat comprobado: dos cuartos y una gaseosa arman un carrito de Bs 72; cancelar lo vacía sin registrar pedidos. No se probó audio ni telefonía.

## Pedidos y acceso

Apps Script valida catálogo y cantidades en servidor, cotizaciones de 10 minutos, sesión firmada de 24 horas, acceso a pedidos por sesión, confirmación explícita e idempotencia. El carrito preparado por el asistente no crea pedidos hasta confirmar en la página. El registro usa bloqueo de escritura y valores calculados por el servidor. El cliente no puede asignar precios.

La gestión global se realiza desde la hoja privada por el propietario. El historial y las estadísticas públicas muestran solo pedidos de la sesión. A:L guardan productos, total, confirmación y campos internos de sesión/idempotencia. No se solicitan datos personales ni pagos. Los registros de prueba conservan `demo:true` y modo DEMO internamente para diferenciarlos de ventas operativas.

Si el backend no está disponible, el modo local conserva pedidos en el navegador y avisa al confirmar que no se enviaron al restaurante. Los datos locales no se migran automáticamente a la hoja. La apariencia comercial no acredita servicio de cocina, despacho ni entrega; estos flujos aún requieren implementación y validación del negocio.

Apps Script está sujeto a sus cuotas y disponibilidad. El rate limit es por sesión; antes de abrir una operación comercial con tráfico real se requiere control de abuso global, monitoreo y un procedimiento operativo de atención. No se contrató un plan de pago. El uso del asistente consume créditos de ElevenLabs.

## Backend Node alternativo

`npm start` sirve frontend y API en http://localhost:3000 con Node.js 22.13+, HTTP y SQLite. No está desplegado: la web publicada utiliza Apps Script. Para probar el backend Node localmente, retirar `scriptUrl` de la configuración local, sin publicar ese cambio.

Crear un `.env` privado basado en `.env.example` y ejecutar `node --env-file=.env server/index.js`. En producción: SESSION_SECRET de al menos 32 caracteres, ADMIN_TOKEN de al menos 24, PUBLIC_ORIGIN con el origen HTTPS exacto. No guardar secretos en código o Git.

El backend Node implementa cookies HttpOnly/SameSite, CSRF/Origin, administración con token e integración alternativa de Sheets mediante cuenta de servicio. Esta alternativa no se configuró con credenciales reales. `render.yaml` es un blueprint opcional: `/tmp` es efímero, no adecuado para persistencia de ventas sin almacenamiento adicional.

## Pruebas

`npm test`: catálogo, precios manipulados, cantidades, disponibilidad, estadísticas y zona horaria de Bolivia; API Node con sesión/CSRF/Origin, confirmación e idempotencia; Apps Script con servicios simulados. Cuatro pruebas aprobadas.

`node tests/browser.mjs`: Edge con viewport móvil y escritorio; carrito, confirmación, total, dashboard, cancelación, exportación y administración. Aísla la configuración para no escribir pedidos en Google durante las pruebas locales. Las pruebas simuladas no sustituyen la verificación real descrita arriba. Falta prueba en Android físico y conversación por audio. No hay telefonía Twilio/SIP.

## Archivos

Frontend: `public/`. Node: `server/index.js`, `server/sheets.js`. Apps Script: `docs/Code.gs` como versión legible del backend. Agente: `docs/elevenlabs.md`. Sheets: `docs/google-sheets.md`. Fotos: `public/ATTRIBUTIONS.md`.

## Contexto académico

UAGRM · Facultad de Ingeniería en Ciencias de la Computación y Telecomunicaciones · Ingeniería de Sistemas. INF432, Sistemas para el Soporte a la Toma de Decisiones. Docente: Ing. Jesús Bautista. Autor: Brayan Joel Ramos Vargas. Los importes iniciales y pedidos de validación se conservan como datos de prueba en la documentación y registros internos; la interfaz usa la marca AlóPío y lenguaje comercial.
