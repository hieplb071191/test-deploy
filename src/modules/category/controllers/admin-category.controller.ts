import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../category.service';
import { Auth } from '@src/common/decorators/auth.decorator';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { User } from '@src/common/decorators/user.decorator';

@ApiTags('admin-category')
@Controller('admin-category')
export class CategpooryAdminController {
    constructor(
        private readonly service: CategoryService
    ){}

    @Auth({
        operationId: 'admin-create-category',
        roles: ['admin']
    })
    @Post('/create-category')
    createCategory(@Body() dto: CreateCategoryDto, @User() user) {
        return this.service.createCategory(dto, user)
    }

    @Auth({
        operationId: 'admin-delete-category',
        roles: ['admin']
    })
    @Delete('/delete-category/:categoryId')
    deleteCategory(@Param('categoryId') categoryId: string) {
        return this.service.deleteCategory(categoryId)
    }
}
