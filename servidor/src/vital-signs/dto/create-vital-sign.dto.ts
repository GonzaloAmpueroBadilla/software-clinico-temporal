import { IsString, IsOptional, IsUUID, IsNumber } from 'class-validator';

export class CreateVitalSignDto {
  @IsUUID()
  admissionId: string;

  @IsOptional()
  @IsString()
  blood_pressure?: string;

  @IsOptional()
  @IsNumber()
  heart_rate?: number;
  
  @IsOptional()
  @IsNumber()
  respiratory_rate?: number;
  
  @IsOptional()
  @IsNumber()
  temperature?: number;
  
  @IsOptional()
  @IsNumber()
  oxygen_saturation?: number;
  
  @IsOptional()
  @IsNumber()
  pain_level?: number;
  
  @IsOptional()
  @IsNumber()
  glasgow_scale?: number;
}