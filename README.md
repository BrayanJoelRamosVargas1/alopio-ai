# AlóPío AI

Pollería académica independiente de StockVision y PetVision. Catálogo editable, carrito, confirmación explícita, registro de pedidos y analítica explicable. Precios ficticios en BOB. No cobra ni realiza entregas reales.

UAGRM. Facultad de Ingeniería en Ciencias de la Computación y Telecomunicaciones. Ingeniería de Sistemas. Materia INF432, Sistemas para el Soporte a la Toma de Decisiones. Docente: Ing. Jesús Bautista. Autor: Brayan Joel Ramos Vargas.

## Estado verificable

- Frontend sin framework, responsive, publicado como demo local en GitHub Pages.
- Demo local: registra exclusivamente pedidos confirmados en localStorage `alopio_demo_orders_v1`. No aparenta enviarlos a una cocina ni a Google Sheets. Cancelar el carrito no crea ventas.
- Backend independiente Node.js 22.13+, HTTP y SQLite, probado localmente. Cotizaciones de 10 minutos, precios autoritativos desde catálogo, sesión firmada HttpOnly, SameSite, protección CSRF/Origin, autorización administrativa e idempotencia por sesión. No confía en precios del frontend.
- Agente ElevenLabs creado y configurado en la cuenta del propietario: `agent_1001m645ehe2fjmv4ys682bcbxrw`, español, prompt y herramientas cliente `get_menu` y `set_cart` publicados. Widget real ya carga en la página. La conversación de prueba está pendiente de aceptación explícita de los términos de grabación y almacenamiento.  Sin conversaciones pregrabadas ni IA simulada. El agente prepara el carrito, el cliente confirma en la página.
- Google Sheets: adaptador backend con cuenta de servicio. Sincronización por IDs mediante un snapshot de la tabla completa, usando values.update y valueInputOption=RAW para prevenir duplicación por reintentos. Requiere cuenta autorizada, ID de hoja y credenciales privadas en backend. No se ha probado escritura real con credenciales.
- Hoja creada en la cuenta del propietario: https://docs.google.com/spreadsheets/d/1yh6C3s6V7a8sc-2C_LrWWtVkkcfFCRroWXPNfgjQJQE/edit . Privada. Pestaña `Pedidos`, columnas A:J. Esta hoja fue preparada manualmente, no demuestra una sincronización automática.

## Uso local

`npm test` ejecuta pruebas sin instalar dependencias. `npm start` sirve frontend y backend en http://localhost:3000. En desarrollo, la clave de sesión es efímera y el panel administrativo permanece bloqueado salvo configurar ADMIN_TOKEN en entorno.

Para producción, crear un archivo privado `.env` basado en `.env.example` y ejecutar `node --env-file=.env server/index.js`. Nunca guardar secretos en `public/config.json`, JavaScript, URLs ni Git.

`SESSION_SECRET`: al menos 32 caracteres aleatorios. `ADMIN_TOKEN`: al menos 24. `PUBLIC_ORIGIN`: origen HTTPS exacto, sin barra final. `DEMO_MODE=true` mantiene las transacciones demostrativas. El acceso al panel dura en memoria de la página, no se persiste el token.

## Despliegue

GitHub Pages publica `public/` únicamente, después de pasar tests. Allí no corre Node ni SQLite. El modo estático está etiquetado DEMO LOCAL. Para usar la integración completa, desplegar el backend y su frontend juntos en el mismo origen HTTPS. Así las cookies SameSite=Strict funcionan sin excepciones de terceros. La publicación estática separada se conserva como demostración.

`render.yaml` prepara un despliegue de demostración gratuito sujeto a disponibilidad y cuotas de Render. **El disco /tmp es efímero** y sus pedidos se pierden al reiniciar. Para persistencia fiable, usar volumen duradero con DB_PATH o migrar a una base gestionada. No declarar este blueprint listo para ventas reales. Las cuotas, suspensión por inactividad y costos deben verificarse en el proveedor antes de contratar. No se ha desplegado un backend externo ni contratado un plan.

## Analítica

Solo incluye estados confirmed, preparing y delivered. Cancelados no suman ingresos. Totales enteros en centavos y conversión de visualización a bolivianos. Ticket promedio, productos, categorías, fechas, horas de Bolivia y estados. La página muestra datos de la sesión del cliente. El administrador autenticado puede consultar el conjunto del backend. No mezcla demo y ventas reales de un restaurante. Las recomendaciones señalan el producto con mayor cantidad en la muestra, sin inferir causalidad.

## Pruebas

`npm test`: precios manipulados, cantidades inválidas, disponibilidad, agregación, fechas/horas de Bolivia, rechazo sin sesión/CSRF/Origin, confirmación requerida, idempotencia, administración protegida y cancelaciones.

`node tests/browser.mjs`: Edge de escritorio y viewport móvil. Verifica catálogo, carrito, cambio/cancelación, checkbox obligatorio, confirmación, total, dashboard, exportación y administración en modo estático y backend. Requiere Playwright del runtime local indicado en el archivo.

Pendiente: voz/texto reales con ElevenLabs, registro autenticado en Google Sheets, backend HTTPS externo y prueba en Android físico. No hay telefonía Twilio/SIP. El widget ElevenLabs puede consumir créditos de su cuenta cuando esté activado; no se activó un plan de pago.

## Archivos

`public/index.html`, `styles.css`, `catalog.json`, `config.json`, `js/app.js`, `js/domain.js`. Backend: `server/index.js`, `server/sheets.js`. Configuración del agente: `docs/elevenlabs.md`. Configuración de Sheets: `docs/google-sheets.md`. Créditos fotográficos en `public/ATTRIBUTIONS.md`.

## Backend Google Apps Script preparado

Se creó un proyecto vinculado a la hoja y se guardó el código de pedidos. El propietario aún debe autorizar su ejecución con permisos de hojas y su publicación como web app DEMO. Hasta entonces `scriptUrl` permanece sin configurar y la web publicada continúa en modo local, aunque el widget de ElevenLabs sí esté instalado. La hoja no recibe pedidos automáticamente todavía. El adaptador alternativo se prueba con mocks en `tests/apps-script.test.js`; esto no prueba permisos, CORS o escritura en Google.

## Presentación comercial
La interfaz pública usa la marca AlóPío y lenguaje de pollería. La procedencia académica y el carácter de prueba se conservan en la documentación y los registros internos. Mientras no exista conexión al backend, la confirmación indica que se guarda en el dispositivo y no se envía al restaurante. La apariencia comercial no acredita operación de cocina, entrega ni cobros.

Prueba real de chat web completada con ElevenLabs: dos cuartos y una gaseosa actualizan el carrito a Bs 72; cancelar deja el carrito vacío y cero pedidos confirmados. No se probó audio ni llamada telefónica. La autorización de Apps Script aún espera completar la ventana de Google.
