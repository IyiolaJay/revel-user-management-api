import {
  IOrderReceipt,
  IOrderRepository,
} from "../../../interfaces/order.interface";

export default class OrderService {
  private OrderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.OrderRepository = orderRepository;
  }

  public async CreateNewOrderReceipt(orderReceipts: IOrderReceipt[]) {
    await this.OrderRepository.bulkcreateOrderReceipts(orderReceipts);
    return;
  }

  public async GetOrderReceipts(
    offset: number = 1,
    limit: number = 20,
    filters : any,
  ) {    
    const orders = await this.OrderRepository.findAll(offset, limit, filters);
    let totalAmount = 0;
    let totalVat = 0;
    if(orders.data.length > 0){
        orders.data.forEach((order : any) =>{
            totalAmount += order.orderItems.totalAmount;
            totalVat += order.orderItems.totalVat;
        })
    }

    return {
        orders : orders.data,
        totalOrders : orders.totalCount,
        totalAmount,
        totalVat
    }
  }
}
