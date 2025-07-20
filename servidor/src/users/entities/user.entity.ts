import { MedicalIndication } from 'src/medical-indications/entities/medical-indication.entity'; // <-- Importar
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm'; // <-- Añadir OneToMany

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

  // --- AÑADIR ESTA NUEVA PROPIEDAD ---
  @OneToMany(() => MedicalIndication, (indication) => indication.createdBy)
  medicalIndications: MedicalIndication[];
}