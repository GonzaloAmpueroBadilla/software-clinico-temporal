import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProgressNoteDto } from './dto/create-progress-note.dto';
import { ProgressNote } from './entities/progress-note.entity';
import { User } from 'src/users/entities/user.entity';

// Define un tipo simple para el payload del usuario del token
interface TokenUser {
  id: string;
  email: string;
  role: string;
}

@Injectable()
export class ProgressNotesService {
  constructor(
    @InjectRepository(ProgressNote)
    private readonly progressNoteRepository: Repository<ProgressNote>,
  ) {}
  

  async create(createDto: CreateProgressNoteDto, user: TokenUser) { // <-- CAMBIO AQUÍ
  console.log('--- INICIANDO CREATE PROGRESS NOTE ---');
  console.log('Datos recibidos (DTO):', createDto);
  console.log('Usuario que crea:', user);

  try {
    const newNote = this.progressNoteRepository.create({
      note: createDto.note,
      admission: { id: createDto.admissionId },
      createdBy: { id: user.id },
    });

    console.log('Entidad a guardar:', newNote);
    const savedNote = await this.progressNoteRepository.save(newNote);
    console.log('--- NOTA GUARDADA CON ÉXITO ---');
    return savedNote;

  } catch (error) {
    console.log('--- ERROR AL GUARDAR ---');
    console.error(error);
    throw error;
  }
}

  findAllByAdmission(admissionId: string) {
    return this.progressNoteRepository.find({
      where: { admission: { id: admissionId } },
      relations: ['createdBy'],
      order: { created_at: 'ASC' },
    });
  }
}