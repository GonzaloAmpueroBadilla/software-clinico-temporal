import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('patients') // El nombre de la tabla en la base de datos
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', unique: true })
  rut: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @CreateDateColumn()
  created_at: Date;
}