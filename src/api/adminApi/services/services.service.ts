import httpStatus from "http-status";
import { IService, IServiceRepository } from "../../../interfaces/service.interface";
import ApiError from "../../../utilities/error.base";

export default class ServicesService{
    private ServiceRepository : IServiceRepository;

    constructor(serviceRepository : IServiceRepository){
        this.ServiceRepository = serviceRepository;
    }

    /**
     * 
     * @param service 
     * @param createdBy 
     * @returns 
     */
    async CreateService(service : IService, createdBy : string) : Promise<void>{
        let _service = await this.ServiceRepository.findOneByFilter({
            serviceTypeName : {$regex : new RegExp(`${service.serviceName}`, "i")},
        });

        if (_service) throw new ApiError(
            httpStatus.CONFLICT,
            "Service name already exists"
        )

        await this.ServiceRepository.create({
            ...service,
            createdBy
        })
        return;
    }

    /**
     * 
     * @param offset 
     * @param limit 
     * @returns 
     */
    async GetAllServices(offset: number = 1, limit : number = 10){
        const services = await this.ServiceRepository.findAll(offset, limit)
        return {
            services : services.data,
            totalCount : services.totalCount
        };
    }

    /**
     * 
     * @param serviceId 
     * @returns 
     */
    async GetServiceById(serviceId : string){
        const service = await this.ServiceRepository.findById(serviceId);
        if(!service) throw new ApiError(
            httpStatus.NOT_FOUND,
            "Service does not exists"
        );


        return service;

    }

    /**
     * 
     * @param serviceData 
     * @param serviceId 
     */
    async EditService(serviceData : Partial<IService>, serviceId : string){
        await this.ServiceRepository.update({_id : serviceId}, serviceData);
    }
}