import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { MedicalIndicationsService } from './medical-indications.service';
import { CreateMedicalIndicationDto } from './dto/create-medical-indication.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('medical-indications')
@UseGuards(AuthGuard('jwt')) // Protegemos todas las rutas de este controlador
export class MedicalIndicationsController {
  constructor(private readonly medicalIndicationsService: MedicalIndicationsService) {}

  @Post()
  create(
    @Body() createDto: CreateMedicalIndicationDto,
    @GetUser() user: User, // Usamos el decorador para obtener el usuario del token
  ) {
    return this.medicalIndicationsService.create(createDto, user);
  }

  @Get('by-admission/:admissionId')
  findAllByAdmission(@Param('admissionId') admissionId: string) {
    return this.medicalIndicationsService.findAllByAdmission(admissionId);
  }
}