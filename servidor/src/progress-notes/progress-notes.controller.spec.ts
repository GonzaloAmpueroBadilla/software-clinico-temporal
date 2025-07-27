import { Test, TestingModule } from '@nestjs/testing';
import { ProgressNotesController } from './progress-notes.controller';
import { ProgressNotesService } from './progress-notes.service';

describe('ProgressNotesController', () => {
  let controller: ProgressNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressNotesController],
      providers: [ProgressNotesService],
    }).compile();

    controller = module.get<ProgressNotesController>(ProgressNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
