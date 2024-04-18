import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@src/common/mongoose/base.repository";
import { ProductDetail } from "../schemas/product-detail.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductDetailRepository extends BaseRepository<ProductDetail> {
    constructor(
        @InjectModel(ProductDetail.name)
        protected productDetailModel: Model<ProductDetail>
    ) {
        super(productDetailModel)
    }

    async findPopulate() {
        const produtDetail =  await this.productDetailModel.findOne()
        const result = await produtDetail.populate({path: 'product', select: ['name', 'branch']})
        return result
    }

    async findDistinct(field: string) {
        return this.productDetailModel.distinct(field)
    }
}