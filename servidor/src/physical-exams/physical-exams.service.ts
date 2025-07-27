import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhysicalExamDto } from './dto/create-physical-exam.dto';
import { PhysicalExam } from './entities/physical-exam.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PhysicalExamsService {
  constructor(
    @InjectRepository(PhysicalExam)
    private readonly physicalExamRepository: Repository<PhysicalExam>,
  ) {}

  create(createDto: CreatePhysicalExamDto, user: User) {
    const { admissionId, ...examData } = createDto;

    const newExam = this.physicalExamRepository.create({
      ...examData,
      admission: { id: admissionId },
      createdBy: { id: user.id },
    });
    return this.physicalExamRepository.save(newExam);
  }

  findAllByAdmission(admissionId: string) {
    return this.physicalExamRepository.find({
      where: { admission: { id: admissionId } },
      relations: ['createdBy'],
      order: { created_at: 'DESC' }, // Mostramos el más reciente primero
    });
  }
}