import { Schema } from "mongoose";
import IGenericRepository from "./generic.repository.interface";

export interface IEstablishment{
    establishmentId : number;
    establishmentUrl : string;
    businessId : Schema.Types.ObjectId;
}


export interface IEstablishmentRepository extends IGenericRepository<IEstablishment>{
}