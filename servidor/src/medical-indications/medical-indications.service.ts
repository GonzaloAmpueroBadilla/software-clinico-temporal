import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMedicalIndicationDto } from './dto/create-medical-indication.dto';
import { MedicalIndication } from './entities/medical-indication.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MedicalIndicationsService {
  constructor(
    @InjectRepository(MedicalIndication)
    private readonly indicationRepository: Repository<MedicalIndication>,
  ) {}

  create(createDto: CreateMedicalIndicationDto, user: User) {
    const newIndication = this.indicationRepository.create({
      ...createDto,
      // Vinculamos las relaciones usando los IDs
      admission: { id: createDto.admissionId },
      medication: { id: createDto.medicationId },
      createdBy: { id: user.id }, // Vinculamos al usuario que crea la indicación
    });
    return this.indicationRepository.save(newIndication);
  }

  findAllByAdmission(admissionId: string) {
    return this.indicationRepository.find({
      where: { admission: { id: admissionId } },
      // Cargamos la información del medicamento y del usuario que la creó
      relations: ['medication', 'createdBy'],
      order: { created_at: 'ASC' }, // Ordenamos por fecha de creación
    });
  }
}