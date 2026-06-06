import { PrismaClient } from '@prisma/client';

// Creamos una única instancia del cliente de Prisma para toda la app
// Esto ayuda a gestionar las conexiones a PostgreSQL eficientemente
const prisma = new PrismaClient();

export default prisma;