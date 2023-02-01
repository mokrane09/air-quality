import { Module } from '@nestjs/common';
import { PollutionService } from './services/pollution.service';
import { PollutionController } from './pollution.controller';
import { AirQualityApiService } from './services/air-quality-api.service';
import { ParisAirQualityCron } from './cron/paris-air-quality.cron';

@Module({
  controllers: [PollutionController],
  providers: [
    PollutionService, 
    AirQualityApiService,
    ParisAirQualityCron
  ],
})
export class PollutionModule {}
