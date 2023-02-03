import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as constants from '../constants/constants.json';
import { AirData, AirDataResponse } from '../types/iqair-api';

@Injectable()
export class AirQualityApiService {
  async getAirDataInNearestCity(
    longitude: number,
    latitude: number,
  ): Promise<AirData> {
    const endpoint = `${constants.IQAIR_API_BASE_URL}/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${process.env.IQAIR_API_KEY}`;
    const response = await axios.get<AirDataResponse>(endpoint);

    const result = response.data.data;
    return result;
  }
}
