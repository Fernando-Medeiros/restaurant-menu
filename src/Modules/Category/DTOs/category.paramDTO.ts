import { IsOptional, IsString } from 'class-validator';

export class CategoryParamDTO {
    @IsString()
    @IsOptional()
    token?: string;

    @IsString()
    @IsOptional()
    name?: string;
}
