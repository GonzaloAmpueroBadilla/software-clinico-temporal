import { IsUUID } from 'class-validator';

export class CreateAdmissionDto {
  @IsUUID()
  patientId: string; // DEBE SER STRING (el UUID público)

  @IsUUID()
  diagnosisId: string;
}