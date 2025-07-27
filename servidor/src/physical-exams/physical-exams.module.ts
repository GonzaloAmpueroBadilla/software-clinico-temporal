import { Module } from '@nestjs/common';
import { PhysicalExamsService } from './physical-exams.service';
import { PhysicalExamsController } from './physical-exams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicalExam } from './entities/physical-exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhysicalExam])],
  controllers: [PhysicalExamsController],
  providers: [PhysicalExamsService],
})
export class PhysicalExamsModule {}