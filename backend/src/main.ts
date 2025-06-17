import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { config } from './config_swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector)
  app.useGlobalGuards(new JwtAuthGuard(reflector))
  app.enableCors()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  const port = process.env.APP_PORT ?? 3000
  await app.listen(port)

  const url = await app.getUrl()
  console.log(`🚀 Server is running: ${url}/`)
  console.log(`🚀 Swagger is running at: ${url}/swagger`)
}
bootstrap();
