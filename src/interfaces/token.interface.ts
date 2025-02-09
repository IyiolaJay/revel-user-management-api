import { Schema } from "mongoose";
import IGenericRepository from "./generic.repository.interface";

export interface ITokenData {
    id: string;
    role : string;
    permissions : string[],
    accountType : string, 
    metaData? : object
  }
  

export interface IOtp{
    _id? : Schema.Types.ObjectId,
    ownerId : string,
    otpToken : string,
    expiryInSecs? : Date
}

export interface IDevice{
  userAgent: string,
  ipAddress: string,
  rememberMeExpires: Date,
}

export interface IOtpRepository extends IGenericRepository<IOtp>{

}