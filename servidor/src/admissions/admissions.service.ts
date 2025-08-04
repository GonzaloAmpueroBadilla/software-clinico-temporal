import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { UpdateAdmissionDto } from './dto/update-admission.dto';
import { Admission } from './entities/admission.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { ProgressNote } from 'src/progress-notes/entities/progress-note.entity';
import { MedicalIndication } from 'src/medical-indications/entities/medical-indication.entity';

@Injectable()
export class AdmissionsService {
  constructor(
    @InjectRepository(Admission)
    private readonly admissionRepository: Repository<Admission>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(ProgressNote)
    private readonly progressNoteRepository: Repository<ProgressNote>,
    @InjectRepository(MedicalIndication)
    private readonly indicationRepository: Repository<MedicalIndication>,
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

  async generateEpicrisis(admissionId: string) {
    const admission = await this.admissionRepository.findOne({
      where: { id: admissionId },
      relations: ['patient', 'diagnosis'],
    });

    if (!admission) {
      throw new NotFoundException('Hospitalización no encontrada');
    }

    const progressNotes = await this.progressNoteRepository.find({
      where: { admission: { id: admissionId } },
      relations: ['createdBy'],
      order: { created_at: 'ASC' },
    });

    const medicalIndications = await this.indicationRepository.find({
      where: { admission: { id: admissionId } },
      relations: ['medication', 'createdBy'],
    });

    const epicrisisText = `
      EPICRISIS
      ---------------------------------
      Paciente: ${admission.patient.name}
      RUT: ${admission.patient.rut}
      Fecha de Ingreso: ${new Date(admission.admission_date).toLocaleDateString('es-CL')}

      Diagnóstico de Ingreso:
      - ${admission.diagnosis.name} (${admission.diagnosis.code})

      Resumen de Evolución:
      ${progressNotes.map(note => `- ${new Date(note.created_at).toLocaleDateString('es-CL')} (${note.createdBy.full_name}): ${note.note}`).join('\n')}

      Indicaciones al Alta:
      ${medicalIndications.map(ind => `- ${ind.medication.name}: ${ind.instructions}`).join('\n')}
    `;

    return { epicrisisText };
  }
}
