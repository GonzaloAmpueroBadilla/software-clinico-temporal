import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  create(createPatientDto: CreatePatientDto) {
    const patient = this.patientRepository.create(createPatientDto);
    return this.patientRepository.save(patient);
  }

  findAll() {
    return this.patientRepository.find();
  }

  async findOne(uuid: string) {
    const patient = await this.patientRepository.findOneBy({ uuid });
    if (!patient) {
      throw new NotFoundException(`Paciente con uuid ${uuid} no encontrado`);
    }
    return patient;
  }

  async update(uuid: string, updatePatientDto: UpdatePatientDto) {
    // Verificamos que el objeto de actualización no venga vacío
    if (Object.keys(updatePatientDto).length === 0) {
      return this.findOne(uuid); // Si no hay nada, devolvemos el original
    }
    
    // TypeORM usa el primer argumento como criterio de búsqueda.
    // Aquí le decimos que busque por 'uuid'.
    await this.patientRepository.update({ uuid }, updatePatientDto);
    
    // Devolvemos el paciente actualizado
    return this.findOne(uuid);
  }

  async remove(uuid: string) {
    // Usamos el uuid para encontrar y eliminar el registro
    const result = await this.patientRepository.delete({ uuid });
    if (result.affected === 0) {
      throw new NotFoundException(`Paciente con uuid ${uuid} no encontrado`);
    }
    return result;
  }
}