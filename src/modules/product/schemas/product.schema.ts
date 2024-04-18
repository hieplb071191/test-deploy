import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "@src/common/mongoose/base.schema";
import { randomUUID } from 'crypto';
import mongoose, {Document} from 'mongoose'
import { ProductDetail } from "./product-detail.schema";
import {v4 as uuidV4} from 'uuid'
import { Field, ObjectType } from "@nestjs/graphql";
import { ProductTypeEnum } from "../constant/product.enum";
import { UserGenderEnum } from "@src/modules/user/constant/user.constant";

@ObjectType()
@Schema()
export class Product extends Document implements BaseSchema  {

    @Field(() => String)
    @Prop({
        type: uuidV4,
        default: uuidV4
    })
    _id: string
    
    @Field(() => Date)
    @Prop({
        type: Date,
        default: new Date()
    })
    createdAt: Date;

    @Field(() => Date)
    @Prop({
        type: Date,
        default: new Date()
    })
    updatedAt: Date;

    @Field(() => String)
    @Prop({
        type: String,
        required: true
    })
    updatedBy?: string;

    @Field(() => String)
    @Prop({
        type: String,
        required: true
    })
    createdBy?: string;

    @Field(() => Date)
    @Prop({
        type: Date,
        default: null
    })
    deleteAt: Date;

    @Field(() => String)
    @Prop({
        type: String,
        required: true
    })
    name: string;

    @Field(() => String)
    @Prop({
        type: String,
        required: true,
    })
    branch: string;

    @Field(() => String)
    @Prop({
        type: String,
    })
    description: string

    @Field(() => [String])
    @Prop({
        type: [String]
    })
    imageUrls: string[]

    @Field(() => String)
    @Prop({
        type: String
    })
    categoryId: string;

    @Field(() => String)
    @Prop({
        type: String
    })
    productCode: string;

    @Prop({
        type: [Object],
        ref: 'ProductDetail'
    })
    productDetail: string

    @Prop({
        enum: ProductTypeEnum,
        required: true
    })
    type: ProductTypeEnum

    @Prop({
        enum: UserGenderEnum,
        required: true
    })
    gender: UserGenderEnum
}

export const productSchema = SchemaFactory.createForClass(Product)