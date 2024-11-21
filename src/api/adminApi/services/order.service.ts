import { IOrderReceipt, IOrderRepository } from "../../../interfaces/order.interface";

export default class OrderService {
    private OrderRepository : IOrderRepository
    
    constructor(orderRepository : IOrderRepository){
        this.OrderRepository = orderRepository
    }

    public async CreateNewOrderReceipt(orderReceipts : IOrderReceipt[]){
        await this.OrderRepository.bulkcreateOrderReceipts(orderReceipts);
        return;
    }

    public async GetOrderReceipts(offset: number = 1, limit : number = 20){
        return await this.OrderRepository.findAll(offset, limit);
    }
}