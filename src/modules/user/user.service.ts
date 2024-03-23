import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserError } from './constant/error.user.constant';
import { encryptPassword } from '@src/common/utils/hash-password.util';

@Injectable()
export class UserService {
    constructor(
        private readonly repository: UserRepository
    ){}

    async create(dto: UserCreateDto) {
        const {
            email,
            address,
            password,
            firstName,
            lastName,
        } = dto
        const oldUser = await this.repository.findOne({
            email: dto.email
        })
        if (oldUser) {
            throw new BadRequestException(UserError.USER_EXISTED)
        }
        const encryptedPassword = await encryptPassword(password)
        const model = {
            email,
            address,
            firstName,
            lastName,
            password: encryptedPassword
        }
        return await this.repository.create(model)
    }
}
