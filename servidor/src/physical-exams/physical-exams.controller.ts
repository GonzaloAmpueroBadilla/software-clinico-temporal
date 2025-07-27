import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PhysicalExamsService } from './physical-exams.service';
import { CreatePhysicalExamDto } from './dto/create-physical-exam.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('physical-exams')
@UseGuards(AuthGuard('jwt'))
export class PhysicalExamsController {
  constructor(private readonly physicalExamsService: PhysicalExamsService) {}

  @Post()
  create(
    @Body() createDto: CreatePhysicalExamDto,
    @GetUser() user: User,
  ) {
    return this.physicalExamsService.create(createDto, user);
  }

  @Get('by-admission/:admissionId')
  findAllByAdmission(@Param('admissionId') admissionId: string) {
    return this.physicalExamsService.findAllByAdmission(admissionId);
  }
}