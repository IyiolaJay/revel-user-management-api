import { Schema } from "mongoose";
import IGenericRepository from "./generic.repository.interface";

export interface IItem {
    _id? : Schema.Types.ObjectId,
    itemName : string,
    description : string,
    cost  : number,
    currency : string,
    categoryId : Schema.Types.ObjectId,
}


export interface IItemRepository extends IGenericRepository<IItem>{
}