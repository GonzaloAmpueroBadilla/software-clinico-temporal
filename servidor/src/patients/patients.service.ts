import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  // El constructor "inyecta" el Repositorio de Pacientes.
  // Piensa en 'patientRepository' como un objeto con superpoderes
  // para acceder a la tabla 'patients'.
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  // --- CREAR UN PACIENTE ---
  create(createPatientDto: CreatePatientDto) {
    // 1. Crea una instancia de la entidad Patient con los datos del DTO.
    const patient = this.patientRepository.create(createPatientDto);
    // 2. Guarda esa instancia en la base de datos.
    return this.patientRepository.save(patient);
  }

  // --- OBTENER TODOS LOS PACIENTES ---
  findAll() {
    // Busca y devuelve todos los registros de la tabla.
    return this.patientRepository.find();
  }

  // --- OBTENER UN PACIENTE POR SU ID ---
  findOne(uuid: string) { // Ahora recibe un string (el uuid)
  return this.patientRepository.findOneBy({ uuid }); // Busca por la columna uuid
  }

  // --- ACTUALIZAR UN PACIENTE ---
  update(id: string, updatePatientDto: UpdatePatientDto) {
    // Actualiza los campos del paciente que coincida con el id.
    return this.patientRepository.update(id, updatePatientDto);
  }

  // --- ELIMINAR UN PACIENTE ---
  remove(id: string) {
    // Elimina un paciente que coincida con el id.
    return this.patientRepository.delete(id);
  }
}