import { Schema } from "mongoose";
import IGenericRepository from "./generic.repository.interface";

export interface IService{
    _id? : Schema.Types.ObjectId,
    serviceId : string,
    serviceName : string,
    serviceDescription : string,
    serviceCost : number,
    serviceCostCurrency : string,
    serviceTenureType : string,
    minimumTenureDuration : number,
    createdBy : string,
}



export interface IServiceRepository extends IGenericRepository<IService>{

}