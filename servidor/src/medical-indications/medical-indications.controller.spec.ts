import { Test, TestingModule } from '@nestjs/testing';
import { MedicalIndicationsController } from './medical-indications.controller';
import { MedicalIndicationsService } from './medical-indications.service';

describe('MedicalIndicationsController', () => {
  let controller: MedicalIndicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalIndicationsController],
      providers: [MedicalIndicationsService],
    }).compile();

    controller = module.get<MedicalIndicationsController>(MedicalIndicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
