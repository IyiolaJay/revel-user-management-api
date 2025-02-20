import { Schema } from "mongoose";
import IGenericRepository from "./generic.repository.interface";
import { IDevice } from "./token.interface";

export interface IClient {
  _id: Schema.Types.ObjectId;
  businessId :string;
  first_name : string;
  last_name : string;
  establishmentId: number[];
  establishmentUrl: string;
  email: string;
  name: string;
  password : string;
  hasSetPassword : boolean,
  permissionSet : string[];
  device : IDevice;
  creatorId : string;
  phone? : IPhone;
  hasOnboarded : boolean;
}

interface IPhone{
  country_code : string;
  number : string;
}


export interface IClientRepository extends IGenericRepository<IClient> {
  getClientAndActiveServices() : Promise<any>;
}
  