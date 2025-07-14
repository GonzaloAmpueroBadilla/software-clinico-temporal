import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  rut: string;

  @IsDateString()
  @IsNotEmpty()
  birth_date: string;
}