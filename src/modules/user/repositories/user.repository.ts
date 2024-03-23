import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@src/common/mongoose/base.repository";
import { User } from "../schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor(
        @InjectModel(User.name)
        model: Model<User>
    ){
        super(model)
    }
}