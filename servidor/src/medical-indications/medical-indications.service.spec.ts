import { Test, TestingModule } from '@nestjs/testing';
import { MedicalIndicationsService } from './medical-indications.service';

describe('MedicalIndicationsService', () => {
  let service: MedicalIndicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalIndicationsService],
    }).compile();

    service = module.get<MedicalIndicationsService>(MedicalIndicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
