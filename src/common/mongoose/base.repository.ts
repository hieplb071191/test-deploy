import { Injectable } from "@nestjs/common";
import {
    Document, FilterQuery, Model, PipelineStage, ProjectionType, QueryOptions, SaveOptions, UpdateQuery
} from 'mongoose'

@Injectable()
export class BaseRepository<T extends Document> {
    public readonly collectionName: string;
  private readonly filterNotDeletedYet = { deletedAt: null };

  constructor(private readonly objModel: Model<T>) {
    this.collectionName = objModel.collection.collectionName;
  }

  setFilter(filter?: FilterQuery<T>): FilterQuery<T> {
    return { ...this.filterNotDeletedYet, ...filter };
  }

  async save(doc: T, options?: SaveOptions): Promise<T>;
  async save(docs: T[], options?: SaveOptions): Promise<T[]>;
  async save(docs: T | T[], options?: SaveOptions): Promise<T | T[]> {
    if (Array.isArray(docs)) {
      return Promise.all(
        docs.map((doc: T) => {
          return this.save(doc, options);
        }),
      );
    }
    return docs.save(options);
  }


  async create(doc: object, options?: SaveOptions): Promise<T>;
  async create(docs: object[], options?: SaveOptions): Promise<T[]>;
  async create(docs: object, options?: SaveOptions): Promise<T | T[]> {
    if (Array.isArray(docs)) {
        return Promise.all(
          docs.map((doc: object) => {
            return this.create(doc, options);
          }),
        );
      }
      const doc = new this.objModel(docs);
      try {
        return await this.save(doc, options);
      }
      catch(e) {
        console.log(e)
      }
  }

  async updateOne( filter?: FilterQuery<T>,
    update?: UpdateQuery<T>,
    options?: QueryOptions<T>,): Promise<T> {
    const result = this.objModel.findOneAndUpdate(filter, update, options)
    return result
  }

  async findOne(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T> {
    return this.objModel.findOne(
      this.setFilter(filter),
      projection,
      options || { lean: true },
    ).exec();
  }

  async findById(
    id: string,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T> {
    return this.findOne(this.setFilter({ $or: [{id: id}, {_id: id}] }), projection, {...options, lean: true});
  }

  async findAll(
    filter:FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T[]> {
    return await this.objModel.find(this.setFilter(filter), projection, options)
  }

  async countAll(filter:FilterQuery<T>) {
    return await this.objModel.countDocuments(this.setFilter(filter))
  }

  async rawData(filter: PipelineStage[], isNotQueryDelete = true): Promise<T[]> {
    if (isNotQueryDelete) {
        const notQueryDelete: PipelineStage[] = [
            {
                $match: {
                    deletedAt: {
                        $eq: null
                    }
                }
            }
        ]

        filter = notQueryDelete.concat(filter)
    }

    return this.objModel.aggregate(filter)
  }

  async findDistinct(field: string) {
    return this.objModel.distinct(field)
}
}