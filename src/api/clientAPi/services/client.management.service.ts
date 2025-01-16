import httpStatus from "http-status";
import {
  IClient,
  IClientRepository,
} from "../../../interfaces/client.interface";
import ApiError from "../../../utilities/error.base";
import EmailService from "../../../email/emailer";
import { EmailType } from "../../../utilities/enums/enum";
import { generateRandomPassword } from "../../../helpers/password";
import { IServiceRepository } from "../../../interfaces/service.interface";
// import { cacheData, getCacheData } from "../../../redis/redis.cache";

export default class ClientAuthService {
  private ClientRepository: IClientRepository;
  private emailService = new EmailService();
  private ServiceRepository: IServiceRepository;
  


  constructor(clientRepository: IClientRepository, serviceRepository: IServiceRepository
  ) {
    this.ClientRepository = clientRepository;
    this.ServiceRepository = serviceRepository;

  }

  async FetchAllClients(offset: number = 1, limit: number = 20, filters: any) {
    return await this.ClientRepository.findAll(offset, limit, filters);
  }

  async updateClient(clientId: string, clientData: IClient) {
    const client =await this.ClientRepository.update(
      { _id: clientId },
      clientData
    );

    if(!client) 
        throw new ApiError(httpStatus.NOT_FOUND, "Client not found");
      
    return 
  }

  async upgradeCustomerAccount(clientId: string, subscribedService : string[]) {
    const customer = await this.ClientRepository.findOneByFilter({
      _id: clientId,
    });

    if (!customer) {
      throw new ApiError(httpStatus.NOT_FOUND, "Customer not found");
    }

    if (customer.hasAccount) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Customer account is already upgraded")
      }
    
     await this.ClientRepository.update(
        { _id: clientId },
        {hasAccount: true,
          
        }
      );

      if (subscribedService && subscribedService.length > 0) {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 6);
  
        const subscriptions = subscribedService.map((service) => ({
          serviceId: service,
          expireDate: currentDate,
        }));
  
        subscriptions.forEach(async (s) => {
          await this.ServiceRepository.createActiveService({
            clientId: clientId,
            serviceId: s.serviceId as string,
            expireDate: s.expireDate as Date,
          });
        });

        //  const cachedEstablishment = JSON.parse(
        //         (await getCacheData("acs_01")) ?? "[]"
        //       );
        
        //       //caching data for realtime middleware service
        //       // this block will add the new user establishment IDs for
        //       await cacheData({
        //         key: "acs_01",
        //         value: JSON.stringify([
        //           ...cachedEstablishment,
        //           ..._client.establishmentId.map((item) => ({
        //             estId: item,
        //             estUrl: client.establishmentUrl,
        //             clientId: _client._id.toString(),
        //           })),
        //         ]),
        //       });
      }

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
