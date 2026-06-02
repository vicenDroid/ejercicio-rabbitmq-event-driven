// Definimos la estructura del evento de orden creada
export interface OrderCreatedEvent {
  orderId: string;
  userId: string;
  total: number;
}