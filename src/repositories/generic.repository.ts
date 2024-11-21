import { FilterQuery, Model } from "mongoose";
import IGenericRepository from "../interfaces/generic.repository.interface";

export default class GenericRepository<T> implements IGenericRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }
  async create(item: T): Promise<T> {
    return await this.model.create(item);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

  async findAll(
    offset: number = 1,
    limit: number = 20,
    filterQuery: FilterQuery<T> = {}
  ): Promise<T[]> {
    const skip = (offset - 1) * limit;
    return await this.model.find(filterQuery).skip(skip).limit(limit).sort({createdAt : -1});
  }
  async findOneByFilter(filterQuery: any): Promise<T | null> {
    return await this.model.findOne(filterQuery);
  }

  // async findAllByFilter(filterQuery: any): Promise<T[]> {
  //   return await this.model.find(filterQuery);
  // }

  async update(id: string, updateData: Partial<T>): Promise<void> {
    await this.model.updateOne({ _id: id }, { ...updateData });
  }
  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id });
  }
}
