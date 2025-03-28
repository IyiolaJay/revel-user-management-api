import { IPayment, IPaymentRepository } from "../interfaces/payment.interface";
import GenericRepository from "./generic.repository";
import Payment from "../database/models/payment.model";

export default class PaymentRepository extends GenericRepository<IPayment> implements IPaymentRepository{
    constructor(){
        super(Payment);
    }
}