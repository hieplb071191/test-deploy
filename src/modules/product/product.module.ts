import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductAdminController } from './controllers/product.admin/product.admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from './schemas/product.schema';
import { ProductDetail, ProductDetailSchema } from './schemas/product-detail.schema';
import { ProductRepository } from './repositories/product.repository';
import { ProductDetailRepository } from './repositories/product-detail.repository';
import { ProductResolver } from './resolvers/product.resolver';
import { ProductUserController } from './controllers/product.user/product.user.controller';
import { ProductPublicController } from './controllers/product.public/product.public.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: productSchema,
        name: 'Product'
      },
      {
        schema: ProductDetailSchema,
        name: 'ProductDetail'
      },
    ])
  ],
  providers: [ProductService,ProductRepository,ProductDetailRepository, ProductResolver],
  controllers: [ProductAdminController, ProductUserController, ProductPublicController]
})
export class ProductModule {

}
