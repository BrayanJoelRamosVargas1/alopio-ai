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
