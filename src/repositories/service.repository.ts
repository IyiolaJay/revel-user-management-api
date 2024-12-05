import Service from "../database/models/service.model";
import { IActiveService, IService, IServiceRepository } from "../interfaces/service.interface";
import GenericRepository from "./generic.repository";
import ActiveService from "../database/models/activeService.model";
import { FilterQuery, Model } from "mongoose";

export default class ServiceRepository extends GenericRepository<IService> implements IServiceRepository{
    private ActiveService :Model<IActiveService> = ActiveService;
    constructor(){
        super(Service);
    }


    async createActiveService(service: Partial<IActiveService>): Promise<void> {
        await this.ActiveService.create(service);
    }

    async findActiveServices(filter : FilterQuery<IActiveService>): Promise<IActiveService[]> {
        // throw new Error("Method not implemented.");
       return await this.ActiveService.find(filter);

    }
}