import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../auth.service";
import { LoginByPasswordDto } from "../dtos/login-password.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @ApiOperation({
        operationId: 'login-by-password'
    })
    @Post('/login-with-password')
    loginByPassword(@Body() dto: LoginByPasswordDto) {
        return this.authService.loginByPassword(dto.email, dto.password)
    }
}