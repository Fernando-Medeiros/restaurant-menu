import { BadRequestException } from '@nestjs/common';
import BaseInterceptor from './_base.Interceptor';
import BadRequestError from 'errors/BadRequestError';

export class BadRequestInterceptor extends BaseInterceptor {
    callback(error: any) {
        if (error instanceof BadRequestError) {
            throw new BadRequestException(error.message);
        }
        throw error;
    }
}
