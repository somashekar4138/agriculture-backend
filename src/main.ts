import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestLoggerMiddleware } from 'shared/middleware/logger.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { initializeApp } from '@firebase/app';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new RequestLoggerMiddleware().use);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Agridulture API')
    .setDescription('Enhance your business with Agriculture API')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: '/api-docs.json',
    swaggerOptions: {
      url: '/api-docs.json',
      displayRequestDuration: true,
    },
  });

  const firebaseConfig = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    universe_domain: process.env.UNIVERSAL_DOMAIN,
  };
  // initializeApp(firebaseConfig);
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
  });

  app.enableCors({
    origin: '*',
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
