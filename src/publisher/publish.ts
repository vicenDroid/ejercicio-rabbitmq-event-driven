import 'dotenv/config';
import amqp from 'amqplib';

async function publishMessage() {
  try {
    // Usamos process.env.RABBITMQ_URL, con un valor por defecto si no existe
    const rabbitUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
    
    // 1. Conexión al servidor de RabbitMQ
    const connection = await amqp.connect(rabbitUrl);
    const channel = await connection.createChannel();

    // 2. Definir el nombre de la cola y asegurar que existe
    const queue = 'eventos-microservicios';
    const message = '¡Hola! Este es un mensaje de prueba con variables de entorno';

    await channel.assertQueue(queue, { durable: false });

    // 3. Enviar el mensaje
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Mensaje enviado a ${rabbitUrl}: "${message}"`);

    // 4. Cerrar la conexión tras un breve momento
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);

  } catch (error) {
    console.error('Error al publicar el mensaje:', error);
  }
}

publishMessage();