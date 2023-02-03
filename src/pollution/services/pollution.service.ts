import { Injectable } from '@nestjs/common';
import { PollutionRepository } from '../pollution.repository';
import { AirData } from '../types/iqair-api';
import { PollutionData, PollutionDatetime } from '../types/pollution';
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
  ): Promise<PollutionData> {
    const airData: AirData =
      await this.airQualityApiService.getAirDataInNearestCity(
        longitude,
        latitude,
      );

    return this.getPollutionDataFromAirData(airData);
  }

  getPollutionDataFromAirData(airData: AirData): PollutionData {
    return {
      Pollution: airData.current.pollution,
    };
  }

  async getMostPollutedDateTimeInParis(): Promise<PollutionDatetime> {
    const maxPollution =
      await this.pollutionRepository.getMaxPollutionInParis();

    const result = {
      maxPollutionDateTime: maxPollution.createdAt,
      city: maxPollution.city,
    };

    return result;
  }
}
