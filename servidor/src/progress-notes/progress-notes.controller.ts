import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ProgressNotesService } from './progress-notes.service';
import { CreateProgressNoteDto } from './dto/create-progress-note.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('progress-notes')
@UseGuards(AuthGuard('jwt'))
export class ProgressNotesController {
  constructor(private readonly progressNotesService: ProgressNotesService) {}

  @Post()
  create(
    @Body() createDto: CreateProgressNoteDto,
    @GetUser() user: User,
  ) {
    return this.progressNotesService.create(createDto, user);
  }

  @Get('by-admission/:admissionId')
  findAllByAdmission(@Param('admissionId') admissionId: string) {
    return this.progressNotesService.findAllByAdmission(admissionId);
  }
}