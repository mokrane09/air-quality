import { Injectable } from '@nestjs/common';
import { PollutionData } from '../types/pollution';
import { AirQualityApiService } from './air-quality-api.service';

@Injectable()
export class PollutionService {
  constructor(private readonly airQualityApiService: AirQualityApiService) {
    this.airQualityApiService = airQualityApiService;
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
}
