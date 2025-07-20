import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateMedicalIndicationDto {
  @IsString()
  @IsNotEmpty()
  instructions: string;

  @IsUUID()
  admissionId: string;

  @IsUUID()
  medicationId: string;
}