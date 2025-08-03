import { Admission } from 'src/admissions/entities/admission.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('vital_signs')
export class VitalSign {
  @PrimaryGeneratedColumn('uuid') // El UUID es la única llave primaria
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'text', nullable: true })
  blood_pressure: string;

  @Column({ type: 'integer', nullable: true })
  heart_rate: number;

  @Column({ type: 'integer', nullable: true })
  respiratory_rate: number;

  @Column({ type: 'numeric', nullable: true })
  temperature: number;

  @Column({ type: 'integer', nullable: true })
  oxygen_saturation: number;

  @Column({ type: 'integer', nullable: true })
  pain_level: number;

  @Column({ type: 'integer', nullable: true })
  glasgow_scale: number;

  @ManyToOne(() => Admission)
  @JoinColumn({ name: 'admission_id' })
  admission: Admission;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;
}