import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { EnvService } from './env/env.service';

import * as packageJson from '../../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Bran')
    .setDescription('API para o projeto Stark')
    .setVersion(packageJson.version)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const configService = app.get(EnvService)
  const port = configService.get('PORT')

  await app.listen(port)
}
bootstrap()
