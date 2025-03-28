import { Schema } from "mongoose";
import IGenericRepository from "./generic.repository.interface";

export interface IOffering {
    _id? : Schema.Types.ObjectId,
    name : string,
    description : string,
    cost  : number,
    currency : string,
    categoryId : string,
    categoryName? : string,
    type : "PRODUCT" | "SERVICE",
    businessId : string | null,
    createdBy : string
}


export interface IOfferingRepository extends IGenericRepository<IOffering>{
}