import { BadRequestException } from '@nestjs/common';
import { BadRequestError, BaseInterceptor } from 'exceptions/@namespace';

export class BadRequestInterceptor extends BaseInterceptor {
    callback(error: any) {
        if (error instanceof BadRequestError) {
            throw new BadRequestException(error.message);
        }
        throw error;
    }
}
