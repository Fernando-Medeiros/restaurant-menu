import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CategoryParamDTO {
    @ApiProperty({ description: 'Token' })
    @IsString()
    @IsOptional()
    token?: string;

    @ApiProperty({ description: 'Name' })
    @IsString()
    @IsOptional()
    name?: string;
}
