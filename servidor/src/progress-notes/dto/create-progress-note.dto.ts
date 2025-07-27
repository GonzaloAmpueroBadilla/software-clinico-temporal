import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProgressNoteDto {
  @IsString()
  @IsNotEmpty()
  note: string;

  @IsUUID()
  admissionId: string;
}