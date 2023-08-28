import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestInterceptor } from 'interceptors/badrequest.interceptor';
import { NotFoundInterceptor } from 'interceptors/notfound.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

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
