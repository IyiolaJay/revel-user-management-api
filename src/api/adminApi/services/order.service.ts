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
    const findFilter = {
        ...filters,
        createdAt: {
            $gte: new Date(filters.from) ?? "",
            $lte: new Date(filters.to) ?? "",  
        },
    }

    delete findFilter.from;
    delete findFilter.to;    
    const orders = await this.OrderRepository.findAll(offset, limit, findFilter);
    let totalAmount = 0;
    let totalVat = 0;
    if(orders.length > 0){
        orders.forEach((order : any) =>{
            totalAmount += order.orderItems.totalAmount;
            totalVat += order.orderItems.totalVat;
        })
    }

    return {
        data : orders,
        totalOrders : orders.length,
        totalAmount,
        totalVat
    }
  }
}
