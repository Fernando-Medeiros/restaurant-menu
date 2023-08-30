import { ConflictException } from '@nestjs/common';
import { BaseInterceptor } from 'exceptions/@namespace';

enum PrismaErrors {
    RelationConstraint = 'P2014',
}

export class DatabaseInterceptor extends BaseInterceptor {
    callback(error: any) {
        const { code, meta } = error;

        switch (code) {
            case PrismaErrors.RelationConstraint:
                const { model_a_name, model_b_name } = meta;

                throw new ConflictException({
                    statusCode: 409,
                    message: `Unable to remove a ${model_b_name} that has a relationship with ${model_a_name}`,
                    error: 'Conflict',
                });
            default:
                throw error;
        }
    }
}
