import { Injectable } from '@nestjs/common';
import { PollutionRepository } from '../pollution.repository';
import { PollutionData } from '../types/pollution';
import { AirQualityApiService } from './air-quality-api.service';

@Injectable()
export class PollutionService {
  constructor(
    private readonly airQualityApiService: AirQualityApiService,
    private readonly pollutionRepository: PollutionRepository,
  ) {
    this.airQualityApiService = airQualityApiService;
    this.pollutionRepository = pollutionRepository;
  }
  async getPollutionInNearestCityToCoordinates(
    longitude: number,
    latitude: number,
  ): Promise<any> {
    const airData = await this.airQualityApiService.getAirDataInNearestCity(
      longitude,
      latitude,
    );

    return this.getPollutionDataFromAirData(airData);
  }

  getPollutionDataFromAirData(airData): PollutionData {
    return {
      Pollution: airData.current.pollution,
    };
  }

  async getMostPollutedDateTimeInParis() {
    const maxPollution = this.pollutionRepository.getMaxPollutionInParis();

    const maxPollutionDateTime = maxPollution.createdAt;

    return maxPollutionDateTime;
  }
}
