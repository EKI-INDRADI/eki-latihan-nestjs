import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  // =============
  const app_fastify = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app_fastify.enableCors();
  app_fastify.setGlobalPrefix('/fastify');
  app_fastify.useGlobalPipes(
    new ValidationPipe({

      //=============== ERROR MESSAGE TO OBJECT DETAIL VALIDATION
      // import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
      //=============== /ERROR MESSAGE TO OBJECT DETAIL VALIDATION
    })
  ) // validation DTO
  await app_fastify.listen(3001);
  // =============

  const app = await NestFactory.create(AppModule); //default express
  // =============
  app.enableCors();
  app.setGlobalPrefix('/express');
  app.useGlobalPipes(
    new ValidationPipe({
      //=============== ERROR MESSAGE TO OBJECT DETAIL VALIDATION
      // import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
      //=============== /ERROR MESSAGE TO OBJECT DETAIL VALIDATION

    })
  ) // validation DTO
  // =============
  await app.listen(3000);
}
bootstrap();
