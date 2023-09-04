import 'tsconfig-paths/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    Swagger,
    GlobalPipes,
    GlobalInterceptors,
} from 'config/Setup/@namespace';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    Swagger.setup(app);
    GlobalPipes.setup(app);
    GlobalInterceptors.setup(app);

    await app.listen(process.env.PORT || 3000);
}
bootstrap();
