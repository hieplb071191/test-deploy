import { PickType } from "@nestjs/swagger";
import { UserCreateDto } from "@src/modules/user/dtos/user-create.dto";

export class LoginByPasswordDto extends PickType(UserCreateDto, [
    'email',
    'password'
]) {

}