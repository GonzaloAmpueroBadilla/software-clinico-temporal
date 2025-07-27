import { PartialType } from '@nestjs/mapped-types';
import { CreatePhysicalExamDto } from './create-physical-exam.dto';

export class UpdatePhysicalExamDto extends PartialType(CreatePhysicalExamDto) {}
