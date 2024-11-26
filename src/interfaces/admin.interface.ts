import { Schema } from "mongoose";
import IGenericRepository from "./generic.repository.interface";
import { IDevice } from "./token.interface";

export interface IAdmin {
  _id?: Schema.Types.ObjectId;
  adminId : string;
  email: string;
  name: string;
  password: string;
  hasSetPassword : boolean,
  adminType: string;
  permissionSet: string[];
  device : IDevice
}

export interface IAdminRepository extends IGenericRepository<IAdmin> {
  changeAdminPermission(adminId: string, permissions: string): Promise<void>;
}
