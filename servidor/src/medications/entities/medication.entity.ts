import { MedicalIndication } from 'src/medical-indications/entities/medical-indication.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity('medications')
export class Medication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  concentration: string;

  @Column({ type: 'text' })
  presentation: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => MedicalIndication, (indication) => indication.medication)
  indications: MedicalIndication[];
}