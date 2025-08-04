import { Module } from '@nestjs/common';
import { MedicalIndicationsService } from './medical-indications.service';
import { MedicalIndicationsController } from './medical-indications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalIndication } from './entities/medical-indication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalIndication])],
  controllers: [MedicalIndicationsController],
  providers: [MedicalIndicationsService],
  exports: [TypeOrmModule],
})
export class MedicalIndicationsModule {}