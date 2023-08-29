import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsOptional } from 'class-validator';

export class ProductParamDTO {
    @ApiProperty({ description: 'Token' })
    @IsString()
    @IsOptional()
    @Length(24, 24)
    token?: string;

    @ApiProperty({ description: 'Name' })
    @IsString()
    @IsOptional()
    @Length(3, 100)
    name?: string;
}
