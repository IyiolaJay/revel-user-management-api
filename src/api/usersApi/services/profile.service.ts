import httpStatus from "http-status";
import { IAdminRepository } from "../../../interfaces/admin.interface";
import ApiError from "../../../utilities/error.base";
import { IClient, IClientRepository } from "../../../interfaces/client.interface";

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

  /**
   * 
   * @param offset 
   * @param limit 
   * @returns 
   */
  async GetAllClients(offset: number = 1, limit : number = 20){
    return await this.ClientRepository.findAll(offset, limit)
  }

  /**
   * 
   * @param clientUpdateData 
   * @param clientId 
   */
  async EditClientProfileData(clientUpdateData : Partial<IClient>, clientId : string){
    // const id = await this.ClientRepository.findOneByFilter({
    //   clientId : clientId,
    // })

    // if(!id) throw new ApiError(
    //   httpStatus.NOT_FOUND,
    //   "Account doesn't exists"
    // )
    const editedClient = await this.ClientRepository.update({clientId : clientId}, clientUpdateData)
    if(!editedClient) throw new ApiError(
      httpStatus.NOT_FOUND,
      "Client Account not found, no changes were made"
    )
  }
  
  /**
   * 
   * @param id 
   * @returns 
   */
  async GetClientById(id : string){
     const client = await this.ClientRepository.findOneByFilter({
      clientId : id
    })

    if(!client) throw new ApiError(
      httpStatus.NOT_FOUND,
      "Client account doesnt exists"
    )
    return
  }
}
