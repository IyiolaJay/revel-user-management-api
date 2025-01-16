import httpStatus from "http-status";
import { IAdminRepository } from "../../../interfaces/admin.interface";
import ApiError from "../../../utilities/error.base";

export default class AdminProfileService{
    private AdminRepository : IAdminRepository;

    constructor(adminRepository: IAdminRepository){
        this.AdminRepository = adminRepository;
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    async GetProfile(id : string){
        const user = await this.AdminRepository.findById(id)

        if(!user) throw new ApiError(
            httpStatus.NOT_FOUND,
            "Unable to fetch profile, user not found"
        );

        return user;
    }

}