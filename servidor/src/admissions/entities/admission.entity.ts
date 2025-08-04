import { Patient } from 'src/patients/entities/patient.entity';
import { Diagnosis } from 'src/diagnoses/entities/diagnosis.entity';
import { PhysicalExam } from 'src/physical-exams/entities/physical-exam.entity'; 
import { VitalSign } from 'src/vital-signs/entities/vital-sign.entity';
import { ProgressNote } from 'src/progress-notes/entities/progress-note.entity';
import { MedicalIndication } from 'src/medical-indications/entities/medical-indication.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('admissions')
export class Admission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  admission_date: Date;

  @Column({ type: 'timestamptz', nullable: true })
  discharge_date: Date;

  @ManyToOne(() => Patient, (patient) => patient.admissions)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => Diagnosis, (diagnosis) => diagnosis.admissions)
  @JoinColumn({ name: 'diagnosis_id' })
  diagnosis: Diagnosis;

  @OneToMany(() => MedicalIndication, (indication) => indication.admission)
  medicalIndications: MedicalIndication[];

  @OneToMany(() => PhysicalExam, (exam) => exam.admission)
  physicalExams: PhysicalExam[];

  @OneToMany(() => ProgressNote, (note) => note.admission)
  progressNotes: ProgressNote[];

  @OneToMany(() => VitalSign, (vitalSign) => vitalSign.admission)
  vitalSigns: VitalSign[];
}
