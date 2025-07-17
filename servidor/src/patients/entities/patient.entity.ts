import { Admission } from 'src/admissions/entities/admission.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, Generated } from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // --- NUEVA COLUMNA ---
  @Column({ type: 'uuid', unique: true })
  @Generated('uuid') // Le dice a TypeORM que este valor lo genera la BD
  uuid: string;

  @Column({ type: 'text' })
  name: string;
 
  @Column({ type: 'text', unique: true })
  rut: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @CreateDateColumn()
  created_at: Date;

  // --- 2. AÑADIR ESTA NUEVA PROPIEDAD ---
  // @OneToMany: Un Paciente (@One) puede tener Muchas hospitalizaciones (@ToMany).
  @OneToMany(() => Admission, (admission) => admission.patient)
  admissions: Admission[]; // Esta propiedad será un array de todas sus hospitalizaciones.
}