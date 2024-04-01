import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AddressSchema } from "@src/modules/user/schemas/user.schema";
import { Document } from "mongoose";
import { v4 as UUIDv4} from 'uuid'
import { OrderStatusEnum } from "../constant/order-status.enum";
import { OrderPaymentMethod, OrderTypeEnum } from "../constant/order-type.enum";

@Schema()
export class Order extends Document {

    @Prop({
        type: UUIDv4,
        default: UUIDv4
    })
    _id: string

    @Prop({
        type: String,
    })
    cardId: string

    @Prop({
        type: String
    })
    userId: string

    @Prop({
        type: Number
    })
    total: number

    @Prop({
        type: AddressSchema
    })
    address: AddressSchema

    @Prop({
        type: String
    })
    description: string

    @Prop({
        type: OrderStatusEnum
    })
    status: OrderStatusEnum

    @Prop({
        type: OrderTypeEnum
    })
    type: OrderTypeEnum

    @Prop({
        type: OrderPaymentMethod
    })
    paymentMethod: OrderPaymentMethod

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
}

export const orderSchema = SchemaFactory.createForClass(Order)