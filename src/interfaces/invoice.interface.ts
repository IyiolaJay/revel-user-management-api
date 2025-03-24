import { Schema } from "mongoose";
import IGenericRepository from "./generic.repository.interface";

export interface IInvoice {
    businessId : Schema.Types.ObjectId;
    clientId : string;
    invoiceNumber: string;
    tapInvoiceId: number;
    invoiceUrl : string;
    draft: boolean;
    due: number;
    expiry: number;
    description: string;
    mode: string;
    note: string;
    notifications: {
        channels: string[];
        dispatch: boolean;
    };
    metadata: {
        udf1: string;
        udf2: string;
        udf3: string;
    };
    charge: {
        receipt: {
            email: boolean;
            sms: boolean;
        };
    };
    customer: {
        email: string;
        first_name: string;
        last_name: string;
        phone: {
            country_code: string;
            number: string;
        }
    }; 
    statement_descriptor: string;
    order: {
        amount: number;
        items: object[];
        currency: string;
    };
    post: {
        url: string;
    };
    redirect: {
        url: string;
    };
    reference: {
        invoice: string;
        order: string;
    };
    retry_for_captured: boolean;
    createdBy : string,
    paymentMethod : "TAP PAYMENT" | "BANK TRANSFER" |  "CASH" | "CHEQUE",
    status : "PENDING" | "COMPLETED"
}

export enum PaymentMethods {

}

export interface ICounter {
    seq: number;
    name: string;
  }

export interface IInvoiceRepository extends IGenericRepository<IInvoice> {
    getNextInvoiceOrEstimateNumber(itemType : string): Promise<string>;
    createInvoiceInstance(invoiceData: IInvoice): IInvoice;
}