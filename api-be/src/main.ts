import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('COVID-19 API Reference')
    .setDescription('COVID-19 Open data project\n\nThe COVID-19 (COronaVIrus Disease 2019) is an infectious disease ' +
      'caused by severe acute respiratory syndrome coronavirus (SARS-CoV-2). This disease has been first identified ' +
      'in China (Wuhan, Hubei province) at the end of 2019 and declared as a pandemic on March 11th, 2020.\n\n' +
      'Data is taken from the Johns Hopkins University Center for Systems Science and Engineering (JHU CSSE) GitHub ' +
      'https://github.com/CSSEGISandData/COVID-19')
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
