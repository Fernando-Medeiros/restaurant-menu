import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ESortBy } from '../Enums/sortby.enum';
import { QueryDTO } from 'modulesHelpers/Common/@namespace';

export class CategoryQueryDTO extends QueryDTO {
    @ApiPropertyOptional({
        description: 'Sort By Columns',
        default: 'name',
        enum: ESortBy,
    })
    @IsEnum(ESortBy)
    public sort?: ESortBy = ESortBy.name;
}
