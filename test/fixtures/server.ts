import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GlobalInterceptors, GlobalPipes } from 'config/Setup/@namespace';
import { AppModule } from 'src/app.module';
import * as supertest from 'supertest';

export class ServerFixture {
    private app: INestApplication;

    request = () => supertest(this.app.getHttpServer());

    async startAsync(modules?: any[]) {
        const module: TestingModule = await Test.createTestingModule({
            imports: modules || [AppModule],
        }).compile();

        this.app = module.createNestApplication();

        GlobalPipes.setup(this.app);
        GlobalInterceptors.setup(this.app);

        await this.app.init();
    }

    async closeAsync() {
        await this.app.close();
    }
}
