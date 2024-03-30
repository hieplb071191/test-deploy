import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@src/common/mongoose/base.schema';
import { randomUUID } from 'crypto';
import { Document } from 'mongoose';
import { UserRoleEnum } from '../constant/role.user.constant';
import { Field, ObjectType } from '@nestjs/graphql';

export const userSchemaName = 'users'

@ObjectType()
export class AddressSchema {
    @Field(() => Number)
    @Prop({
        type: Number,
        required: true
    })
    lat: number;

    @Field(() => Number)
    @Prop({
        type: Number,
        required: true
    })
    long: number;

    @Field(() => String)
    @Prop({
        type: String
    })
    specialAddress: string
}

@ObjectType()
export class PasswordSchema {
    @Field(() => String)
    @Prop({
        type: String
    })
    encryptedPassword: string

    @Field(() => String)
    @Prop({
        type: String
    })
    iv: string

    @Field(() => String)
    @Prop({
        type: String
    })
    key: string
}

@ObjectType()
@Schema()
export class User extends Document implements BaseSchema{
    @Field(() => Date)
    @Prop({
        type: Date, 
    })
    deleteAt: Date;

    @Field(() => Date)
    @Prop({
        type: Date,
        default: new Date()
    })
    createdAt: Date;

    @Field(() => Date)
    @Prop({
        default: new Date(), 
        type: Date,
    })
    updatedAt: Date;

    @Field(() => String)
    @Prop({
        type: String,
        default: randomUUID()
    })
    id: string;

    @Field(() => String)
    @Prop({
        type: String,
        required: true,
    })
    email: string;

    @Field(() => String)
    @Prop({
        type: String,
        required: true,
    })
    firstName: string;

    @Field(() => String)
    @Prop({
        type: String,
        required: true,
    })
    lastName: string;

    @Field(() => PasswordSchema)
    @Prop({
        type: PasswordSchema,
        required: true,
    })
    password: PasswordSchema;

    @Field(() => Boolean)
    @Prop({
        type: Boolean,
        default: true
    })
    isActive: boolean

    @Field(() => AddressSchema)
    @Prop({
        type: AddressSchema,
        required: false
    })
    address: AddressSchema

    @Field(() => String)
    @Prop({
        enum: UserRoleEnum,
        default: UserRoleEnum.USER
    })
    role: UserRoleEnum

    @Field(() => String)
    @Prop({
        type: String,
    })
    _id: string;
}

export const userSchema =  SchemaFactory.createForClass(User)

userSchema.pre('save', function (next, err)  {
    this._id = this.id
    next();
})
