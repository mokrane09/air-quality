import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // BEGIN Swagger Setup
  const config = new DocumentBuilder()

    // TODO put the strings in constants json
    .setTitle('Air Quality API')
    .setDescription('The air pollution API documentation')
    .setVersion('1.0')
    .addTag('pollution')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-documentation', app, document);

  await app.listen(process.env.APP_PORT);
}

// add swagger setup function here

bootstrap();
