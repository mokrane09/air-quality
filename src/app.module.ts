import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { PollutionModule } from './pollution/pollution.module';

@Module({
  imports: [
    PollutionModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
