import httpStatus from "http-status";
import { IAdminRepository } from "../../../interfaces/admin.interface";
import ApiError from "../../../utilities/error.base";
import { IClientRepository } from "../../../interfaces/client.interface";

export default class UserProfileService {
  private AdminRepository: IAdminRepository;
  private ClientRepository: IClientRepository;

  constructor(
    adminRepository: IAdminRepository,
    clientRepository: IClientRepository
  ) {
    this.AdminRepository = adminRepository;
    this.ClientRepository = clientRepository;
  }

  /**
   *
   * @param id
   * @returns
   */
  async GetProfile(id: string, userType : string) {
    let user;

    if (userType === "admin"){
        user = await this.AdminRepository.findOneByFilter({
            adminId: id,
        });
    }else{
        user = await this.ClientRepository.findOneByFilter({
            clientId : id,
        });
    }

    if (!user)
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Unable to fetch profile, user not found"
      );

    return {
      user,
      accountType : userType
    };
  }
}
