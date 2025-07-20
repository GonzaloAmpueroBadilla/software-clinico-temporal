import { Admission } from 'src/admissions/entities/admission.entity';
import { Medication } from 'src/medications/entities/medication.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('medical_indications')
export class MedicalIndication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  instructions: string;

  @CreateDateColumn()
  created_at: Date;

  // --- RELACIONES ---
  @ManyToOne(() => Admission, (admission) => admission.medicalIndications)
  @JoinColumn({ name: 'admission_id' })
  admission: Admission;

  @ManyToOne(() => Medication, (medication) => medication.indications)
  @JoinColumn({ name: 'medication_id' })
  medication: Medication;

  @ManyToOne(() => User, (user) => user.medicalIndications)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;
}