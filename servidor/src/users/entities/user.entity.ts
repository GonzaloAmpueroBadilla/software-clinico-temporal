import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { PhysicalExam } from 'src/physical-exams/entities/physical-exam.entity';
import { VitalSign } from 'src/vital-signs/entities/vital-sign.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', select: false })
  password: string;

  @Column({ type: 'text' })
  full_name: string;

  @Column({ type: 'text' })
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => PhysicalExam, (exam) => exam.createdBy)
  physicalExams: PhysicalExam[];

}