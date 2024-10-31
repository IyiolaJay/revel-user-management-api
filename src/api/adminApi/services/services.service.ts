import httpStatus from "http-status";
import { IService, IServiceRepository } from "../../../interfaces/service.interface";
import ApiError from "../../../utilities/error.base";

export default class ServicesService{
    private ServiceRepository : IServiceRepository;

    constructor(serviceRepository : IServiceRepository){
        this.ServiceRepository = serviceRepository;
    }

    async CreateService(service : IService) : Promise<void>{
        let _service = await this.ServiceRepository.findOneByFilter({
            serviceTypeName : {$regex : new RegExp(`${service.serviceTypeName}`, "i")},
        });

        if (_service) throw new ApiError(
            httpStatus.CONFLICT,
            "Service name already exists"
        )
    }
}