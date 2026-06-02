import 'dotenv/config';
import amqp from 'amqplib';

async function consumeMessages() {
  try {
    // Usamos la misma lógica de conexión con variables de entorno
    const rabbitUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
    
    // 1. Conexión al servidor de RabbitMQ
    const connection = await amqp.connect(rabbitUrl);
    const channel = await connection.createChannel();

    // 2. Aseguramos que la cola existe
    const queue = 'eventos-microservicios';
    await channel.assertQueue(queue, { durable: false });

    console.log(`[*] Esperando mensajes en ${rabbitUrl}. Para salir presiona CTRL+C`);

    // 3. Consumir el mensaje
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(`[x] Mensaje recibido: "${msg.content.toString()}"`);
        // Confirmamos al servidor que ya procesamos el mensaje
        channel.ack(msg);
      }
    });

  } catch (error) {
    console.error('Error en el consumidor:', error);
  }
}

consumeMessages();