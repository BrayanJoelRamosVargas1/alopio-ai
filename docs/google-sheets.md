# Google Sheets

Hoja privada preparada: https://docs.google.com/spreadsheets/d/1yh6C3s6V7a8sc-2C_LrWWtVkkcfFCRroWXPNfgjQJQE/edit . Pestaña Pedidos, A:J. No se amplió su acceso público.

## Integración servidor

1. En un proyecto Google Cloud del propietario, habilitar Google Sheets API.
2. Autorizar una cuenta de servicio para escribir exclusivamente en esta hoja compartiéndola con su correo como editor. La creación de una credencial y la ampliación de permisos requieren aprobación del propietario en esa etapa.
3. Configurar en el entorno privado del backend GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY y GOOGLE_SHEET_ID. No publicar ni enviar la clave en el chat.
4. Crear pedido DEMO confirmado y comprobar su ID en la hoja. Consultar el panel administrativo y estado synced. Reintentar y verificar que el ID no se duplica.

La autenticación usa JWT RS256 y el alcance spreadsheets. Fuentes oficiales: https://developers.google.com/identity/protocols/oauth2/service-account y https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/update . Escritura RAW, sin fórmulas derivadas de texto del usuario.

La base SQLite es fuente de verdad. La hoja es un espejo de los últimos 5.000 pedidos. Cada sincronización escribe la tabla en A:J, incluidos encabezados e IDs, en vez de anexar repetidamente por una respuesta de red ambigua. No editar esa pestaña como catálogo ni colocar otros datos debajo. No es una sincronización bidireccional. La cola se serializa por proceso y los errores conservan el pedido local; el administrador puede reintentar. No ejecutar varias réplicas del backend con distintos discos SQLite.

Estado: adaptador preparado y validado sin credenciales, escritura externa real pendiente.

## Alternativa Apps Script preparada

`docs/Code.gs` implementa un backend DEMO con catálogo autoritativo, sesiones firmadas, cotizaciones de diez minutos, confirmación explícita, bloqueo de escritura e idempotencia. Se preparó un proyecto en la cuenta del propietario: https://script.google.com/home/projects/1GLsMCkrZ5VVGI_844RlYnIBQN8RpM8lxpfxV-R-iuVVLFOU_OzYFUqep/edit .

Pendiente de autorización para publicar la aplicación web que se ejecuta como propietario. Google solicitará permisos de hojas de cálculo. No se amplía el acceso sin confirmación. Una vez publicado, copiar la URL /exec pública en `scriptUrl` de public/config.json. No contiene credenciales privadas. Las sesiones se transmiten como capacidades firmadas, no como cookies de terceros. El script siempre escribe DEMO y restringe la consulta a la sesión. La hoja es privada; las columnas K:L contienen identificadores técnicos de sesión e idempotencia. El catálogo del script debe mantenerse sincronizado con el archivo público.

El frontend envía JSON mediante Content-Type text/plain para evitar preflight. Se debe verificar la respuesta real desde Pages antes de afirmar la integración. El panel administrativo con token requiere el backend Node; con Apps Script la administración se realiza en la hoja privada. Es una alternativa académica sujeta a cuotas de Apps Script, sin SLA ni garantías de producción.
