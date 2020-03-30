import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('COVID-19 API Reference')
    .setDescription('COVID-19 Open data project')
    .setVersion('1.0')
    .addTag('config')
    .addTag('data')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 1000, // 1 second.
      max: 1, // Requests per windowMs.
    }),
  );

  await app.listen(3000);
}
bootstrap();
