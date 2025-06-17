import { DocumentBuilder } from "@nestjs/swagger";

export const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('NestJS API with Swagger')
    .setVersion('1.0')
    .addBearerAuth(
        {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'Authorization',
            in: 'header',
        },
        'access-token',
    )
    .build()