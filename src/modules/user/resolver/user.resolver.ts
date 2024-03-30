import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {Schema as MongooseSchema} from 'mongoose';
import { User } from '../schemas/user.schema';
import { UserService } from '../user.service';
import { UserRepository } from '../repositories/user.repository';
import { GqlAuth } from '@src/common/decorators/gql.auth.decorator';


@Resolver(() => User)
export class UserResolver {
    constructor(private userRepository: UserRepository) {
    }
    @GqlAuth()
    @Query(() => User)
    async user(
        @Args('email', {type:() => String})  email: String
    ) {
        return this.userRepository.findOne({email: email})
    }
}
