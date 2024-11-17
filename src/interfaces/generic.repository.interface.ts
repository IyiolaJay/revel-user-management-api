import { FilterQuery } from "mongoose";

export default interface IGenericRepository<T> {
  create(item : T) : Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  findOneByFilter(filterQuery : FilterQuery<T>): Promise<T | null>;
  findAllByFilter(filterQuery : FilterQuery<T>) : Promise<T[]>;
  update(id : string, updateData : Partial<T>) :Promise<void>,
  delete(id: string)  : Promise<void>
}
