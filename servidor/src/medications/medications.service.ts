import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {
    const medication = await this.medicationRepository.findOneBy({ id });
    if (!medication) {
      throw new NotFoundException(`Medicamento con id ${id} no encontrado`);
    }
    return medication;
  }

  async update(id: string, updateMedicationDto: UpdateMedicationDto) {
    if (Object.keys(updateMedicationDto).length === 0) {
      return this.findOne(id);
    }
    await this.medicationRepository.update(id, updateMedicationDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.medicationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Medicamento con id ${id} no encontrado`);
    }
    return result;
  }
}