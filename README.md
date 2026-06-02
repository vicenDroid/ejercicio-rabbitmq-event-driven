# Proyecto RabbitMQ con TypeScript

Este proyecto implementa un patrón de comunicación entre microservicios utilizando RabbitMQ.

## Prerrequisitos
- Docker Desktop instalado y corriendo.
- Node.js instalado.

## Cómo levantar el entorno
1. Arranca el contenedor de RabbitMQ con Docker:
   ```bash
   docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management