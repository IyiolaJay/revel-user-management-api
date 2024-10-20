import { Model } from "mongoose";
import Admin from "../database/models/admin.model";
import { IAdmin, IAdminRepository } from "../interfaces/admin.interface";
import GenericRepository from "./generic.repository";

export default class AdminRepository extends GenericRepository<IAdmin> implements IAdminRepository{
    private Admin : Model<IAdmin>;
    constructor(){
        super(Admin)
        this.Admin = Admin;
    }

    
    changeAdminPermission(adminId: string, permissions: string): Promise<void> {
        console.log(adminId);
        console.log(permissions)
        this.Admin.find();
        throw new Error("Method not implemented.");
    }

    
}