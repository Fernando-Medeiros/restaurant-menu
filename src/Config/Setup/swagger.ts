import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class Swagger {
    static readonly version = '1.0';
    static readonly title = 'Restaurant-Menu-RestAPI';
    static readonly description = '';
    static readonly path = '/';
    static readonly contact = {
        name: 'Fernando-Medeiros',
        url: 'https://github.com/Fernando-Medeiros',
        email: 'fernandomedeiros3k@gmail.com',
    };

    static setup(app: INestApplication) {
        SwaggerModule.setup(
            Swagger.path,
            app,
            SwaggerModule.createDocument(
                app,
                new DocumentBuilder()
                    .setTitle(Swagger.title)
                    .setVersion(Swagger.version)
                    .setDescription(Swagger.description)
                    .setContact(
                        Swagger.contact.name,
                        Swagger.contact.url,
                        Swagger.contact.email,
                    )
                    .build(),
            ),
        );
    }
}
