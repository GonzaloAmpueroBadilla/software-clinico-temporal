import { Patient } from 'src/patients/entities/patient.entity';
import { Diagnosis } from 'src/diagnoses/entities/diagnosis.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany, // <-- Importar OneToMany
} from 'typeorm';
import { MedicalIndication } from 'src/medical-indications/entities/medical-indication.entity'; // <-- Importar MedicalIndication

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

  // --- AÑADIR ESTA NUEVA PROPIEDAD ---
  @OneToMany(() => MedicalIndication, (indication) => indication.admission)
  medicalIndications: MedicalIndication[];
  
}