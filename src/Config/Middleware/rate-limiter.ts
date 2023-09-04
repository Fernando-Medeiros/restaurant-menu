import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import {
    RateLimiterModule as RateModule,
    RateLimiterGuard,
} from 'nestjs-rate-limiter';

@Module({
    imports: [
        RateModule.register({
            points: +process.env.LIMITER_MAX_REQUEST,
            duration: +process.env.LIMITER_DURATION * 60 * 1000,
            errorMessage: 'Maximum requests exceeded, wait to access again!',
        }),
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RateLimiterGuard,
        },
    ],
})
export class RateLimiterModule {}
