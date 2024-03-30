import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategpooryAdminController } from './controllers/admin-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: CategorySchema,
        name: Category.name
      }
    ])
  ],
  providers: [CategoryService,CategoryRepository],
  controllers: [CategpooryAdminController],
  exports: [CategoryService,CategoryRepository]
})
export class CategoryModule {}
