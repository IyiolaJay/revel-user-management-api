import { Schema } from "mongoose";
import IGenericRepository from "./generic.repository.interface";

export interface IService{
    _id? : Schema.Types.ObjectId,
    serviceId : Schema.Types.UUID,
    serviceTypeName : string,
    serviceDescription : string,
    serviceCost : number,
    serviceCostCurrency : string,
    serviceTenureType : string,
    minimumTenureDuration : number,
}



export interface IServiceRepository extends IGenericRepository<IService>{

}