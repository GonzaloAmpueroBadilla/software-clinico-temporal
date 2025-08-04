import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admission } from './entities/admission.entity';
import { ProgressNote } from 'src/progress-notes/entities/progress-note.entity';
import { MedicalIndication } from 'src/medical-indications/entities/medical-indication.entity';

@Injectable()
export class AdmissionsService {
  constructor(
    @InjectRepository(Admission)
    private readonly admissionRepository: Repository<Admission>,
    @InjectRepository(ProgressNote) // <-- Inyectar repositorio de notas
    private readonly progressNoteRepository: Repository<ProgressNote>,
    @InjectRepository(MedicalIndication) // <-- Inyectar repositorio de indicaciones
    private readonly indicationRepository: Repository<MedicalIndication>,
    // ... (el resto del constructor se mantiene igual)
  ) {}

  // ... (otros métodos como create, findOne, etc. se mantienen igual)

  async generateEpicrisis(admissionId: string) {
    // 1. Buscamos la hospitalización principal y sus relaciones directas
    const admission = await this.admissionRepository.findOne({
      where: { id: admissionId },
      relations: ['patient', 'diagnosis'],
    });

    if (!admission) {
      throw new NotFoundException('Hospitalización no encontrada');
    }

    // 2. Buscamos las notas y las indicaciones en consultas separadas
    const progressNotes = await this.progressNoteRepository.find({
      where: { admission: { id: admissionId } },
      relations: ['createdBy'],
      order: { created_at: 'ASC' },
    });

    const medicalIndications = await this.indicationRepository.find({
      where: { admission: { id: admissionId } },
      relations: ['medication', 'createdBy'],
    });

    // 3. Construimos el resumen
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