import { Schema } from "mongoose";
import IGenericRepository from "./generic.repository.interface";

export interface IPayment {
    _id? : Schema.Types.ObjectId,
    userId : string,
    paymentProofUrl : string,
    transactionId? : string,
    businessId : string,
}


export interface IPaymentRepository extends IGenericRepository<IPayment>{
}