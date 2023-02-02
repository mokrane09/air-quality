import { Module } from '@nestjs/common';
import { PollutionService } from './services/pollution.service';
import { PollutionController } from './pollution.controller';
import { AirQualityApiService } from './services/air-quality-api.service';
import { ParisAirQualityCron } from './cron/paris-air-quality.cron';
import { MongooseModule } from '@nestjs/mongoose';
import { PollutionSchema } from './schema/pollution.schema';

@Module({
  controllers: [PollutionController],
  providers: [PollutionService, AirQualityApiService, ParisAirQualityCron],
  imports: [
    MongooseModule.forFeature([{ name: 'Pollution', schema: PollutionSchema }]),
  ],
})
export class PollutionModule {}
