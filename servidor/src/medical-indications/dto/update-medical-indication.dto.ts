import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalIndicationDto } from './create-medical-indication.dto';

export class UpdateMedicalIndicationDto extends PartialType(CreateMedicalIndicationDto) {}
