import { PartialType } from '@nestjs/mapped-types';
import { ProductCreateDTO } from './product.createDTO';

export class ProductUpdateDTO extends PartialType(ProductCreateDTO) {}
