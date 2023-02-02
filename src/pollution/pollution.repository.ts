import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pollution, PollutionDocument } from './schema/pollution.schema';

@Injectable()
export class PollutionRepository {
  private readonly logger = new Logger(PollutionRepository.name);

  constructor(
    @InjectModel(Pollution.name)
    private pollutionModel: Model<PollutionDocument>,
  ) {}

  async storePollutionData(pollutionData) {
    this.logger.log('create pollution : ' + pollutionData);

    const pollution = new this.pollutionModel(pollutionData);
    await pollution.save();
  }
}
