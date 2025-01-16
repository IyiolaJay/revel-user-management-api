import httpStatus from "http-status";
import { IClientRepository } from "../../../interfaces/client.interface";
import {
  IOrderRepository,
} from "../../../interfaces/order.interface";
import ApiError from "../../../utilities/error.base";

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
    clientId: string,
    filters : any
  ) {
    let user;

    //if establishment id is not passed, fetch all receipts based on the user's establishment ids
    // user = await this.ClientRepository.findOneByFilter({
    //   _id: clientId,
    // });
    user = await this.ClientRepository.findById(clientId);
    if (!establishmentId) {

      return await this.OrderRepository.findAll(offset,limit,{
        ...filters,
        establishmentId : {$in : user?.establishmentId}
      })
    }

    if(!user?.establishmentId.includes(establishmentId)){
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "EstablishmentId not found for this client"
      )
    }
    return await this.OrderRepository.findAll(offset, limit,{
        ...filters,
        establishmentId : {$in : establishmentId}
      });
  }
}
