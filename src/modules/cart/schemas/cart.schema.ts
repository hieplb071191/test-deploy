import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProductDetail } from "@src/modules/product/schemas/product-detail.schema";
import { v4 as uuidv4} from 'uuid'
import { CartStatusEnum } from "../constant/cart-status.enum";
import { Document } from "mongoose";


@Schema({
    _id: false
})
export class CartItems {
    @Prop({
        type: String
    })
    productName: string

    @Prop({
        type: String
    })
    productDetailId: string

    @Prop({
        type: Number
    })
    quantity: number

    @Prop({
        type: Number
    })
    price: number
}

@Schema({_id: true,})
export class Cart extends Document {

    @Prop({
        type: uuidv4,
        default: uuidv4
    })
    _id: string

    @Prop({
        type: String
    })
    createdBy: string


    @Prop({
        type: String
    })
    updatedBy: string

    @Prop({
        type: Date,
        default: new Date()
    })
    createdAt: Date

    @Prop({
        type: Date,
        default: new Date()
    })
    updatedAt: Date

    @Prop({
        type: [CartItems],
        default: [],
    })
    items: CartItems[]

    @Prop({
        enum: CartStatusEnum,
        default: CartStatusEnum.INITIALIZE
    })
    status: CartStatusEnum
}

export const cartSchema = SchemaFactory.createForClass(Cart)