import { FilterQuery } from "mongoose";

export default interface IGenericRepository<T> {
  create(item : T) : Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(offset : number, limit: number, filterQuery? : FilterQuery<T>): Promise<{ data: T[]; totalCount: number }>;
  findOneByFilter(filterQuery : FilterQuery<T>): Promise<T | null>;
  // findAllByFilter(filterQuery : FilterQuery<T>) : Promise<T[]>;
  update(filter: FilterQuery<T>, updateData : Partial<T>) :Promise<T | null>,
  delete(id: string)  : Promise<void>;
  validateEntityData(data : T[]) : Promise<any>;
}
