import { IsString, Length, IsOptional } from 'class-validator';

export class ProductParamDTO {
    @IsString()
    @IsOptional()
    token?: string;

    @IsString()
    @IsOptional()
    @Length(3, 100)
    name?: string;
}
