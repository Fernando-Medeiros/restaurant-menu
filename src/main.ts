import 'tsconfig-paths/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from 'modulesHelpers/Swagger/swagger.config';
import {
    BadRequestInterceptor,
    DatabaseInterceptor,
    NotFoundInterceptor,
} from 'exceptions/@namespace';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    new SwaggerConfig(app).setup();

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );

    app.useGlobalInterceptors(
        ...[
            new NotFoundInterceptor(),
            new BadRequestInterceptor(),
            new DatabaseInterceptor(),
        ],
    );

    await app.listen(3000);
}
bootstrap();
