import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/repositories/user.repository';
import { UserError } from '../user/constant/error.user.constant';
import { decryptPassword } from '@src/common/utils/hash-password.util';
import { UserInterFace } from './interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ){}

    async loginByPassword(email, password) {
        const user = await this.userRepository.findOne({
            email: email
        });
        if (!user) {
            throw new BadRequestException(UserError.USER_NOT_FOUND)
        }

        const { iv, key, encryptedPassword } = user.password
        const compare = await decryptPassword(password, encryptedPassword, key, iv)
        if (!compare) {
            throw new BadRequestException(UserError.USER_NOT_COMPARE_PASSWORD)
        }
        const payload = new UserInterFace(user).getUser()
        const access_token = await this.jwtService.sign(payload)
        return {
            access_token
        }
    }


    async validateUser(payload) {
        const user = await this.userRepository.findById(payload.id)
        if (!user) {
            return false
        } 
        return user
    }
}
