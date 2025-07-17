import { Admission } from 'src/admissions/entities/admission.entity'; // <-- 1. IMPORTAR ADMISSION
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity('diagnoses')
export class Diagnosis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  code: string;

  @Column({ type: 'text' })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  // --- 2. AÑADIR ESTA NUEVA PROPIEDAD ---
  @OneToMany(() => Admission, (admission) => admission.diagnosis)
  admissions: Admission[];
}