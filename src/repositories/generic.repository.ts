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
  ): Promise<{ data: T[]; totalCount: number }> {
    const skip = (offset - 1) * limit;

    //this block formats the query if date is included
    let filters = {...filterQuery};
    if(filterQuery.createdAt_range){
      const date = filterQuery.createdAt_range.split(",");
      filters = {
        ...filterQuery,
        createdAt: {
            $gte: new Date(date[0]) ?? "",
            $lte: new Date(date[1]) ?? "",  
          },
    }
    delete filters.createdAt_range;
    }
    
    const [data, totalCount] = await Promise.all([
      this.model.find(filters).skip(skip).limit(limit).sort({ createdAt: -1 }),
      this.model.countDocuments(filters),
    ]);

    return {
      data,
      totalCount
    };
  }

  async findOneByFilter(filterQuery: any): Promise<T | null> {
    return await this.model.findOne(filterQuery);
  }

  // async findAllByFilter(filterQuery: any): Promise<T[]> {
  //   return await this.model.find(filterQuery);
  // }

  // async update(id: string, updateData: Partial<T>): Promise<void> {
  //   await this.model.updateOne({ _id: id }, { ...updateData });
  // }
  async update(filter: FilterQuery<T>, updateData: Partial<T>): Promise<T | null> {
    return await this.model.findOneAndUpdate(filter, { ...updateData }, {new : true});
  }

  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id });
  }

  async validateEntityData(data: T[]): Promise<any> {
    // const validRecords = [];
    // const invalidRecords = [];
  
   
    // // Step 2: Validate each record
    // for (const record of data) {
    //   const model = this.model.validate(record);
    //   try {
    //     await model.validate(); 
    //     validRecords.push(record);
    //   } catch (validationError) {
    //     invalidRecords.push({ record, errors: validationError.errors });
    //   }
    // }
    return data;
  }
}
