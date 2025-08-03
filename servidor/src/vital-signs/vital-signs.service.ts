import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVitalSignDto } from './dto/create-vital-sign.dto';
import { VitalSign } from './entities/vital-sign.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class VitalSignsService {
  constructor(
    @InjectRepository(VitalSign)
    private readonly vitalSignRepository: Repository<VitalSign>,
  ) {}

  create(createDto: CreateVitalSignDto, user: User) {
    const { admissionId, ...vitalSignData } = createDto;
    const newSign = this.vitalSignRepository.create({
      ...vitalSignData,
      admission: { id: admissionId },
      createdBy: { id: user.id },
    });
    return this.vitalSignRepository.save(newSign);
  }

findAllByAdmission(admissionId: string) {
  return this.vitalSignRepository.find({
    where: { admission: { id: admissionId } },
    relations: ['createdBy'],
    order: { created_at: 'DESC' }
  });
  }
}