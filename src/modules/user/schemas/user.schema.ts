import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@src/common/mongoose/base.schema';
import { randomUUID } from 'crypto';
import { Document } from 'mongoose';

export const userSchemaName = 'users'


export class AddressSchema {
    @Prop({
        type: Number,
        required: true
    })
    lat: number;

    @Prop({
        type: Number,
        required: true
    })
    long: number;

    @Prop({
        type: String
    })
    specialAddress: string
}

export class PasswordSchema {
    @Prop({
        type: String
    })
    encryptedPassword: string

    @Prop({
        type: String
    })
    iv: string

    @Prop({
        type: String
    })
    key: string
}

@Schema()
export class User extends Document implements BaseSchema{
    @Prop({
        type: Date, 
    })
    deleteAt: Date;

    @Prop({
        type: Date,
        default: new Date()
    })
    createdAt: Date;

    @Prop({
        default: new Date(), 
        type: Date,
    })
    updatedAt: Date;

    @Prop({
        type: String,
        default: randomUUID()
    })
    id: string;

    @Prop({
        type: String,
        required: true,
    })
    email: string;

    @Prop({
        type: String,
        required: true,
    })
    firstName: string;

    @Prop({
        type: String,
        required: true,
    })
    lastName: string;

    @Prop({
        type: PasswordSchema,
        required: true,
    })
    password: PasswordSchema;


    @Prop({
        type: Boolean,
        default: true
    })
    isActive: boolean


    @Prop({
        type: AddressSchema,
        required: false
    })
    address: AddressSchema
}

export const userSchema =  SchemaFactory.createForClass(User)

userSchema.pre('save', function (next, err)  {
    this._id = this.id
    next()
})
