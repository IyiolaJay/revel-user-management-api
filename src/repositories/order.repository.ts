import { IOrderReceipt, IOrderRepository } from "../interfaces/order.interface";
import GenericRepository from "./generic.repository";
import OrderReceipt from "../database/models/orderReceipt";
import { Model } from "mongoose";

export default class OrderRepository extends GenericRepository<IOrderReceipt> implements IOrderRepository{
    private OrderReceiptModel : Model<IOrderReceipt>;
    constructor(){
        super(OrderReceipt);
        this.OrderReceiptModel = OrderReceipt;
    }

    async bulkcreateOrderReceipts(orders : IOrderReceipt[]) {
        const _orders = orders.map(doc => new this.OrderReceiptModel(doc))
        await this.OrderReceiptModel.bulkSave(_orders);
        return;
    }
}