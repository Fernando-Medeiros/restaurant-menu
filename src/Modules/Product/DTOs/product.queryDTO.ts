import { IsEnum, IsOptional, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { OrderBy } from '../Enum/orderby';
import { SortBy } from '../Enum/sortby';

export class ProductQueryDTO {
    @ApiPropertyOptional({
        description: 'Take',
        default: 10,
        maximum: 99,
        minimum: 1,
    })
    @IsOptional()
    @Length(0, 2)
    take?: string = '10';

    @ApiPropertyOptional({
        description: 'Skip',
        default: 10,
        maximum: 99,
        minimum: 0,
    })
    @IsOptional()
    @Length(0, 2)
    skip?: string = '0';

    @ApiPropertyOptional({
        description: 'Order By',
        default: 'asc',
        enum: OrderBy,
    })
    @IsEnum(OrderBy)
    order?: OrderBy = OrderBy.asc;

    @ApiPropertyOptional({
        description: 'Sort By Columns',
        default: 'name',
        enum: SortBy,
    })
    @IsEnum(SortBy)
    sort?: string = SortBy.name;
}
