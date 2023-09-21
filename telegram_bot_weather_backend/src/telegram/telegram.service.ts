import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()
import axios from 'axios';
import { Model } from 'mongoose';
import { Setting } from './schemas/setting.schemas';
import { User } from './schemas/user.schema';
import { Cron } from '@nestjs/schedule/dist';
import { HttpService } from '@nestjs/axios/dist';
import { CreateUserDto } from './dtos/create-user.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateSettingDto } from './dtos/create-setting.dto';

const TOKEN=process.env.TELEGRAM_TOKEN;
const API =  process.env.WEATHER_API_KEY;

@Injectable()
export class TelegramService {
    private readonly bot : any
    constructor(
        @InjectModel(Setting.name) private readonly settingModel: Model<Setting> ,
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly httpService: HttpService
    ){
        this.bot = new TelegramBot(TOKEN,{polling:true})
        this.bot.onText(/\/subscribe (.+)/,this.handleSubscription)
    }

    // @Cron('* 10 * * * *',{
    //     name:'weather update',
    //     timeZone:'Asia/Kolkata',
    // })
    // async handleCron(){
    //     console.log('Cron started.')
    //     const subscribers = await this.userModel.find({subscription:'active'});
    //     subscribers.forEach(async (subscriber)=>{
    //     const {data} = await firstValueFrom(this.httpService.get(`https://api.openweathermap.org/data/2.5/weather?q=${subscriber.city}&appid=${API}&units=metric`));;
    //     this.bot.sendMessage(subscriber.chatId, `Your Daily Weather Update is here:\nCity: ${data?.name}\nCountry: ${data.sys.country}\nCondition: ${data?.weather[0].main}\nTemperature: ${data?.main?.temp}°C\nFeels Like: ${data?.main?.feels_like}°C\nMinimum Temp: ${data?.main?.temp_min}°C\nMaximum Temp: ${data?.main?.temp_max}°C\n`);
    //     })
    // }


    handleSubscription = async (msg:any ,match:any)=>{
        const resp = match[1];
        console.log(msg);
        const chatId = msg.chat.id;
        const name = msg.chat.first_name;
        try{
            console.log(resp)
            const {data} = await firstValueFrom(this.httpService.get(`https://api.openweathermap.org/data/2.5/weather?q=${resp}&appid=${API}&units=metric`)); 
            console.log(data);
            const currentUser = await this.userModel.findOne({chatId:chatId});
            console.log(currentUser);
            if(!currentUser)
            {
                const user = await this.create({name: name ,chatId:chatId , city:resp ,subscription:"active"})
                console.log(user);
            }
            else
            {
                const updateUser = await this.userModel.updateOne({_id: currentUser},{city:resp});
                console.log(updateUser);
            }
            this.bot.sendMessage(chatId, `City: ${data?.name}\nCountry: ${data.sys.country}\nCondition: ${data?.weather[0].main}\nTemperature: ${data?.main?.temp}°C\nFeels Like: ${data?.main?.feels_like}°C\nMinimum Temp: ${data?.main?.temp_min}°C\nMaximum Temp: ${data?.main?.temp_max}°C\n`);
        }
        catch(e)
        {
            console.log(e);
            this.bot.sendMessage(chatId ,'Please write the command in the format of /subscribe [cityname]')
        }
    }

    async create(createUserDto: CreateUserDto): Promise<User>{
        const createdUser = await this.userModel.create(createUserDto);
        return createdUser;
    }

    async getAll() : Promise<User[]>{
        const users = await this.userModel.find();
        return users;
    }

    async blockUnblockUser(id:string) : Promise<User> {
        const user = await this.userModel.findOne({chatId:id});
        user.subscription = user.subscription === 'active' ? 'blocked' : 'active' ;
        await user.save();
        console.log(user);
        return user;
    }

    async deleteUser(id:string) {
        const user = await this.userModel.findOne({chatId:id});
        await this.userModel.deleteOne({chatId:id});
    }

    async getBotDetails() : Promise<Setting>{
        const settings = await this.settingModel.findOne({});
        return settings;
    }

    async updateBotDetails(createSettingDto: CreateSettingDto , id:string){
        const currentSetting = await this.settingModel.findOne({_id:id});
        if(!currentSetting)
        {
            const newSetting = await this.settingModel.create(createSettingDto);
            console.log(newSetting);
        }
        else
        {
            const updatedSetting = await this.settingModel.updateOne({_id:id},createSettingDto);
            console.log(updatedSetting);
        }

        
    }
}
