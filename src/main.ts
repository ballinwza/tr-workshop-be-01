import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { configEnv } from './common/configs/configEnv.config';
import { GlobalExceptionFilter } from './common/utils/mongoException';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { frontendWebDomainProd, frontendWebDomainDev, jwtSecret } =
    configEnv();

  app.use(cookieParser(jwtSecret));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors({
    origin: [frontendWebDomainProd, frontendWebDomainDev],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Workshop Backend NestJs')
    .setDescription('NestJs REST api created by Tradon')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(process.env.PORT ?? 8000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
