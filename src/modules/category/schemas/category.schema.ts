import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "@src/common/mongoose/base.schema";
import { randomUUID } from "crypto";
import { Document } from "mongoose";
import { v4 as UUIDv4} from 'uuid'

@Schema()
export class Category extends Document implements BaseSchema  {
    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    updatedBy?: string;

    @Prop()
    createdBy?: string;

    @Prop()
    deleteAt: Date;

    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    name: string

    @Prop({
        type: UUIDv4,
        default: randomUUID()
    })
    _id: string

}

export const CategorySchema = SchemaFactory.createForClass(Category)