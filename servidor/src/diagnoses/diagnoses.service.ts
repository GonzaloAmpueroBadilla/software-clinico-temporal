import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {
    const diagnosis = await this.diagnosisRepository.findOneBy({ id });
    if (!diagnosis) {
      throw new NotFoundException(`Diagnóstico con id ${id} no encontrado`);
    }
    return diagnosis;
  }

  async update(id: string, updateDiagnosisDto: UpdateDiagnosisDto) {
    // Verificamos que el objeto de actualización no venga vacío
    if (Object.keys(updateDiagnosisDto).length === 0) {
      return this.findOne(id);
    }
    await this.diagnosisRepository.update(id, updateDiagnosisDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.diagnosisRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Diagnóstico con id ${id} no encontrado`);
    }
    return result;
  }
}