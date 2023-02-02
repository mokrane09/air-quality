import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import constants from './common/constants/default';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // BEGIN Swagger Setup
  const config = new DocumentBuilder()

    // TODO put the strings in constants json
    .setTitle(constants.SWAGGER.TITLE)
    .setDescription(constants.SWAGGER.DESCRIPTION)
    .setVersion(constants.SWAGGER.VERSION)
    .addTag(constants.SWAGGER.TAG)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-documentation', app, document);

  await app.listen(process.env.APP_PORT);
}

// add swagger setup function here

bootstrap();
