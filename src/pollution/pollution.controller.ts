import { Controller, Get, Param } from '@nestjs/common';
import { PollutionService } from './services/pollution.service';

@Controller('air-quality')
export class PollutionController {
  constructor(private readonly PollutionService: PollutionService) {}

  @Get('/hi')
  async getPollutionInNearestCity(
    @Param('longitude') longitude: number,
    @Param('latitude') latitude: number
    ) {
    const result = await this.PollutionService.getPollutionInNearestCityToCoordinates(longitude, latitude);

    return result;
  }

}
