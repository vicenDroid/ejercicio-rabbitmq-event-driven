import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Probamos la transacción atómica
  await prisma.$transaction([
    prisma.order.create({
      data: { status: 'PENDING' }
    }),
    prisma.outboxEvent.create({
      data: { payload: { orderId: '123', action: 'CREATED' }, status: 'PENDING' }
    })
  ]);
  console.log('¡Transacción exitosa! Orden y Evento guardados.');
}

main().catch(console.error).finally(() => prisma.$disconnect());