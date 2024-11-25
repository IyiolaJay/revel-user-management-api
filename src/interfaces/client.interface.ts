import { Schema } from "mongoose";
import IGenericRepository from "./generic.repository.interface";

export interface IClient {
  _id?: Schema.Types.ObjectId;
  clientId :string;
  establishmentId: number[];
  establishmentUrl: string;
  email: string;
  name: string;
  password : string;
  hasSetPassword : boolean,
  clientType : string;
  permissionSet : string[];
}



export interface IClientRepository extends IGenericRepository<IClient> {

}
  