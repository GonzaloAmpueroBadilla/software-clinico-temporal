import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMedicationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  concentration: string;

  @IsString()
  @IsNotEmpty()
  presentation: string;
}