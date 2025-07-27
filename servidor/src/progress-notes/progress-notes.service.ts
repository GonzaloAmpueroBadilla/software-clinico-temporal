import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProgressNoteDto } from './dto/create-progress-note.dto';
import { ProgressNote } from './entities/progress-note.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProgressNotesService {
  constructor(
    @InjectRepository(ProgressNote)
    private readonly progressNoteRepository: Repository<ProgressNote>,
  ) {}

  create(createDto: CreateProgressNoteDto, user: User) {
    const newNote = this.progressNoteRepository.create({
      note: createDto.note,
      admission: { id: createDto.admissionId },
      createdBy: { id: user.id },
    });
    return this.progressNoteRepository.save(newNote);
  }

  findAllByAdmission(admissionId: string) {
    return this.progressNoteRepository.find({
      where: { admission: { id: admissionId } },
      relations: ['createdBy'],
      order: { created_at: 'ASC' },
    });
  }
}