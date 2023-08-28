import { PartialType } from '@nestjs/mapped-types';
import { CategoryCreateDTO } from './category.createDTO';

export class CategoryUpdateDTO extends PartialType(CategoryCreateDTO) {}
