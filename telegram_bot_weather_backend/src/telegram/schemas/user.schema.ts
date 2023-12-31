import { Prop , Schema , SchemaFactory } from "@nestjs/mongoose";
@Schema()
export class User {

    @Prop({required:true})
    name : string;

    @Prop({required: true})
    chatId: string;

    @Prop({required:true})
    city : string;

    @Prop({required: true})
    subscription: string;
}

export const UserSchema = SchemaFactory.createForClass(User);