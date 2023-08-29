import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Length, IsOptional } from 'class-validator';

export class ProductParamDTO {
    @ApiPropertyOptional({ description: 'Token' })
    @IsString()
    @IsOptional()
    @Length(24, 24)
    token?: string;

    @ApiPropertyOptional({ description: 'Name' })
    @IsString()
    @IsOptional()
    @Length(3, 100)
    name?: string;
}
