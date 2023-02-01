import { Body, Controller, Get, HttpCode, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto, SuccessResponseDto } from './dto/response-dto';
import { CoordinatesDto } from './dto/coordinates-dto';
import { PollutionService } from './services/pollution.service';

@Controller('pollution')
export class PollutionController {
  constructor(private readonly PollutionService: PollutionService) {}

  @Get('')

  @ApiBody({
    type: CoordinatesDto
  })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get pollution data' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns pollution data.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid id provided.'})
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
