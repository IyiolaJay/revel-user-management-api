import httpStatus from "http-status";
import {
  IClient,
  IClientRepository,
} from "../../../interfaces/client.interface";
import ApiError from "../../../utilities/error.base";
import EmailService from "../../../email/emailer";
import { EmailType } from "../../../utilities/enums/enum";
import { generateRandomPassword } from "../../../helpers/password";

export default class ClientAuthService {
  private ClientRepository: IClientRepository;
  private emailService = new EmailService();


  constructor(clientRepository: IClientRepository) {
    this.ClientRepository = clientRepository;
  }

  async FetchAllClients(offset: number = 1, limit: number = 20, filters: any) {
    return await this.ClientRepository.findAll(offset, limit, filters);
  }

  async updateClient(clientId: string, clientData: IClient) {
    return await this.ClientRepository.update(
      { clientId: clientId },
      clientData
    );
  }

  async upgradeCustomerAccount(clientId: string) {
    const customer = await this.ClientRepository.findOneByFilter({
      clientId: clientId,
    });

    if (!customer) {
      throw new ApiError(httpStatus.NOT_FOUND, "Customer not found");
    }

    if (!customer.hasAccount) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Customer account is already upgraded")
      }
    
    await this.ClientRepository.update(
        { clientId: clientId },
        {hasAccount: true}
      );


    const genPassword = generateRandomPassword();


    this.emailService.SendEMailToUser(
            {
              to: customer.email,
              bodyParts: {
                name: customer.name,
                email: customer.email,
                password: genPassword,
                _id: customer._id,
              },
            },
            EmailType.CredentialsEmail
          );
    

    return ;
  }

  async searchClient(offset: number, limit: number, searchText: string) {
    const clients = await this.ClientRepository.findAll(offset, limit,{
      name: { $regex: new RegExp(searchText, "i") },
  });

    if (!clients || clients.data.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, "No clients found");
    }
    return clients;
  }
}
