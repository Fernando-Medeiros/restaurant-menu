import { IsEnum, IsOptional, IsString, Max, Min } from 'class-validator';
import { OrderBy } from '../Enum/orderby';
import { SortBy } from '../Enum/sortby';

export class CategoryQueryDTO {
    @IsString()
    @IsOptional()
    @Min(1)
    @Max(100)
    take?: number = 10;

    @IsString()
    @IsOptional()
    @Min(0)
    skip?: number = 0;

    @IsString()
    @IsOptional()
    @IsEnum(OrderBy)
    order?: OrderBy = OrderBy.asc;

    @IsString()
    @IsOptional()
    @IsEnum(SortBy)
    sort?: SortBy = SortBy.name;
}
