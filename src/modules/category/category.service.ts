import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryRepository } from './repositories/category.repository';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoryError } from './constant/category-error.constant';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoryService {
    constructor(
        private readonly categoryRepository: CategoryRepository
    ){}

    async createCategory(dto: CreateCategoryDto, user) {
        const { name } = dto
        const oldModel = await this.categoryRepository.findOne({name})
        if (oldModel) {
            throw new BadRequestException(CategoryError.CATEGORY_EXISTED)
        }

        const createModel: Partial<Category> = {
            name,
            createdBy: user.id,
            updatedBy: user.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        return await this.categoryRepository.create(createModel)
    }

    async deleteCategory(id) {
        return await this.categoryRepository.updateOne({_id: id}, { $set: { deleteAt: new Date()}})
    }

    async getCategoryByQuery(query) {
        const { search, page, perPage } = query
        const _query = {}
        if (search) {
            _query['name'] = search
        }

        if (page && perPage) {
            const [result, total] = await Promise.all([
                this.categoryRepository.findAll(_query, {}, {
                    limit: perPage,
                    skip: (page -1) * perPage
                }),
                this.categoryRepository.countAll(_query)
            ]) 

            return {
                rows: result,
                page,
                perPage,
                total,
                totalPage: Math.floor(
                    (total + query.perPage - 1) / query.perPage
                )
            }
        } else {
            const result = await this.categoryRepository.findAll(_query)
            return {
                rows: result
            }
        }

    }
}
