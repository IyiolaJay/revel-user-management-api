import { IClientRepository } from "../../../interfaces/client.interface";
import {
  IOrderRepository,
} from "../../../interfaces/order.interface";

export default class OrderService {
  private OrderRepository: IOrderRepository;
  private ClientRepository: IClientRepository;

  constructor(
    orderRepository: IOrderRepository,
    clientRepository: IClientRepository
  ) {
    this.OrderRepository = orderRepository;
    this.ClientRepository = clientRepository;
  }

  public async GetEstablishmentOrderReceipts(
    offset: number = 1,
    limit: number = 20,
    establishmentId: number | null = null,
    clientId: string
  ) {
    let user;

    //
    if (!establishmentId) {
      user = await this.ClientRepository.findOneByFilter({
        clientId: clientId,
      });

      console.log(user?.establishmentId);

      return await this.OrderRepository.findAll(offset,limit,{
        establishmentId : {$in : user?.establishmentId}
      })
    }
    return await this.OrderRepository.findAll(offset, limit,{
        establishmentId : {$in : establishmentId}
      });
  }
}
