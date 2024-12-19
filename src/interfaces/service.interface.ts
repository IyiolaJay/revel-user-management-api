import { FilterQuery, Schema } from "mongoose";
import IGenericRepository from "./generic.repository.interface";

export interface IService{
    _id? : Schema.Types.ObjectId,
    // serviceId : string,
    serviceName : string,
    serviceDescription : string,
    serviceCost : number,
    serviceCostCurrency : string,
    serviceTenureType : string,
    minimumTenureDuration : number,
    createdBy : string,
}

export interface IActiveService{
    serviceId : string;
    clientId : string;
    startDate : Date;
    expireDate : Date;
}


export interface IServiceRepository extends IGenericRepository<IService>{
    findActiveServices(filter : FilterQuery<IActiveService>) : Promise<IActiveService[]>;
    createActiveService(service : Partial<IActiveService>) : Promise<void>;
}