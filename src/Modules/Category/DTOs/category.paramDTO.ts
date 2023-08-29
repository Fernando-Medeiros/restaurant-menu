import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CategoryParamDTO {
    @ApiPropertyOptional({ description: 'Token' })
    @IsString()
    @IsOptional()
    @Length(24, 24)
    token?: string;

    @ApiPropertyOptional({ description: 'Name' })
    @IsString()
    @IsOptional()
    name?: string;
}
