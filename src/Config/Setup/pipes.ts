import { INestApplication, ValidationPipe } from '@nestjs/common';

export class GlobalPipes {
    static readonly pipes = [
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    ];

    static setup(app: INestApplication) {
        app.useGlobalPipes(...GlobalPipes.pipes);
    }
}
