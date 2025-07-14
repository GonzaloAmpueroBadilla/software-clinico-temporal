import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- 1. IMPORTAR TypeOrmModule
import { Patient } from './entities/patient.entity'; // <-- 2. IMPORTAR LA ENTIDAD

@Module({
  // 3. REGISTRAR LA ENTIDAD EN EL MÓDULO
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}