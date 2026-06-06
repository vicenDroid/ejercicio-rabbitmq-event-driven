
import { eventBus } from '../event_bus.js';
import { OrderCreatedEvent } from '../src/events/order_created.event.js';

// Función para crear un pedido
export function createOrder(orderId: string, userId: string, total: number) {
  // Aquí realizaríamos la lógica de base de datos...
  console.log(`[OrderService]: Pedido ${orderId} creado correctamente.`);

  // Creamos el objeto del evento con los datos recibidos
  const event: OrderCreatedEvent = { orderId, userId, total };

  // Emitimos el evento hacia el bus. Cualquier módulo suscrito
  // a 'order.created' recibirá este objeto 'event'.
  eventBus.emit('order.created', event);
}