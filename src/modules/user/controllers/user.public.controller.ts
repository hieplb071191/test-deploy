import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from '../dtos/user-create.dto';

@ApiTags('public-user')
@Controller('public-user')
export class UserPublicController {
    constructor(
        private readonly service: UserService,
    ){}

    @ApiOperation({
        operationId: 'signup'
    })
    @Post('user-signup')
    signup(@Body() dto: UserCreateDto) {
        return this.service.create(dto)
    }
}
