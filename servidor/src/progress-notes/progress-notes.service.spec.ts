import { Test, TestingModule } from '@nestjs/testing';
import { ProgressNotesService } from './progress-notes.service';

describe('ProgressNotesService', () => {
  let service: ProgressNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgressNotesService],
    }).compile();

    service = module.get<ProgressNotesService>(ProgressNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
