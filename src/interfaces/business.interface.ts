import { Schema } from "mongoose";
import IGenericRepository from "./generic.repository.interface";

export interface IBusiness {
    _id :  Schema.Types.ObjectId;
    businessName : string;
    businessEmail : string;
    password : string;
    device : object;
    phone : object;
    addressNumber : string;
    city : string;
    state : string;
    country : string;
    createdBy : Schema.Types.ObjectId;
}


export interface IBusinessAdmins{
    _id  :  Schema.Types.ObjectId;
    firstName : string;
    lastName : string;
    email : string;
    password : string;
    phone : object;
    businessId : Schema.Types.ObjectId;
    device : object;
}

export interface IBusinessRepository extends IGenericRepository<IBusiness>{
}



export interface IBusinessAdminRepository extends IGenericRepository<IBusinessAdmins>{
}