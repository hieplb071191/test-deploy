import { Injectable } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { CartStatusEnum } from './constant/cart-status.enum';
import { CartCreateDto } from './dtos/cart-create.dto';

@Injectable()
export class CartService {
    constructor(
        private readonly cartRepository: CartRepository
    ){}

    async userCreateOrUpdateCart(
        dto: CartCreateDto, user
    ) {
        const {items} = dto
        const oldCart = await this.cartRepository.findOne({
            createdBy: user.id,
            status: CartStatusEnum.INITIALIZE
        })
        if (oldCart) {
            const result =  await this.cartRepository.updateOne(
                {_id: oldCart._id},
                {
                    $set: {
                        items,
                        updateBy: user.id,
                        updatedAt: new Date()
                    }
                },
                {
                    returnOriginal: false
                }
            )
            console.log(result.toObject()) 
            return result.toObject()
        } else {
            const createModel = {
                items,
                createdBy: user.id,
                updateBy: user.id,  
            }
            return await this.cartRepository.create(createModel)
        }
    }

    async getCartByUser(user) {
        const cart = await this.cartRepository.findOne(
            {
                createdBy: user.id,
                status: CartStatusEnum.INITIALIZE
            },
            {},
            {
                sort: {
                    createdAt: -1
                }
            }
        )
        if (!cart) {
            return await this.cartRepository.create({createdBy: user.id})
        }

        return cart
    }
}
