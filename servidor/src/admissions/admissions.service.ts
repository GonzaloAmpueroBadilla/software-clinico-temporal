import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { UpdateAdmissionDto } from './dto/update-admission.dto'; // <-- ESTA LÍNEA FALTABA
import { Admission } from './entities/admission.entity';
import { Patient } from 'src/patients/entities/patient.entity';

@Injectable()
export class AdmissionsService {
  constructor(
    @InjectRepository(Admission)
    private readonly admissionRepository: Repository<Admission>,

    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createAdmissionDto: CreateAdmissionDto) {
    const patient = await this.patientRepository.findOneBy({
      uuid: createAdmissionDto.patientId,
    });

    if (!patient) {
      throw new NotFoundException(`Paciente con UUID ${createAdmissionDto.patientId} no encontrado`);
    }

    const newAdmission = this.admissionRepository.create({
      patient: { id: patient.id },
      diagnosis: { id: createAdmissionDto.diagnosisId },
    });

    return this.admissionRepository.save(newAdmission);
  }

  findAll() {
    return this.admissionRepository.find({ relations: ['patient', 'diagnosis'] });
  }

  findOne(id: string) {
    return this.admissionRepository.findOne({ 
      where: { id },
      relations: ['patient', 'diagnosis'],
    });
  }

  findByPatient(patientId: number) {
    return this.admissionRepository.find({
      where: { patient: { id: patientId } },
      relations: ['diagnosis'],
    });
  }

  update(id: string, updateAdmissionDto: UpdateAdmissionDto) {
    return `This action updates a #${id} admission`;
  }

  remove(id: string) {
    return this.admissionRepository.delete(id);
  }
}