// Importamos el bus de eventos centralizado para poder suscribirnos
import { eventBus } from './event_bus.js';

// Importamos la interfaz del evento para tener tipado fuerte
import { OrderCreatedEvent } from './src/events/order_created.event.js';

// El método 'on' es el que hace la "magia". 
// Le decimos: "Cuando escuches el evento 'order.created', ejecuta esta función".
eventBus.on('order.created', (event: OrderCreatedEvent) => {
  // Esta lógica se ejecuta de forma automática al emitirse el evento.
  // El servicio de pedidos no necesita saber qué ocurre aquí, 
  // cumpliendo así con el principio de desacoplamiento.
  console.log(`[PaymentListener]: Recibido aviso de nuevo pedido.`);
  console.log(`[PaymentListener]: Procesando pago para el pedido ID: ${event.orderId}.`);
  console.log(`[PaymentListener]: Monto a cobrar: ${event.total}€.`);
});