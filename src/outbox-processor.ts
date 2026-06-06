import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function processOutbox() {
  // 1. Buscar eventos pendientes
  const events = await prisma.outboxEvent.findMany({
    where: { status: 'PENDING' },
  });

  for (const event of events) {
    try {
      console.log(`Enviando evento al bus: ${event.id}`, event.payload);

      // 2. Aquí iría la lógica de publicar en RabbitMQ/Kafka
      // await bus.publish(event.payload);

      // 3. Marcar como procesado
      await prisma.outboxEvent.update({
        where: { id: event.id },
        data: { status: 'PROCESSED' },
      });
      console.log(`Evento ${event.id} marcado como PROCESSED`);
    } catch (error) {
      console.error(`Error procesando evento ${event.id}`, error);
    }
  }
}

// Ejecutar cada 5 segundos
setInterval(processOutbox, 5000);