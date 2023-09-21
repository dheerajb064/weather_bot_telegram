import { Controller } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { TelegramService } from './telegram.service';
import {Get ,Post , Param ,Put ,Body} from '@nestjs/common'
import { Setting } from './schemas/setting.schemas';
import { CreateSettingDto } from './dtos/create-setting.dto';

@Controller('telegram')
export class TelegramController {
    constructor(private readonly telegramService: TelegramService){}

    @Get()
    async getAllUsers(): Promise<User[]>{
        return this.telegramService.getAll()
    }

    @Get('/block/:id')
    async blockUnblockUser(@Param('id') id:string): Promise<User>{
        return this.telegramService.blockUnblockUser(id);
    }

    @Get('/delete/:id')
    async deleteUser(@Param('id') id:string){
        this.telegramService.deleteUser(id);
        console.log("deleted user.")
    }

    @Get('/bot')
    async getBotDetails(): Promise<Setting>{
        return this.telegramService.getBotDetails();
    }

    

    @Put('/bot/:id')
    async updateBotDetails(@Param('id') id:string , @Body() setting: CreateSettingDto) {
        await this.telegramService.updateBotDetails(setting , id);
    }

}
