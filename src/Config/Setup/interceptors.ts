import { INestApplication } from '@nestjs/common';
import {
    BadRequestInterceptor,
    BaseInterceptor,
    DatabaseInterceptor,
    NotFoundInterceptor,
} from 'exceptions/@namespace';

export class GlobalInterceptors {
    static readonly interceptors: BaseInterceptor[] = [
        new NotFoundInterceptor(),
        new BadRequestInterceptor(),
        new DatabaseInterceptor(),
    ];

    static setup(app: INestApplication) {
        app.useGlobalInterceptors(...GlobalInterceptors.interceptors);
    }
}
