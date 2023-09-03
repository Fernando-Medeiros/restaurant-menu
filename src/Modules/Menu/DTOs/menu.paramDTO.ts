import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Length, IsOptional } from 'class-validator';

export class MenuParamDTO {
    @ApiPropertyOptional({ description: 'Menu Token' })
    @IsString()
    @IsOptional()
    @Length(24, 24)
    token?: string;

    @ApiHideProperty()
    @IsOptional()
    productToken?: string;
}
