import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "@src/common/mongoose/base.schema";
import { randomUUID } from 'crypto';
import mongoose, {Document} from 'mongoose'
import { ProductDetail } from "./product-detail.schema";
import {v4 as uuidV4} from 'uuid'
@Schema()
export class Product extends Document implements BaseSchema  {

    @Prop({
        type: uuidV4,
        default: randomUUID()
    })
    _id: string
    
    @Prop({
        type: Date,
        default: new Date()
    })
    createdAt: Date;

    @Prop({
        type: Date,
        default: new Date()
    })
    updatedAt: Date;

    @Prop({
        type: String,
        required: true
    })
    updatedBy?: string;

    @Prop({
        type: String,
        required: true
    })
    createdBy?: string;

    @Prop({
        type: Date,
        default: null
    })
    deleteAt: Date;

    @Prop({
        type: String,
        required: true
    })
    name: string;

    @Prop({
        type: String,
        required: true,
    })
    branch: string;

    @Prop({
        type: String,
    })
    description: string

    @Prop({
        type: [String]
    })
    imageUrls: string[]

    @Prop({
        type: String
    })
    categoryId: string;

    @Prop({
        type: String
    })
    productCode: string;

    @Prop({
        type: [Object],
        ref: 'ProductDetail'
    })
    productDetail: string
}

export const productSchema = SchemaFactory.createForClass(Product)