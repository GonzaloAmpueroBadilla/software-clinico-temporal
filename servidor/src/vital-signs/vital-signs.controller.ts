import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { VitalSignsService } from './vital-signs.service';
import { CreateVitalSignDto } from './dto/create-vital-sign.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('vital-signs')
@UseGuards(AuthGuard('jwt'))
export class VitalSignsController {
  constructor(private readonly vitalSignsService: VitalSignsService) {}

  @Post()
  create(
    @Body() createDto: CreateVitalSignDto,
    @GetUser() user: User,
  ) {
    return this.vitalSignsService.create(createDto, user);
  }

  @Get('by-admission/:admissionId')
  findAllByAdmission(@Param('admissionId') admissionId: string) {
    return this.vitalSignsService.findAllByAdmission(admissionId);
  }
}