import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from '../cart.service';
import { Auth } from '@src/common/decorators/auth.decorator';
import { User } from '@src/common/decorators/user.decorator';
import { CartCreateDto } from '../dtos/cart-create.dto';

@ApiTags('cart-user')
@Controller('user-cart')
export class UserCartController {
    constructor(
        private readonly service: CartService
    ){}

    @Auth({
        operationId: 'user-create-cart'
    })
    @Post('/create-cart')
    createCartByUser(@User() user, @Body() dto: CartCreateDto) {
        return this.service.userCreateOrUpdateCart(dto, user) 
    }

    @Auth({
        operationId: 'user-get-available-cart'
    })
    @Get('/cart')
    getCartByUser(@User() user) {
        return this.service.getCartByUser(user)
    }

}
