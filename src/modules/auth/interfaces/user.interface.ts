import { User } from "@src/modules/user/schemas/user.schema";

export class UserInterFace {
    constructor(
        private readonly user: User
    ){

    }

    getUser() {
        return  {
            'email': this.user.email,
            'firstName': this.user.firstName,
            'lastName': this.user.lastName,
            'address': this.user.address,
            'createdAt': this.user.createdAt,
            'updatedAt': this.user.updatedAt,
            'id': this.user.id,
            '_id': this.user._id,
        }

    }
}