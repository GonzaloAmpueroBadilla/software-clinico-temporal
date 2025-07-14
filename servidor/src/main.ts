import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// 1. HEMOS CREADO ESTA FUNCIÓN LOGGER
function logger(req: any, res: any, next: () => void) {
  console.log(`Petición recibida: ${req.method} ${req.url}`);
  next(); // Le dice a la petición que continúe su camino
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  // 2. HEMOS AÑADIDO ESTA LÍNEA PARA USAR EL LOGGER
  app.use(logger);

  await app.listen(3000);
}
bootstrap();