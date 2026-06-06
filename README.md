## Documentación del Proyecto: Arquitectura Event-Driven

   Este proyecto implementa un sistema de comunicación entre microservicios utilizando RabbitMQ y el patrón Transactional Outbox para garantizar la integridad y consistencia de los datos.

   ### 1. Prerrequisitos
   
   Docker Desktop instalado y corriendo.

   Node.js instalado.

   Prisma v5.18.0.

   ### 2. Cómo levantar el entorno (Infraestructura)

   Arranca el contenedor de RabbitMQ con Docker:

   Bash
   docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

   ### 3. Patrón Transactional Outbox

   Para garantizar la consistencia en nuestras operaciones, utilizamos el patrón Transactional Outbox. Esto asegura que si una orden se guarda en la base de datos, el evento se registre simultáneamente como pendiente de procesamiento.

   Configuración del Entorno y Resolución de Conflictos (IDE)
   Este proyecto utiliza Prisma v5.18.0 para garantizar la estabilidad y compatibilidad con nuestra arquitectura actual.

   Nota sobre validaciones de VS Code:
   Si al abrir el proyecto en VS Code observas advertencias de validación en el archivo schema.prisma (como "datasource property 'url' is no longer supported"), esto es debido a una incompatibilidad entre la extensión de Prisma (que intenta validar contra la versión 7.x) y nuestra versión del proyecto.

   Para resolverlo y mantener el entorno limpio, hemos aplicado las siguientes buenas prácticas:

   Versiones fijadas: Las versiones de @prisma/client y prisma están estrictamente fijadas en 5.18.0 dentro del package.json.

   Entorno local: El proyecto utiliza su propia versión local de Prisma a través de node_modules para asegurar la ejecución correcta, independientemente de la versión de Prisma instalada globalmente en tu máquina.

   Validación: No es necesario desactivar los linters del editor; el proyecto está correctamente sincronizado con la base de datos mediante npx prisma migrate dev. Si persisten avisos visuales en el IDE, es un comportamiento conocido del servidor de lenguaje de VS Code que no afecta a la compilación ni ejecución del código.

   ### 4. Cómo probar el sistema
   
   Instalar dependencias: npm install

   Sincronizar base de datos: npx prisma migrate dev --name init

   Iniciar el procesador (Relay): npm run start:outbox

   Simulación: Al ejecutar la lógica de createOrder, el outbox-processor detectará automáticamente el evento, lo enviará al bus y lo marcará como PROCESSED.