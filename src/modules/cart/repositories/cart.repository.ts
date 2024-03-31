import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@src/common/mongoose/base.repository";
import { Cart } from "../schemas/cart.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CartRepository extends BaseRepository<Cart> {
    constructor(
        @InjectModel(Cart.name)
        protected readonly cartModel: Model<Cart>
    ){
        super(cartModel)
    }
}