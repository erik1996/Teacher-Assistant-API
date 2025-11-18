import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties not in the DTO
      forbidNonWhitelisted: true, // throws error if extra properties are sent
      transform: true, // automatically transforms payloads to DTO classes
    }),
  );
  app.enableCors({
    origin: '*', //current react app port
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, Timezone',
  });

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
