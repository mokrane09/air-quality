import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto, SuccessResponseDto } from './dto/response-dto';
import { CoordinatesDto } from './dto/coordinates-dto';
import { PollutionService } from './services/pollution.service';

@Controller('pollution')
export class PollutionController {
  constructor(private readonly pollutionService: PollutionService) {}
  private readonly logger = new Logger(PollutionController.name);

  @Get()
  @ApiBody({
    type: CoordinatesDto,
  })
  @ApiOperation({ summary: 'Get pollution data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns pollution data.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid id provided.',
  })
  async getPollutionInNearestCity(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    coordinatesDto: CoordinatesDto,
  ) {
    try {
      this.logger.log(
        'GET_POLLUTION_IN_NEARBY_CITY_START |' + JSON.stringify(coordinatesDto),
      );

      const result =
        await this.pollutionService.getPollutionInNearestCityToCoordinates(
          coordinatesDto.longitude,
          coordinatesDto.latitude,
        );

      this.logger.log(
        'GET_POLLUTION_IN_NEARBY_CITY_SUCCESS |' +
          JSON.stringify(coordinatesDto),
      );

      return new SuccessResponseDto(result);
    } catch (error) {
      this.logger.error(
        'GET_POLLUTION_IN_NEARBY_CITY_ERROR | ' +
          JSON.stringify(coordinatesDto),
      );

      return new ErrorResponseDto('Error : polution data cannot be retrieved.');
    }
  }

  @Get('max-pollution-date-time-paris')
  @ApiOperation({ summary: 'Get most polluted date time of the Paris zone' })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Returns date and time of the most polluted moment of the Paris zone.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid id provided.',
  })
  async getMastPollutionDateTimeInParis() {
    try {
      this.logger.log('GET_MOST_POLLUTED_DATE_TIME_IN_PARIS_START');

      const result =
        await this.pollutionService.getMostPollutedDateTimeInParis();

      this.logger.log('GET_MOST_POLLUTED_DATE_TIME_IN_PARIS_SUCCESS');
      return new SuccessResponseDto(result);
    } catch (error) {
      this.logger.log('GET_MOST_POLLUTED_DATE_TIME_IN_PARIS_ERROR');

      return new ErrorResponseDto(
        'Error : cannot return most polluted time in Paris.',
      );
    }
  }
}
