import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { Medication } from './entities/medication.entity';

@Injectable()
export class MedicationsService {
  constructor(
    @InjectRepository(Medication)
    private readonly medicationRepository: Repository<Medication>,
  ) {}

  create(createMedicationDto: CreateMedicationDto) {
    const medication = this.medicationRepository.create(createMedicationDto);
    return this.medicationRepository.save(medication);
  }

  findAll() {
    return this.medicationRepository.find();
  }

  findOne(id: string) {
    return this.medicationRepository.findOneBy({ id });
  }

  update(id: string, updateMedicationDto: UpdateMedicationDto) {
    return this.medicationRepository.update(id, updateMedicationDto);
  }

  remove(id: string) {
    return this.medicationRepository.delete(id);
  }
}