import { Prop } from "@nestjs/mongoose";


export class BaseSchema {
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
        type: String,
    })
    updatedBy?: string


    @Prop({
        type: String,
    })
    createdBy?: string

    @Prop({
        type: Date,
    })
    deleteAt: Date
}