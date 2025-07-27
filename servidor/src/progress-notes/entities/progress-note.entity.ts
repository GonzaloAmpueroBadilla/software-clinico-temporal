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

@Entity('progress_notes')
export class ProgressNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  note: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Admission)
  @JoinColumn({ name: 'admission_id' })
  admission: Admission;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;
}