import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreatePhysicalExamDto {
  @IsUUID()
  admissionId: string;

  @IsOptional()
  @IsString()
  head_neck?: string;

  @IsOptional()
  @IsString()
  head_neck_details?: string;

  @IsOptional()
  @IsString()
  thorax?: string;

  @IsOptional()
  @IsString()
  thorax_details?: string;

  @IsOptional()
  @IsString()
  abdomen?: string;

  @IsOptional()
  @IsString()
  abdomen_details?: string;

  @IsOptional()
  @IsString()
  genital?: string;

  @IsOptional()
  @IsString()
  genital_details?: string;

  @IsOptional()
  @IsString()
  upper_extremities?: string;

  @IsOptional()
  @IsString()
  upper_extremities_details?: string;

  @IsOptional()
  @IsString()
  lower_extremities?: string;

  @IsOptional()
  @IsString()
  lower_extremities_details?: string;
}