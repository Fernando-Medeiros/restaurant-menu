import { Period } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { MenuDTO } from 'modules/Menu/@namespace';
import { ProductResource } from 'modules/Product/@namespace';

export class MenuResource {
    @ApiProperty()
    token: string;
    @ApiProperty({ enum: Period })
    period: Period;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty({ type: ProductResource })
    product: ProductResource;

    constructor(dto: MenuDTO) {
        this.token = dto.token;
        this.period = dto.period;
        this.createdAt = dto.createdAt;
        this.product = new ProductResource(dto.product);
    }

    static toArray(arr: MenuDTO[]): MenuResource[] {
        return arr?.length > 0 ? arr.map((c) => new MenuResource(c)) : [];
    }
}
