import { Period, Menu } from '@prisma/client';
import { ProductDTO } from 'modules/Product/@namespace';

export class MenuDTO implements Menu {
    token: string;
    productToken: string;
    period: Period;
    createdAt: Date;
    updatedAt: Date;
    product: ProductDTO;
}
