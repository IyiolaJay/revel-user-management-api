import httpStatus from "http-status";
import {
  IClient,
  IClientRepository,
} from "../../../interfaces/client.interface";
import ApiError from "../../../utilities/error.base";
import SecurityHelperService from "../../../helpers/security";
import { generateRandomPassword } from "../../../helpers/password";

export default class ClientAuthService {
  private ClientRepository: IClientRepository;
  private SecurityHelperService : SecurityHelperService = new SecurityHelperService()

  constructor(clientRepository: IClientRepository) {
    this.ClientRepository = clientRepository;
  }



  async FetchAllClients(offset: number = 1, limit: number = 20, filters: any) {
    return await this.ClientRepository.findAll(offset, limit, filters);
  }

  async updateClient(clientId: string, clientData: IClient) {
    const client = await this.ClientRepository.update(
      { _id: clientId },
      clientData
    );

    if (!client) throw new ApiError(httpStatus.NOT_FOUND, "Client not found");

    return;
  }

  /**
   *
   * @param clientId
   * @param password
   * @returns
   */
  async updateClientPassword(clientId: string, password: string) {
    const client = await this.ClientRepository.findById(clientId);

    if (!client) {
      throw new ApiError(httpStatus.NOT_FOUND, "Client not found");
    }

    const isSamePassword = await this.SecurityHelperService.ComparePassword(
      password,
      client.password
    );

    if (isSamePassword) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "New password must be different from the old password"
      );
    }

    const hashedPassword = await this.SecurityHelperService.HashPassword(password);

    await this.ClientRepository.update(
      { _id: clientId },
      { password: hashedPassword }
    );

    return;
  }

  async searchClient(offset: number, limit: number, searchText: string) {
    const clients = await this.ClientRepository.findAll(offset, limit, {
        $or :[
          {
            first_name : { $regex: new RegExp(searchText, "i") },
            last_name : { $regex: new RegExp(searchText, "i") }
          }
        ],
    });

    if (!clients || clients.data.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, "No clients found");
    }
    return clients;
  }


  
  /**
   *
   * @param client
   * @returns
   */
  async CreateClientAccount(
    client: IClient,
    creatorId: string,
    businessId : string
  ) {
    let _client = await this.ClientRepository.findOneByFilter({
      email: { $regex: new RegExp(`^${client.email}$`, "i") },
    });

    if (_client) {
      throw new ApiError(
        httpStatus.CONFLICT,
        "Client account exists with this email"
      );
    }

    const genPassword = generateRandomPassword();

    _client = await this.ClientRepository.create({
      ...client,
      creatorId,
      businessId,
      password: await this.SecurityHelperService.HashPassword(genPassword),
    });

    return;
  }
}
