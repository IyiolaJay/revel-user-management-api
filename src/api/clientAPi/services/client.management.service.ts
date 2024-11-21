import { IClientRepository } from "../../../interfaces/client.interface";


export default class ClientAuthService {
  private ClientRepository: IClientRepository;



  constructor(clientRepository: IClientRepository) {
    this.ClientRepository = clientRepository;
    
  }

  async FetchAllClients(offset: number = 1, limit : number = 20){
    return await this.ClientRepository.findAll(offset,limit);
  }

}
