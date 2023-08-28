import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class SwaggerConfig {
    readonly version = '1.0';
    readonly title = 'Restaurant-Menu-RestAPI';
    readonly description = '';
    readonly path = '/';
    readonly contact = {
        name: 'Fernando-Medeiros',
        url: 'https://github.com/Fernando-Medeiros',
        email: 'fernandomedeiros3k@gmail.com',
    };

    constructor(private app: INestApplication) {}

    document() {
        return SwaggerModule.createDocument(
            this.app,
            new DocumentBuilder()
                .setTitle(this.title)
                .setDescription(this.description)
                .setVersion(this.version)
                .setContact(
                    this.contact.name,
                    this.contact.url,
                    this.contact.email,
                )
                .build(),
        );
    }

    setup() {
        SwaggerModule.setup(this.path, this.app, this.document());
    }
}
