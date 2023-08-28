import { NotFoundException } from '@nestjs/common';
import BaseInterceptor from './_base.Interceptor';
import NotFoundError from 'errors/NotFoundError';

export class NotFoundInterceptor extends BaseInterceptor {
    callback(error: any) {
        if (error instanceof NotFoundError) {
            throw new NotFoundException(error.message);
        }
        throw error;
    }
}
