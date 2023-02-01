import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PollutionService } from '../services/pollution.service';

@Injectable()
export class ParisAirQualityCron {
    private readonly logger = new Logger(ParisAirQualityCron.name);
    private readonly pollutionService: PollutionService;

    constructor(pollutionService: PollutionService) {
        this.pollutionService = pollutionService;
    }

    @Cron('0 * * * * *')
    async saveParisAirQualityData() {
        try {
            const pollutionData = await this.pollutionService.getPollutionInNearestCityToCoordinates(2.352222, 48.856613);
            this.logger.log('Paris Pollution Data ' + JSON.stringify(pollutionData));
        } catch (error) {
            this.logger.error('Error occured when trying to retrieve Paris air quality data.');
        }
    }
}