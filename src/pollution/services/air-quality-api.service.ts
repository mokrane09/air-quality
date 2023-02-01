import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AirQualityApiService {
  
  async getAirDataInNearestCity(longitude: number, latitude: number): Promise<any> {
    const weatherApiBaseUrl = 'http://api.airvisual.com';
    const endpoint = `${weatherApiBaseUrl}/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=2880ff3a-e599-4ad3-b441-34f7438a8f25`;
    const response = await axios.get(endpoint);
    
    const result = response.data.data
    return result;
  }
}
