import { Patient } from 'src/patients/entities/patient.entity';
import { Diagnosis } from 'src/diagnoses/entities/diagnosis.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('admissions')
export class Admission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  admission_date: Date;

  @Column({ type: 'timestamptz', nullable: true })
  discharge_date: Date;

  // --- RELACIÓN CON PACIENTES ---
  // @ManyToOne: Muchas hospitalizaciones (@Many) pueden pertenecer a Un paciente (@ToOne).
  @ManyToOne(() => Patient, (patient) => patient.admissions)
  // @JoinColumn: Especifica cuál es la columna de la llave foránea en esta tabla.
  @JoinColumn({ name: 'patient_id' })
  patient: Patient; // Esta propiedad nos permitirá acceder a los datos del paciente (ej: admission.patient.name)

  // --- RELACIÓN CON DIAGNÓSTICOS ---
  @ManyToOne(() => Diagnosis, (diagnosis) => diagnosis.admissions)
  @JoinColumn({ name: 'diagnosis_id' })
  diagnosis: Diagnosis;
}