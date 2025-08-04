import { Module } from '@nestjs/common';
import { ProgressNotesService } from './progress-notes.service';
import { ProgressNotesController } from './progress-notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressNote } from './entities/progress-note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgressNote])],
  controllers: [ProgressNotesController],
  providers: [ProgressNotesService],
  exports: [TypeOrmModule],
})
export class ProgressNotesModule {}