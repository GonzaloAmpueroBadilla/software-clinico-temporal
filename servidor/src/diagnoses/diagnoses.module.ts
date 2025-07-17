import { Module } from '@nestjs/common';
import { DiagnosesService } from './diagnoses.service';
import { DiagnosesController } from './diagnoses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnosis } from './entities/diagnosis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnosis])], // <-- AÑADIR ESTO
  controllers: [DiagnosesController],
  providers: [DiagnosesService],
})
export class DiagnosesModule {}