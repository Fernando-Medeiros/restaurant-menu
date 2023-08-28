import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestInterceptor } from 'interceptors/badrequest.interceptor';
import { NotFoundInterceptor } from 'interceptors/notfound.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalInterceptors(
        ...[new NotFoundInterceptor(), new BadRequestInterceptor()],
    );

    await app.listen(3000);
}
bootstrap();
