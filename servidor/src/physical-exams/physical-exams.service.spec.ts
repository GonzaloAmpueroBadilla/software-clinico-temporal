import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalExamsService } from './physical-exams.service';

describe('PhysicalExamsService', () => {
  let service: PhysicalExamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysicalExamsService],
    }).compile();

    service = module.get<PhysicalExamsService>(PhysicalExamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
