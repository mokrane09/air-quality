import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as constants from '../constants/constants.json';

@Injectable()
export class AirQualityApiService {
  async getAirDataInNearestCity(
    longitude: number,
    latitude: number,
  ): Promise<any> {
    const endpoint = `${constants.IQAIR_API_BASE_URL}/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${process.env.IQAIR_API_KEY}`;
    const response = await axios.get(endpoint);

    const result = response.data.data;
    return result;
  }
}
