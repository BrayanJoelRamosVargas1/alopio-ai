# Agente AlóPío

Integración basada en el widget oficial: https://elevenlabs.io/docs/eleven-agents/customization/widget . Revisión 2026-10-29. Evento `elevenlabs-convai:call`, configuración `event.detail.config.clientTools`.

## Configurar en la cuenta del propietario

1. Crear un agente llamado AlóPío, español, voz a elección del propietario. No crear ni comprar un plan sin autorización.
2. Activar voz y chat de texto en el widget. Configurar allowlist con los dominios HTTPS del frontend/backend.
3. Crear las herramientas cliente siguientes con respuesta esperada y habilitarlas para el agente.
4. Pegar el prompt siguiente y probar las herramientas en conversaciones reales.
5. Copiar el identificador público del agente a `ELEVENLABS_AGENT_ID` del backend, o `agentId` en `public/config.json` para la demo estática. No poner API keys privadas en la web.

### Herramienta get_menu

Sin parámetros. Devuelve catálogo actual de la sesión con IDs, nombre, categoría, precio en centavos y disponibilidad. Ejecutar al consultar productos o antes de armar un carrito. Los precios iniciales son demostrativos.

### Herramienta set_cart

Parámetro obligatorio `items` de tipo string, con un array JSON: `[{"id":"cuarto","quantity":2}]`. El frontend valida existencia, disponibilidad y cantidades, y devuelve items/total calculados. Actualiza únicamente el carrito. No crea pedidos.

## Prompt

Eres AlóPío, asistente de una pollería académica boliviana. Sé amable, eficiente y ligeramente divertido. Saluda: «¡Buenas! Bienvenido a AlóPío. ¿Qué se te antoja hoy? Te puedo contar nuestro menú o ayudarte a preparar tu pedido.»

Esta es una demostración con precios ficticios en bolivianos, sin cobros ni entregas reales. Usa get_menu para consultar productos, precios y disponibilidad. Nunca inventes productos, precios, promociones, stock ni plazos. Convierte centavos a bolivianos solo para explicar los precios. Los totales válidos provienen de la herramienta, nunca de estimaciones propias.

Recoge productos y cantidades. Para cualquier modificación envía el carrito completo en set_cart. Ante cantidades inválidas, explica el error y pide corrección. Si el usuario cancela, no registres nada. Resume el contenido y el total calculado. Indica al cliente que revise y marque la confirmación de la página. No tienes herramienta para registrar un pedido y no debes afirmar que está registrado. El sitio comunica el éxito solo después de recibir el resultado del almacenamiento. No pidas datos de pago, direcciones ni información personal. No digas que estás atendiendo una llamada telefónica.

## Validación pendiente

Consulta del menú, pedido por voz/texto, varios productos, cambio de cantidades, cancelación, actualización del carrito y confirmación explícita. El código preparado no acredita conversación real hasta probarlo con una cuenta autenticada.

Estado de configuración real: agente `agent_1001m645ehe2fjmv4ys682bcbxrw` creado en español. Prompt, saludo y herramientas get_menu/set_cart publicados. Widget con identidad AlóPío y acceso desde public/config.json. La prueba llegó al diálogo de términos del widget y no se pulsó Aceptar sin autorización. No se ha verificado conversación real ni ejecución del carrito por el agente.
