import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', select: false }) // 'select: false' es MUY importante
  password: string;

  @Column({ type: 'text' })
  full_name: string;

  @Column({ type: 'text' })
  role: string; // 'doctor', 'enfermera', 'admin'

  @CreateDateColumn()
  created_at: Date;
}