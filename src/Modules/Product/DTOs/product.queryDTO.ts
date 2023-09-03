import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ESortBy } from '../Enums/sortby.enum';
import { QueryDTO } from 'modulesHelpers/Common/@namespace';

export class ProductQueryDTO extends QueryDTO {
    @ApiPropertyOptional({
        description: 'Sort By Columns',
        default: 'name',
        enum: ESortBy,
    })
    @IsEnum(ESortBy)
    sort?: ESortBy = ESortBy.name;
}
