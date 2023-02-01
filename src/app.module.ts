import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { PollutionModule } from './pollution/pollution.module';

@Module({
  imports: [
    PollutionModule, 
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/yassir')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
