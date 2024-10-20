import { Schema } from "mongoose";
import IGenericRepository from "./generic.repository.interface";

export interface ITokenData {
    id: string;
    type : string;
    permissions : string[] 
  }
  

export interface IOtp{
    _id? : Schema.Types.ObjectId,
    ownerId : Schema.Types.UUID,
    otpToken : string,
    expiryInSecs? : Date
}

export interface IOtpRepository extends IGenericRepository<IOtp>{

}