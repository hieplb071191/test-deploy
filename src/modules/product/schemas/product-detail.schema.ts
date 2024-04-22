import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "@src/common/mongoose/base.schema";
import mongoose,{ Document } from "mongoose";
import { randomUUID } from 'crypto';
import {v4 as uuidV4} from 'uuid'

@Schema({_id: false})
export class DisCountSchema {
    @Prop({
        type: String,

    })
    discountType: string;

    @Prop({
        type: Number
    })
    discountValue: number
}

@Schema()
export class ProductDetail extends Document implements BaseSchema {
    @Prop({
        type: uuidV4,
        default: uuidV4
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

    })
    updatedBy?: string;

    @Prop({
        type: String,

    })
    createdBy?: string;

    @Prop({
        type: Date,
        default: null
    })
    deleteAt: Date;

    @Prop({
        type: String,
        ref: 'Product'
    })
    product: string

    @Prop({
        type: String,
    })
    size: string

    @Prop({
        type: String,
    })
    color: string

    @Prop({
        type: [String]
    })
    imageUrls: string[]

    @Prop({
        type: Number,
        required: true
    })
    price: number;

    @Prop({
        type: DisCountSchema,
    })
    discount: DisCountSchema
    

    @Prop({
        type: Number,
        default: 0,
    })
    quantity: number
}

export const ProductDetailSchema = SchemaFactory.createForClass(ProductDetail)
ProductDetailSchema.pre('save', function(next) {
    console.log(this.discount), 
    next()
})

