import { Body, Controller, Get, ValidationPipe } from '@nestjs/common';
import { ErrorResponseDto, SuccessResponseDto } from 'src/common/helpers/response-dto';
import { CoordinatesDto } from './dto/coordinates-dto';
import { PollutionService } from './services/pollution.service';

@Controller('pollution')
export class PollutionController {
  constructor(private readonly PollutionService: PollutionService) {}

  @Get('')
  async getPollutionInNearestCity(
    @Body(new ValidationPipe({
        whitelist: true
      })) coordinatesDto: CoordinatesDto
    ) {
    
    try {
      const result = await this.PollutionService.getPollutionInNearestCityToCoordinates(coordinatesDto.longitude, coordinatesDto.latitude);

      return new SuccessResponseDto(result);
    } catch (e) {

      return new ErrorResponseDto("Pollution ");
    }
  }
}
