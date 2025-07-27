import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalExamsController } from './physical-exams.controller';
import { PhysicalExamsService } from './physical-exams.service';

describe('PhysicalExamsController', () => {
  let controller: PhysicalExamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysicalExamsController],
      providers: [PhysicalExamsService],
    }).compile();

    controller = module.get<PhysicalExamsController>(PhysicalExamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
