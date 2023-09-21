import { Prop , Schema , SchemaFactory } from "@nestjs/mongoose";
@Schema()
export class Setting {

    @Prop({required:true})
    teleBotApiKey : string;

    @Prop({required: true})
    weatherApiKey: string;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);