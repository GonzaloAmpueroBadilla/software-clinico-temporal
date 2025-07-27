import { Admission } from 'src/admissions/entities/admission.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('physical_exams')
export class PhysicalExam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'text', nullable: true })
  head_neck: string;

  @Column({ type: 'text', nullable: true })
  head_neck_details: string;

  @Column({ type: 'text', nullable: true })
  thorax: string;

  @Column({ type: 'text', nullable: true })
  thorax_details: string;

  @Column({ type: 'text', nullable: true })
  abdomen: string;

  @Column({ type: 'text', nullable: true })
  abdomen_details: string;

  @Column({ type: 'text', nullable: true })
  genital: string;

  @Column({ type: 'text', nullable: true })
  genital_details: string;

  @Column({ type: 'text', nullable: true })
  upper_extremities: string;

  @Column({ type: 'text', nullable: true })
  upper_extremities_details: string;

  @Column({ type: 'text', nullable: true })
  lower_extremities: string;

  @Column({ type: 'text', nullable: true })
  lower_extremities_details: string;

  // --- RELACIONES ---
  @ManyToOne(() => Admission)
  @JoinColumn({ name: 'admission_id' })
  admission: Admission;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;
}