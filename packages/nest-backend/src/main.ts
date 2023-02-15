import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'backendnestlib';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  // deepcode ignore NoEffectExpression: <please specify a reason of ignoring this>
  app.setGlobalPrefix('backapi');

  const configs = new DocumentBuilder()
    .setTitle('A-la Beauty Shop')
    .setDescription('WholesaleShop')
    .addTag('a_la')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, configs);
  SwaggerModule.setup('api', app, doc);

  await app.listen(4000);
}

bootstrap();
