import { Body, Controller, Get, HttpStatus, Logger, Param, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto, SuccessResponseDto } from './dto/response-dto';
import { CoordinatesDto } from './dto/coordinates-dto';
import { PollutionService } from './services/pollution.service';

@Controller('pollution')
export class PollutionController {
  constructor(private readonly PollutionService: PollutionService) {}
  private readonly logger = new Logger(PollutionController.name);
  
  @Get()
  @ApiBody({
    type: CoordinatesDto
  })
  @ApiOperation({ summary: 'Get pollution data' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns pollution data.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid id provided.'})
  async getPollutionInNearestCity(
    @Query() coordinatesDto: CoordinatesDto
    ) {
    
    try {
      
      this.logger.log('GET_POLLUTION_IN_NEARBY_CITY_START |' + JSON.stringify(coordinatesDto))
      
      const result = await this.PollutionService.getPollutionInNearestCityToCoordinates(coordinatesDto.longitude, coordinatesDto.latitude);
      
      this.logger.log('GET_POLLUTION_IN_NEARBY_CITY_SUCCESS |' + JSON.stringify(coordinatesDto))
      
      return new SuccessResponseDto(result);
    } catch (error) {
      this.logger.error('GET_POLLUTION_IN_NEARBY_CITY_ERROR | ' + JSON.stringify(coordinatesDto))

      return new ErrorResponseDto("Error : polution data cannot be retrieved.");
    }
  }
}
