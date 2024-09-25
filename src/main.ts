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
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC0IIz+dg94VZs3\nUFnpVHx34+TFGvnTWSvZr8nKxv3acFH/qr4238VCrF7gr3eEAYIalgiwiJkx1AuW\nT4vh85Bt1BRvyvxRJiwKqKo6M2qlEmBb9zmYwxWG7y5HzphxhR1KgQgmHjOJ+flw\n3iy35R9s1IRvxxYffWwtEHgij+zDJkvLUIodig7o/hV2p8sgsuHw+5FQpH7xo/ZA\nzJeDSTp0wMdNBL9GVgVFShXu39F2JvQBh9klU2d/BINXXIt6MljPmiA2aYaT/9PY\n0fN0vL4BmRLt0zHKh+yn66zWClKkm6z18xHclsd1P95O7W37fQeDt4ia4fs4HiCQ\ne99FaTu9AgMBAAECggEAGgE3CceWnStSwM4XZPG/FHnwvaoS1jnh9EgGLIHFBWPA\n2tXWJ0rwChujiPGcIhErrNXrRD08TK7Ny3IJgmHtAIYlOyyFd9u4cQN/q+5fX5yD\nD9Pl21GSyou+VTyU0pLCs05klEg47ZsKsYpJz3TDMC2QPyjxXzN2yhy+E1NO/a9M\nBPPMRZN2JE+5MiWxC6554qDKbGEC8QAX9OXMSapvPuAqkSQHrBXVE8apbk91ICHr\nQkYpAqwzSp08y7fVBq0+2ucF9khIWbM/x16o0iZMACjM68wyDS8cKJrtHuidBuRa\nh3jAql7/JiUppUcjHCh5iviwAOG710RsqDJ4iDodiwKBgQDnh4cpe+EtGikNB22y\n35BqUCUnlGmcsVQKJL6uxxV6qwLf+DH+9gLmyVXnyxpzEf9Dqw4jBT5m38OsNXQ8\nQpxbhXat4FcFraOJ1/BvtiKkJWKBxGsgGm0jveejZnYDLOfs2E4/dIST0+Eh36/b\nMXss/5LmUqJM/l+LQkSQNBFRcwKBgQDHKjx40uki96a8+dfU+weAz7IPftpZZYBJ\nszcLV5IxsJFQslRmZnGUtPhT8Gt1wKX0DmlHtcveRzj0pyH9B/w5N4bKRtwPqquG\nsGo9+7GKt1p0vFYl3LegBm/W5dbYaqMIBkk3dg4hCdC0thvWGVYMsePqCRrSqGaH\nOBR3fE8yDwKBgQDLSN3N+Kze8uc0P197/HtKPRBCTjbkk3YcaeLahoY/bENb7wnG\nuK4XgJNir5uLiTO9cEU7TnFZ1gJyA4UJG9s5KFfplt4RaEH815KOIzcLNJ/nHFSK\nnWlSRn1JpL7dTuJbvBgH8wAs4436NfKr3CgwfD246LkELRwqo4abrnu+LQKBgGYm\n5albFDTZLO5Ufz1AHBMXdE66U6fyhaBHiX4JxnQyCfaH4P48oRkS0SPMdnGJBBVv\nptQfDJfPlAj4CFjN1bJLJpltSsXGVf/ZUETGacOqU3z4dH8q/AvaAVcJv+50k3Y0\nMy19IbYUYLWviguAJ0CPpUSOsvFFaoEEZIr8eWpFAoGBAKNDR56Vzp1dXhLXCG0n\nQmlM/ROsGCexT5UAwzEbNyNOW/XhKPoN6kaOYldJLKcdKJjAokuFCokWObMzUjLr\n8lILimqDDYZ1WKNYwVfuEq/CG0r0Sak6mNcP5DM6qflaz7/nLr0bgxvKTb3sk+25\nmWY7n4uikW6pVLTUnQ2eUwYV\n-----END PRIVATE KEY-----\n',
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
