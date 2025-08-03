import { Module } from '@nestjs/common';
import { VitalSignsService } from './vital-signs.service';
import { VitalSignsController } from './vital-signs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VitalSign } from './entities/vital-sign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VitalSign])],
  controllers: [VitalSignsController],
  providers: [VitalSignsService],
})
export class VitalSignsModule {}