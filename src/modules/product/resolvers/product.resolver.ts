import {Args, Field, Mutation, ObjectType, Query, Resolver} from '@nestjs/graphql';

import { Product } from '../schemas/product.schema';
import { ProductService } from '../product.service';
import { ProductListDto } from '../dtos/product-list.dto';
import { ProductRepository } from '../repositories/product.repository';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@src/modules/auth/guard/gql-auth.guard';
import { GqlAuth } from '@src/common/decorators/gql.auth.decorator';

@ObjectType()
export class PaginationProduct {

  @Field(() => [Product])
  rows: Product[];

  @Field(() => Number)
  total: number;

  @Field(() => Number)
  page: number

  @Field(() => Number)
  perPage: number

  @Field(() => Number)
  totalPage: number
}

@Resolver(() => Product)
export class ProductResolver {
    constructor(
        private service: ProductService,
        private repository:  ProductRepository,
    ) {
    }

    @GqlAuth('test-function')
    @Query(() => PaginationProduct, {name: 'products'})
    async filter(
        @Args('paramQuery', {nullable: true})  paramQuery?: ProductListDto
    ) {
        return this.service.getProductByQuery(paramQuery)
    }

}