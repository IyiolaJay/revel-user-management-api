import { Schema } from "mongoose";
import IGenericRepository from "./generic.repository.interface";

export interface ITokenData {
    id: string;
    role : string;
    permissions : string[] 
  }
  

export interface IOtp{
    _id? : Schema.Types.ObjectId,
    ownerId : string,
    otpToken : string,
    expiryInSecs? : Date
}

export interface IOtpRepository extends IGenericRepository<IOtp>{

}