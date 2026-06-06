// 1. Importamos primero el listener (suscriptor).
// Si no lo importamos aquí, el sistema no sabrá que debe estar escuchando
// cuando ocurra un evento.
// @ts-ignore
import './payment.listener.js';
// 2. Importamos la función de nuestro servicio que dispara la lógica.
// @ts-ignore
import { createOrder } from './src/order.service.js';

// 3. Ejecutamos la acción.
// Al llamar a esta función, el 'order.service' emitirá el evento 
// y el 'payment.listener' lo capturará automáticamente.
createOrder('ORD-999', 'USER-001', 50.00);

console.log('[System]: Flujo de eventos iniciado correctamente.');