import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from './ModulesHelpers/Swagger/swagger.config';
import { BadRequestInterceptor } from 'interceptors/badrequest.interceptor';
import { NotFoundInterceptor } from 'interceptors/notfound.interceptor';

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
        ...[new NotFoundInterceptor(), new BadRequestInterceptor()],
    );

    await app.listen(3000);
}
bootstrap();
