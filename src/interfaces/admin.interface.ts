import { Schema } from "mongoose";
import IGenericRepository from "./generic.repository.interface";

export interface IAdmin {
  _id?: Schema.Types.ObjectId;
  adminId : Schema.Types.UUID;
  email: string;
  name: string;
  password: string;
  adminType: string;
  permissionSet: string[];
}

export interface IAdminRepository extends IGenericRepository<IAdmin> {
  changeAdminPermission(adminId: string, permissions: string): Promise<void>;
}
