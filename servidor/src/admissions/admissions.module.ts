import { Module } from '@nestjs/common';
import { AdmissionsService } from './admissions.service';
import { AdmissionsController } from './admissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admission } from './entities/admission.entity';
import { PatientsModule } from 'src/patients/patients.module';
import { ProgressNotesModule } from 'src/progress-notes/progress-notes.module';
import { MedicalIndicationsModule } from 'src/medical-indications/medical-indications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admission]),
    PatientsModule,
    ProgressNotesModule,
    MedicalIndicationsModule,
  ],
  controllers: [AdmissionsController],
  providers: [AdmissionsService],
})
export class AdmissionsModule {}