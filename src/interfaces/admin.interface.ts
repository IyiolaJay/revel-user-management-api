import { Schema } from "mongoose";
import IGenericRepository from "./generic.repository.interface";

export interface IAdmin {
  _id?: Schema.Types.ObjectId;
  adminId : string;
  email: string;
  name: string;
  password: string;
  isGeneratedPassword : boolean,
  adminType: string;
  permissionSet: string[];
}

export interface IAdminRepository extends IGenericRepository<IAdmin> {
  changeAdminPermission(adminId: string, permissions: string): Promise<void>;
}
