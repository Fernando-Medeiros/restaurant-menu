import { NotFoundException } from '@nestjs/common';
import { NotFoundError, BaseInterceptor } from 'exceptions/@namespace';

export class NotFoundInterceptor extends BaseInterceptor {
    callback(error: any) {
        if (error instanceof NotFoundError) {
            throw new NotFoundException(error.message);
        }
        throw error;
    }
}
