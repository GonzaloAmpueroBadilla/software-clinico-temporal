import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { Diagnosis } from './entities/diagnosis.entity';

@Injectable()
export class DiagnosesService {
  constructor(
    @InjectRepository(Diagnosis)
    private readonly diagnosisRepository: Repository<Diagnosis>,
  ) {}

  create(createDiagnosisDto: CreateDiagnosisDto) {
    const diagnosis = this.diagnosisRepository.create(createDiagnosisDto);
    return this.diagnosisRepository.save(diagnosis);
  }

  findAll() {
    return this.diagnosisRepository.find();
  }

  findOne(id: string) {
    return this.diagnosisRepository.findOneBy({ id });
  }

  update(id: string, updateDiagnosisDto: UpdateDiagnosisDto) {
    return this.diagnosisRepository.update(id, updateDiagnosisDto);
  }

  remove(id: string) {
    return this.diagnosisRepository.delete(id);
  }
}