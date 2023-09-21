import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import {MongooseModule} from '@nestjs/mongoose';
require('dotenv').config()
import { ScheduleModule } from '@nestjs/schedule';

const MONGO_URI = process.env.MONGO_URI

@Module({
  imports: [TelegramModule , 
    MongooseModule.forRoot(MONGO_URI),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
