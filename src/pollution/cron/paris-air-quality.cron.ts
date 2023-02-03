import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PollutionRepository } from '../pollution.repository';
import { PollutionService } from '../services/pollution.service';

@Injectable()
export class ParisAirQualityCron {
  private readonly logger = new Logger(ParisAirQualityCron.name);
  private readonly pollutionService: PollutionService;
  private readonly pollutionRepository: PollutionRepository;

  constructor(
    pollutionService: PollutionService,
    pollutionRepository: PollutionRepository,
  ) {
    this.pollutionService = pollutionService;
    this.pollutionRepository = pollutionRepository;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async saveParisAirQualityData() {
    try {
      const pollutionData =
        await this.pollutionService.getPollutionInNearestCityToCoordinates(
          2.352222,
          48.856613,
        );

      const createPollutionDto = {
        ...pollutionData.Pollution,
        city: 'Paris',
      };
      await this.pollutionRepository.storePollutionData(createPollutionDto);

      this.logger.log('Paris Pollution Data ' + JSON.stringify(pollutionData));
    } catch (error) {
      this.logger.error(
        'Error occured when trying to retrieve Paris air quality data.',
      );
    }
  }
}
