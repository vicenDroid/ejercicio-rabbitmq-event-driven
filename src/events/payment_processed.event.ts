// Definimos la estructura de datos que se enviará tras procesar el pago
export interface PaymentProcessedEvent {
  orderId: string;
  paymentId: string;
  status: 'success' | 'failed';
}