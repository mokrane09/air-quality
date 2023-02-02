import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AirQualityApiService {
  async getAirDataInNearestCity(
    longitude: number,
    latitude: number,
  ): Promise<any> {
    const endpoint = `${process.env.IQAIR_API_BASE_URL}/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${process.env.IQAIR_API_KEY}`;
    const response = await axios.get(endpoint);

    const result = response.data.data;
    return result;
  }
}
