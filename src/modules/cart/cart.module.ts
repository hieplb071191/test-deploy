import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { AdminCartController } from './controllers/admin-cart.controller';
import { UserCartController } from './controllers/user-cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, cartSchema } from './schemas/cart.schema';
import { CartRepository } from './repositories/cart.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: cartSchema,
        name: Cart.name
      }
    ])
  ],
  providers: [CartService, CartRepository],
  controllers: [AdminCartController, UserCartController],
  exports: [CartService, CartRepository]
})
export class CartModule {}
