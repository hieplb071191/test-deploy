import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@src/common/mongoose/base.repository";
import { Product } from "../schemas/product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class ProductRepository extends BaseRepository<Product> {
    constructor(
        @InjectModel(Product.name)
        protected productModel: Model<Product> 
    ) {
        super(productModel)
    }

    async findPopulate() {
        return await this.productModel.findOne().populate({path: 'productDetail', select: {
            size: 1,
            color: 1,
            imageUrls: 1,
            price: 1,
            quantity: 1,
            id: 1,
            _id: -1
        }})
    }
}