import { EventEmitter } from 'node:events';

// Creamos una instancia única del bus que compartiremos en toda la app
export const eventBus = new EventEmitter();