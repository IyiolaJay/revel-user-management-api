import { IBusiness, IBusinessRepository } from "../interfaces/business.interface";
import GenericRepository from "./generic.repository";
import Business from "../database/models/business.model";


export default class BusinessRepository extends GenericRepository<IBusiness> implements IBusinessRepository{
    constructor(){
        super(Business)
    }
}