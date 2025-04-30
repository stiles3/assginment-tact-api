import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from './core/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: envConfig.FRONTEND_URL, // Explicitly allow frontend origin
    credentials: true, // Required for cookies
  });
  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
