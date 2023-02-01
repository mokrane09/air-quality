import { Module } from '@nestjs/common';
import { PollutionService } from './services/pollution.service';
import { PollutionController } from './pollution.controller';
import { AirQualityApiService } from './services/air-quality-api.service';

@Module({
  controllers: [PollutionController],
  providers: [PollutionService , AirQualityApiService],
})
export class PollutionModule {}
