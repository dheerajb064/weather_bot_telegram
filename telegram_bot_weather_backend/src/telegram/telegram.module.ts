import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingSchema } from './schemas/setting.schemas';
import { UserSchema } from './schemas/user.schema';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{name:'Setting',schema: SettingSchema} ,{name:'User',schema:UserSchema}]),
    HttpModule
  ],
  providers: [TelegramService],
  controllers: [TelegramController]
})
export class TelegramModule {}
