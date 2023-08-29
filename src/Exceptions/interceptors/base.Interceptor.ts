/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';

@Injectable()
export abstract class BaseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(catchError(this.callback));
    }

    callback(error): any {
        return;
    }
}
