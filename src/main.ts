// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración global de prefijos de rutas
  app.setGlobalPrefix('api');

  // Usar un ValidationPipe global para validar DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // elimina propiedades no definidas en el DTO
    forbidNonWhitelisted: true, // lanza un error si hay propiedades no definidas en el DTO
    transform: true, // transforma los objetos entrantes a sus tipos definidos en el DTO
  }));

  const config = new DocumentBuilder()
  .setTitle('API')
  .setDescription('CRUD application')
  .setVersion('3.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  // CORS (Cross-Origin Resource Sharing) habilitado
  app.enableCors();

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
