import BusinessAdmins from "../database/models/businessAdmins.model";
import { IBusinessAdminRepository, IBusinessAdmins } from "../interfaces/business.interface";
import GenericRepository from "./generic.repository"

export default class BusinessAdminRepository extends GenericRepository<IBusinessAdmins> implements IBusinessAdminRepository{
    constructor(){
        super(BusinessAdmins)
    }
}