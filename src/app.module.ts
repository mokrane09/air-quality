import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PollutionModule } from './pollution/pollution.module';

@Module({
  imports: [
    PollutionModule, 
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
