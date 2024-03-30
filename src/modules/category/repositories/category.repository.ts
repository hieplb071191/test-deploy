import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@src/common/mongoose/base.repository";
import { Category } from "../schemas/category.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
    constructor(
        @InjectModel(Category.name)
        protected readonly categoryModel: Model<Category>
    ){
        super(categoryModel)
    }
}