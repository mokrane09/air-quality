import { Controller, Get, Param } from '@nestjs/common';
import { ErrorResponseDto, SuccessResponseDto } from 'src/common/helpers/response-dto';
import { PollutionService } from './services/pollution.service';

@Controller('pollution')
export class PollutionController {
  constructor(private readonly PollutionService: PollutionService) {}

  @Get('')
  async getPollutionInNearestCity(
    @Param('longitude') longitude: number,
    @Param('latitude') latitude: number
    ) {
    
    try {
      const result = await this.PollutionService.getPollutionInNearestCityToCoordinates(longitude, latitude);

      return new SuccessResponseDto(result);
    } catch (e) {

      return new ErrorResponseDto("result");
    }
    
  }

}
